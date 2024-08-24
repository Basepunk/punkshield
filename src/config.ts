import { defineChain } from 'viem'

export const mintMainnet = defineChain({
    id: 185,
    name: 'Mint',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.mintchain.io'],
        webSocket: ['wss://rpc.mintchain.io'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://explorer.mintchain.io' },
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 5022,
      },
    },
  })

  export const mintSepolia = defineChain({
    id: 1687,
    name: 'Mint Sepolia Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://sepolia-testnet-rpc.mintchain.io/'],
        webSocket: ['wss://sepolia-testnet-rpc.mintchain.io'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://sepolia-testnet-explorer.mintchain.io/' },
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 5022,
      },
    },
  })