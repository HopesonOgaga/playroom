import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TournamentModule", (m) => {

  const owner = m.getAccount(0);
  const tournament = m.contract("TournamentContract",[owner]);

  return { tournament };
});
