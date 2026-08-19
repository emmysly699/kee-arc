'use client'
import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' 

export default function Home() {
  const { isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const [providerAddress, setProviderAddress] = useState('')
  const [milestoneDesc, setMilestoneDesc] = useState('Deliver MVP Codebase')
  const [amount, setAmount] = useState('10')

  const handleCreateEscrow = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: [
        {
          name: 'createEscrow',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: '_provider', type: 'address' },
            { name: '_evaluator', type: 'address' },
            { name: '_milestoneDescs', type: 'string[]' },
            { name: '_milestoneAmounts', type: 'uint256[]' }
          ],
        }
      ],
      functionName: 'createEscrow',
      args: [
        providerAddress || '0x0000000000000000000000000000000000000000', 
        '0x0000000000000000000000000000000000000000', 
        [milestoneDesc], 
        [parseEther(amount)]
      ],
      value: parseEther(amount) 
    })
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Create New AI-Evaluated Escrow</h2>
        
        {!isConnected ? (
          <div className="text-center p-6 bg-slate-900 rounded-lg border border-dashed border-slate-600">
            <p className="text-slate-400">Please connect your wallet to interact with Kee Arc.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Provider (Worker) Address</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" placeholder="0x..." value={providerAddress} onChange={e => setProviderAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Milestone Description</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" value={milestoneDesc} onChange={e => setMilestoneDesc(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Lock Amount (USDC)</label>
              <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            
            <button 
              onClick={handleCreateEscrow}
              disabled={isPending}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              {isPending ? 'Locking USDC on Arc...' : 'Lock Funds in Escrow'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}