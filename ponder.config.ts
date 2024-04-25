import { createConfig } from "@ponder/core";
import { http, createPublicClient } from "viem";

import {
  l2AssetManagerAbi
} from "./abis/l2AssetManagerAbi";
import { ethTokenPoolAbi } from "./abis/ethTokenPoolAbi";
import { mikiReceiverAbi } from "./abis/mikiReceiverAbi";

// mainnet
// const latestBlockMainnet = await createPublicClient({
//   transport: http(process.env.PONDER_RPC_URL_1),
// }).getBlock();
// const latestBlockBase = await createPublicClient({
//   transport: http(process.env.PONDER_RPC_URL_8453),
// }).getBlock();
// const latestBlockOptimism = await createPublicClient({
//   transport: http(process.env.PONDER_RPC_URL_10),
// }).getBlock();
// const latestBlockArbitrum = await createPublicClient({
//   transport: http(process.env.PONDER_RPC_URL_42161),
// }).getBlock();
// const latestBlockPolygon = await createPublicClient({
//   transport: http(process.env.PONDER_RPC_URL_137),
// }).getBlock();

// testnet
const latestBlockArbitrumSepolia = await createPublicClient({
  transport: http(process.env.PONDER_RPC_URL_ARBITURM_SEPOLIA),
}).getBlock();
const latestBlockOptimismSepolia = await createPublicClient({
  transport: http(process.env.PONDER_RPC_URL_OPTIMISM_SEPOLIA),
}).getBlock();
const latestBlockBaseSepolia = await createPublicClient({
  transport: http(process.env.PONDER_RPC_URL_BASE_SEPOLIA),
}).getBlock();

export default createConfig({
  networks: {
    arbitrumSepolia: {
      chainId: 421614,
      transport: http(process.env.PONDER_RPC_URL_ARBITURM_SEPOLIA),
      pollingInterval: 15_000,
    },
    optimismSepolia: {
      chainId: 11155420,
      transport: http(process.env.PONDER_RPC_URL_OPTIMISM_SEPOLIA),
      pollingInterval: 15_000,
    },
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.PONDER_RPC_URL_BASE_SEPOLIA),
      pollingInterval: 15_000,
    },
  },
  contracts: {
    l2AssetManager: {
      abi: l2AssetManagerAbi,
      network: "arbitrumSepolia",
      address: "0x6165d02D9CC2ee9dE28e27Abb88A34297C09c4b0",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    ethTokenPool: {
      abi: ethTokenPoolAbi,
      network: "arbitrumSepolia",
      address: "0xa94DB5cAafA10F28DA7633c361556B8399073a1f",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    mikiReceiver: {
      abi: mikiReceiverAbi,
      network: {
        baseSepolia: {
          address: "0x6165d02D9CC2ee9dE28e27Abb88A34297C09c4b0",
          startBlock: Number(latestBlockBaseSepolia.number) - 60,
        },
        optimismSepolia: {
          address: "0x6165d02D9CC2ee9dE28e27Abb88A34297C09c4b0",
          startBlock: Number(latestBlockOptimismSepolia.number) - 60,
        },
      },
    },
  },
});
