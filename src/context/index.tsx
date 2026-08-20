'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '@/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

// Adding "as any" bypasses the version mismatch error
createWeb3Modal({
  wagmiConfig: config as any,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark'
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config as any} initialState={initialState as any}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
