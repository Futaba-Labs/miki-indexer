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
      address: "0x3D55f245D4c1b0515b902ed6765e01aF59bD4d99",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    ethTokenPool: {
      abi: ethTokenPoolAbi,
      network: "arbitrumSepolia",
      address: "0x94693a510afdeA0724301A25a5dA0f350AB4F91e",
      startBlock: Number(latestBlockArbitrumSepolia.number) - 60
    },
    // mikiReceiver: {
    //   abi: mikiReceiverAbi,
    //   network: "optimismSepolia",
    //   address: "0x66db521473d5492419Da2984331d2a9D076b2E59",
    //   startBlock: Number(latestBlockOptimismSepolia.number) - 60
    // }
    mikiReceiver: {
      abi: mikiReceiverAbi,
      network: {
        baseSepolia: {
          address: "0x75AB531ef3Fa35d52Ce7c2369b4381A62D90298d",
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
