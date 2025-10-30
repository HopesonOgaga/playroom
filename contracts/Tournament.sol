// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title TournamentContract (production-ready)
 * @dev Tournament creation, player registration (gamer tags), payouts using USDC.
 */
contract TournamentContract is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable USDC_TOKEN;
    uint256 public tournamentCounter;

    struct Tournament {
        uint256 id;
        string name;
        string game;
        string description;
        uint256 prizePool;     // original prize pool deposited by organizer
        uint256 remainingPool; // pool remaining for payouts / refunds
        address organizer;
        bool isComplete;
        address[] players;
        address[] winners;
        // mappings inside struct (per-tournament)
        mapping(string => address) gamerTags; // normalized gamerTag => wallet
        mapping(address => string) gamerWallets; // wallet => original gamerTag (as submitted)
    }

    // NOTE: cannot make public because Tournament contains mappings.
    mapping(uint256 => Tournament) private tournaments;
    mapping(address => bool) public banList;

    // Events
    event TournamentCreated(
        uint256 indexed id,
        address indexed organizer,
        string name,
        uint256 prizePool
    );
    event PlayerJoined(
        uint256 indexed tournamentId,
        address indexed player,
        string gamerTag
    );
    event WinnersPaid(
        uint256 indexed tournamentId,
        address[] winners,
        uint256 totalPaid
    );
    event PrizePoolRefunded(uint256 indexed tournamentId, address indexed organizer, uint256 amount);
    event Banned(address indexed user);
    event Unbanned(address indexed user);
    event TournamentUpdated(uint256 indexed tournamentId);
    event TournamentCancelled(uint256 indexed tournamentId, address indexed organizer, uint256 refundAmount);

    /**
     * @param initialOwner - address to receive ownership (optional: pass deployer if zero address)
     */
    constructor(address initialOwner)
        Ownable(initialOwner)
        ReentrancyGuard()
    {
        // Official USDC address on Arbitrum Sepolia (6 decimals)
        USDC_TOKEN = IERC20(0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d);
    }

    // --- Admin ---
    function addToBanList(address _user) external onlyOwner {
        require(!banList[_user], "User already banned");
        banList[_user] = true;
        emit Banned(_user);
    }

    function removeFromBanList(address _user) external onlyOwner {
        require(banList[_user], "User not banned");
        banList[_user] = false;
        emit Unbanned(_user);
    }

    // --- Core Functions ---

    /**
     * @dev Create a new tournament and deposit prize pool (organizer must approve tokens first)
     */
    function createTournament(
        string memory _name,
        string memory _game,
        string memory _description,
        uint256 _prizePool
    ) external {
        require(_prizePool > 0, "Prize pool must be > 0");
        require(!banList[msg.sender], "Organizer is banned");

        // Transfer tokens into contract safely
        USDC_TOKEN.safeTransferFrom(msg.sender, address(this), _prizePool);

        tournamentCounter++;
        uint256 newId = tournamentCounter;

        Tournament storage t = tournaments[newId];
        t.id = newId;
        t.name = _name;
        t.game = _game;
        t.description = _description;
        t.prizePool = _prizePool;
        t.remainingPool = _prizePool;
        t.organizer = msg.sender;
        t.isComplete = false;

        emit TournamentCreated(newId, msg.sender, _name, _prizePool);
    }

    /**
     * @dev Organizer-only update (only before completion)
     */
    function updateTournament(
        uint256 _tournamentId,
        string memory _name,
        string memory _game,
        string memory _description
    ) external {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        require(msg.sender == t.organizer, "Only organizer");
        require(!t.isComplete, "Tournament complete");

        t.name = _name;
        t.game = _game;
        t.description = _description;

        emit TournamentUpdated(_tournamentId);
    }

    /**
     * @dev Join a tournament with a gamer tag. Tags are normalized to lowercase to prevent case collisions.
     */
    function joinTournament(uint256 _tournamentId, string memory _gamerTag) external {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        require(!t.isComplete, "Tournament complete");
        require(!banList[msg.sender], "You are banned");
        require(bytes(_gamerTag).length > 0, "Gamer tag empty");

        string memory normalized = _normalizeTag(_gamerTag);

        require(t.gamerTags[normalized] == address(0), "Gamer tag taken");
        require(bytes(t.gamerWallets[msg.sender]).length == 0, "Wallet already joined");

        t.gamerTags[normalized] = msg.sender;
        t.gamerWallets[msg.sender] = _gamerTag; // store original display tag
        t.players.push(msg.sender);

        emit PlayerJoined(_tournamentId, msg.sender, _gamerTag);
    }

    /**
     * @dev Organizer submits winners by gamer tags and amounts.
     *      Checks totals BEFORE transferring to avoid partial payouts.
     */
    function submitWinners(
        uint256 _tournamentId,
        string[] memory _gamerTags,
        uint256[] memory _amounts
    ) external nonReentrant {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        require(msg.sender == t.organizer, "Only organizer");
        require(!t.isComplete, "Tournament already complete");
        require(_gamerTags.length == _amounts.length, "Length mismatch");
        require(_gamerTags.length > 0, "At least one winner required");

        uint256 totalPayout = 0;
        address[] memory winnerWallets = new address[](_gamerTags.length);

        // First pass: resolve wallets and sum amounts
        for (uint256 i = 0; i < _gamerTags.length; i++) {
            string memory normalized = _normalizeTag(_gamerTags[i]);
            address wallet = t.gamerTags[normalized];
            require(wallet != address(0), "Invalid gamer tag");
            require(_amounts[i] > 0, "Payout amount must be > 0");
            winnerWallets[i] = wallet;
            // check overflow implicitly handled by solidity 0.8
            totalPayout += _amounts[i];
        }

        require(totalPayout <= t.remainingPool, "Total payout exceeds remaining pool");

        // All checks passed — mark complete and perform payouts
        t.isComplete = true;
        t.winners = winnerWallets;

        // Transfer all payouts
        for (uint256 i = 0; i < _gamerTags.length; i++) {
            USDC_TOKEN.safeTransfer(winnerWallets[i], _amounts[i]);
            t.remainingPool -= _amounts[i];
        }

        // Refund any remaining pool to organizer (dust)
        if (t.remainingPool > 0) {
            uint256 refund = t.remainingPool;
            t.remainingPool = 0;
            USDC_TOKEN.safeTransfer(t.organizer, refund);
            emit PrizePoolRefunded(_tournamentId, t.organizer, refund);
        }

        emit WinnersPaid(_tournamentId, winnerWallets, totalPayout);
    }

    /**
     * @dev Organizer can cancel an incomplete tournament and retrieve the prize pool.
     * Can be used if no one joins or the event is called off.
     */
    function cancelTournament(uint256 _tournamentId) external nonReentrant {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        require(msg.sender == t.organizer, "Only organizer");
        require(!t.isComplete, "Tournament already complete");

        // Mark as complete to prevent further actions
        t.isComplete = true;

        uint256 refund = t.remainingPool;

        if (refund > 0) {
            t.remainingPool = 0;
            USDC_TOKEN.safeTransfer(t.organizer, refund);
        }

        emit TournamentCancelled(_tournamentId, t.organizer, refund);
    }

    // --- View / Helper functions ---

    /**
     * @dev Returns basic tournament details (safe view for a struct that contains mappings).
     */
    function getTournamentDetails(uint256 _tournamentId)
        external
        view
        returns (
            uint256 id,
            string memory name,
            string memory game,
            string memory description,
            uint256 prizePool,
            uint256 remainingPool,
            address organizer,
            bool isComplete,
            uint256 playerCount,
            uint256 winnerCount
        )
    {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        return (
            t.id,
            t.name,
            t.game,
            t.description,
            t.prizePool,
            t.remainingPool,
            t.organizer,
            t.isComplete,
            t.players.length,
            t.winners.length
        );
    }

    /**
     * @dev Returns a player's gamer tag (original display string) for a tournament.
     */
    function getGamerTag(uint256 _tournamentId, address _player) external view returns (string memory) {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        return t.gamerWallets[_player];
    }

    /**
     * @dev Returns a wallet by gamer tag (case-insensitive).
     */
    function getWallet(uint256 _tournamentId, string memory _gamerTag) external view returns (address) {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        string memory normalized = _normalizeTag(_gamerTag);
        return t.gamerTags[normalized];
    }

    /**
     * @dev Returns players and their gamer tags as two parallel arrays (useful for frontends).
     */
    function getPlayersWithTags(uint256 _tournamentId)
        external
        view
        returns (address[] memory players, string[] memory gamerTags)
    {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        uint256 n = t.players.length;
        players = new address[](n);
        gamerTags = new string[](n);
        for (uint256 i = 0; i < n; i++) {
            address player = t.players[i];
            players[i] = player;
            gamerTags[i] = t.gamerWallets[player];
        }
        return (players, gamerTags);
    }

    function getTournamentPlayers(uint256 _tournamentId) external view returns (address[] memory) {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        return t.players;
    }

    function getTournamentWinners(uint256 _tournamentId) external view returns (address[] memory) {
        Tournament storage t = tournaments[_tournamentId];
        require(t.id != 0, "Tournament does not exist");
        return t.winners;
    }

    // --- Internal helpers ---

    /**
     * @dev Normalize a gamer tag to lowercase ascii to avoid case collisions.
     *      Assumes gamer tags are reasonable ASCII; non-ASCII bytes are preserved as-is.
     */
    function _normalizeTag(string memory _tag) internal pure returns (string memory) {
        bytes memory b = bytes(_tag);
        for (uint256 i = 0; i < b.length; i++) {
            bytes1 char = b[i];
            // 'A' = 0x41, 'Z' = 0x5A; add 32 to convert to lowercase
            if (char >= 0x41 && char <= 0x5A) {
                b[i] = bytes1(uint8(char) + 32);
            }
        }
        return string(b);
    }
}
