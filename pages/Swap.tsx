import React, { useState } from 'react'
import { ArrowDown, Settings, Wallet, Zap, ArrowLeft, Box, RefreshCw } from 'lucide-react'
import { PageView } from '../types'
import { useSimulation } from '../contexts/SimulationContext'
import { useToast } from '../contexts/ToastContext'

interface SwapProps {
  setPage: (page: PageView) => void
}

export const Swap: React.FC<SwapProps> = ({ setPage }) => {
  const { balances, executeTransaction, processShipRevenue, aoxcPrice, refreshData } =
    useSimulation()
  const { addToast } = useToast()
  const [fromAmount, setFromAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return

    setIsSwapping(true)
    try {
      // 1. Calculate Tax (0.3% for Aquila)
      const amount = parseFloat(fromAmount)
      const fee = amount * 0.003
      const netAmount = amount - fee
      const receivedAOXC = netAmount / aoxcPrice

      // 2. Execute Deduction (USDC)
      await executeTransaction(
        'SWAP',
        `Swapped ${amount} USDC -> ${receivedAOXC.toFixed(2)} AOXC`,
        { token: 'USDC', amount: amount }
      )

      // 3. Credit AOXC to User (The Swap Logic)
      const { db } = await import('../services/databaseService')
      const currentAOXC = balances.AOXC || 0
      await db.updateBalance('AOXC', currentAOXC + receivedAOXC)

      // 4. Send Revenue to Aquila
      await processShipRevenue('aquila', fee)

      // 5. Force UI Refresh
      refreshData()

      addToast(
        'SUCCESS',
        'Swap Executed',
        `Received ${receivedAOXC.toFixed(2)} AOXC. Fees: ${fee.toFixed(2)} USDC`
      )
      setFromAmount('')
    } catch (e: any) {
      // Error toast handled by executeTransaction usually, but double check here if logic fails before TX
      if (!e.message.includes('Transaction Reverted')) {
        addToast('ERROR', 'Swap Failed', e.message)
      }
    } finally {
      setIsSwapping(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] border-b border-amber-500/20 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage(PageView.DASHBOARD)}
            className="p-2 rounded-full border border-white/10 hover:border-amber-500 hover:text-amber-500 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase">
                AQUILA <span className="text-amber-500">EXCHANGE</span>
              </h1>
              <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">
                ENGINE ONLINE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN: SWAP */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-[#050505] border border-amber-500/30 rounded-3xl p-1 relative shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="bg-[#0a0a0a] rounded-[20px] p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" /> WARP SWAP
                </h2>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-amber-500 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* FROM */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/5 hover:border-amber-500/50 transition-colors group">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>INPUT FUEL</span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> {balances.USDC.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                    className="bg-transparent text-2xl font-mono font-bold text-white outline-none w-full placeholder-gray-700"
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 shrink-0">
                    <span className="text-sm font-bold">USDC</span>
                  </div>
                </div>
              </div>

              {/* CONNECTOR */}
              <div className="h-6 flex items-center justify-center relative my-1">
                <div className="w-[1px] h-full bg-amber-500/20"></div>
                <button className="absolute bg-[#151515] border border-amber-500/30 p-1.5 rounded-full text-amber-500">
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              {/* TO */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/5 hover:border-amber-500/50 transition-colors group">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>OUTPUT THRUST (Est.)</span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> {balances.AOXC.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={fromAmount ? (parseFloat(fromAmount) / aoxcPrice).toFixed(4) : ''}
                    placeholder="0.00"
                    className="bg-transparent text-2xl font-mono font-bold text-amber-400 outline-none w-full placeholder-gray-700"
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 shrink-0">
                    <span className="text-sm font-bold">AOXC</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                onClick={handleSwap}
                disabled={isSwapping}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-bold font-display uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSwapping ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <Zap className="fill-black" />
                )}
                {isSwapping ? 'EXECUTING CONTRACT...' : 'INITIATE WARP JUMP'}
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: VISUALS */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="h-[350px] bg-[#050505] border border-amber-500/20 rounded-3xl relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]"></div>
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border border-amber-500/30 border-t-amber-400 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-amber-600/20 border-b-amber-500 animate-[spin_4s_linear_infinite_reverse]"></div>
              <div className="absolute inset-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center">
                <div className="text-black font-display font-black text-xl z-10">AQL</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INVENTORY */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          <div className="bg-[#0a0a0a] border border-amber-500/30 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Box className="w-4 h-4" /> Cargo Inventory
            </h3>
            <div className="space-y-2">
              {Object.entries(balances).map(([token, amount], idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#111] border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-300">
                      {token.substring(0, 3)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{token}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
