// @ts-nocheck
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { defineChain } from 'viem'

export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.arc.network'] },
  },
  blockExplorers: {
    default: { name: 'Arc Explorer', url: 'https://explorer.testnet.arc.network' },
  },
})

export const projectId = '3fcc6bba6f1de962d911bb5b5c3dba68'

const metadata = {
  name: 'Kee Arc',
  description: 'AI-Powered Agentic Escrow on Arc L1',
  url: 'https://keearc.vercel.app', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [arcTestnet],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage as any
  }) as any,
})