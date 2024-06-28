import { createConfig } from "@ponder/core";
import { http } from "viem";

import {
  l2AssetManagerAbi
} from "./abis/l2AssetManagerAbi";
import { ethTokenPoolAbi } from "./abis/ethTokenPoolAbi";
import { mikiReceiverAbi } from "./abis/mikiReceiverAbi";
import { mikiRouterReceiverAbi } from "./abis/mikiRouterReceiverAbi";

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
    mantleSepolia: {
      chainId: 5003,
      transport: http(process.env.PONDER_RPC_URL_MANTLE_SEPOLIA),
      pollingInterval: 15_000,
    },
    scrollSepolia: {
      chainId: 534352,
      transport: http(process.env.PONDER_RPC_URL_SCROLL_SEPOLIA),
      pollingInterval: 15_000,
    },
    avalancheFuji: {
      chainId: 43113,
      transport: http(process.env.PONDER_RPC_URL_AVALANCHE_FUJI),
      pollingInterval: 15_000,
    },
    bnbTestnet: {
      chainId: 97,
      transport: http(process.env.PONDER_RPC_URL_BNB_TESTNET),
      pollingInterval: 15_000,
    },
    blastSepolia: {
      chainId: 168587773,
      transport: http(process.env.PONDER_RPC_URL_BLAST_SEPOLIA),
      pollingInterval: 15_000,
    },
    zkSyncSepolia: {
      chainId: 300,
      transport: http(process.env.PONDER_RPC_URL_ZKSYNC_SEPOLIA),
      pollingInterval: 15_000,
    }
  },
  contracts: {
    l2AssetManager: {
      abi: l2AssetManagerAbi,
      network: "arbitrumSepolia",
      address: "0xCE18358DaE886C8c8a8697712Af35fA7bF6227CF",
      startBlock: 38464035
    },
    ethTokenPool: {
      abi: ethTokenPoolAbi,
      network: "arbitrumSepolia",
      address: "0x6a509D7d555d041E606F6ff8b90f371c9a03Bfca",
      startBlock: 38464035
    },
    mikiReceiver: {
      abi: mikiReceiverAbi,
      network: {
        baseSepolia: {
          address: "0x3063E6ed87eE62337ca7c976EF4B6c4d941D013C",
          startBlock: 9275776,
        },
        optimismSepolia: {
          address: "0x956cb7F2f3fC094dD4097484EFC93C818Ef7946E",
          startBlock: 11175082,
        },
        mantleSepolia: {
          address: "0x5a4Ae660c4efA96D4565cdBDD6B14Dfd643DE471",
          startBlock: 8103109
        },
        scrollSepolia: {
          address: "0xb8459636a5d82e68D0562E8EDa9c86195E573300",
          startBlock: 4637624,
        },
        avalancheFuji: {
          address: "0x5a4Ae660c4efA96D4565cdBDD6B14Dfd643DE471",
          startBlock: 34145993,
        },
        bnbTestnet: {
          address: "0x5a4Ae660c4efA96D4565cdBDD6B14Dfd643DE471",
          startBlock: 41248658,
        },
        blastSepolia: {
          address: "0x5a4Ae660c4efA96D4565cdBDD6B14Dfd643DE471",
          startBlock: 6918466
        }
      },
    },
    mikiRouterReceiver: {
      abi: mikiRouterReceiverAbi,
      network: {
        baseSepolia: {
          address: "0x3a4f0f1f1123080EE16b4B98A0e195816A519A84",
          startBlock: 11896571,
        },
        optimismSepolia: {
          address: "0xAEe4c88c930447e1c8eD0D170cfC828475b89ade",
          startBlock: 13879469,
        },
        scrollSepolia: {
          address: "0x5C9e69CD328af88374cD99880e3D62C3D0FD07be",
          startBlock: 5017955,
        },
        blastSepolia: {
          address: "0x1d706641006fE1B861c9Ac2EB8924bfE1b6a834E",
          startBlock: 7437445
        },
        zkSyncSepolia: {
          address: "0x78e35420e6A729D73Ad011c3bfDE39068B6F4317",
          startBlock: 3108855
        },
      },
    }
  },
});
