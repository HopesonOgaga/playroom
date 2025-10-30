// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @dev A simple ERC20 token to simulate USDC for testing.
 * It includes a `mint` function and overrides `decimals` to return 6.
 */
contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC") {
        // Mint some initial tokens to the deployer just in case
        _mint(msg.sender, 1_000_000 * (10**6));
    }

    /**
     * @dev Public function to create new tokens for any address.
     * Only for testing purposes.
     */
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    /**
     * @dev Overrides the default ERC20 decimals (18) to match USDC (6).
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
