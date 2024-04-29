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
      address: "0xCE18358DaE886C8c8a8697712Af35fA7bF6227CF",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    ethTokenPool: {
      abi: ethTokenPoolAbi,
      network: "arbitrumSepolia",
      address: "0x6a509D7d555d041E606F6ff8b90f371c9a03Bfca",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    mikiReceiver: {
      abi: mikiReceiverAbi,
      network: {
        baseSepolia: {
          address: "0x3063E6ed87eE62337ca7c976EF4B6c4d941D013C",
          startBlock: Number(latestBlockBaseSepolia.number) - 60,
        },
        optimismSepolia: {
          address: "0x956cb7F2f3fC094dD4097484EFC93C818Ef7946E",
          startBlock: Number(latestBlockOptimismSepolia.number) - 60,
        },
      },
    },
  },
});
