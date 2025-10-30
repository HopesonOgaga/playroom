import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TournamentModule", (m) => {
  const tournament = m.contract("Tournament");

  return { tournament };
});
