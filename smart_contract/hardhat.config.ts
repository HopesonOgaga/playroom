import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import { arbitrumSepolia } from "viem/chains";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    arbitrumSepolia: {
      type: "http",
      chainType: "op",
      url: configVariable("ARBITRUM_SEPOLIA_RPC_URL"),
      accounts: [configVariable("ARBITRUM_PRIVATE_KEY")],
      chainId: 421614,
    },
    arbitrumOne: {
      type: "http",
      chainType: "op",
      url: configVariable("ARBITRUM_MAINNET_RPC_URL"), // e.g., https://arb1.arbitrum.io/rpc
      accounts: [configVariable("ARBITRUM_PRIVATE_KEY")],
      chainId: 42161,
    },
  },
  verify:{
    etherscan: {
    apiKey: configVariable("ETHERSCAN_API_KEY"),
   },
  },
    chainDescriptors: {
    // Arbitrum One (Mainnet)
    42161: {
      name: "ArbitrumOne",
      blockExplorers: {
        // 'etherscan' is the key used by the hardhat-verify plugin
        etherscan: {
          name: "Arbiscan", // Display name
          url: "https://arbiscan.io", // Browser URL
          apiUrl: "https://api.arbiscan.io/api", // API URL for verification
        },
      },
    },
  },
};

export default config;
