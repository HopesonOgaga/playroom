// src/config/wagmi.js
import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// ✅ Use `const config = ...` before exporting
const config = createConfig({
  chains: [mainnet, arbitrum, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
  },
});

export default config;
