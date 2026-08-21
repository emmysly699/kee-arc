// @ts-nocheck
import './globals.css'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Web3ModalProvider from '@/context'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const initialState = cookieToInitialState(config, headersList.get('cookie'))
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        <Web3ModalProvider initialState={initialState}>
          <nav className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Kee Arc Protocol</h1>
            <w3m-button />
          </nav>
          <main className="p-8 max-w-4xl mx-auto">
            {children}
          </main>
        </Web3ModalProvider>
      </body>
    </html>
  )
}
