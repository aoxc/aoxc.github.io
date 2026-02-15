import React, { useState, useEffect } from 'react'
import {
  Network,
  ArrowRight,
  History,
  ShieldCheck,
  Activity,
  Zap,
  Globe,
  Users,
  ChevronDown,
  Timer,
  Lock,
  Loader2
} from 'lucide-react'
import { GenerativeAvatar } from '../components/GenerativeAvatar'
import { useSimulation } from '../contexts/SimulationContext'

interface BridgeLog {
  source: string
  dest: string
  asset: string
  amount: string
  status: 'SUCCESS' | 'IN TRANSIT' | 'PENDING'
  hash: string
}

const RECENT_TRANSFERS: BridgeLog[] = [
  {
    source: 'SOLANA',
    dest: 'X LAYER',
    asset: 'AOXC',
    amount: '1,200',
    status: 'SUCCESS',
    hash: '0x3a...99'
  },
  {
    source: 'X LAYER',
    dest: 'BSC',
    asset: 'OKB',
    amount: '450',
    status: 'IN TRANSIT',
    hash: '0x1b...44'
  },
  {
    source: 'ARBITRUM',
    dest: 'X LAYER',
    asset: 'USDT',
    amount: '10,000',
    status: 'SUCCESS',
    hash: '0x7c...11'
  },
  {
    source: 'ETHEREUM',
    dest: 'X LAYER',
    asset: 'ETH',
    amount: '2.5',
    status: 'SUCCESS',
    hash: '0x9d...22'
  }
]

const CHAINS = [
  { id: 'xlayer', name: 'X LAYER', color: 'text-green-400' },
  { id: 'eth', name: 'ETHEREUM', color: 'text-blue-400' },
  { id: 'bsc', name: 'BSC', color: 'text-yellow-400' },
  { id: 'sol', name: 'SOLANA', color: 'text-purple-400' },
  { id: 'arb', name: 'ARBITRUM', color: 'text-cyan-400' }
]

export const Bridge: React.FC = () => {
  const { executeTransaction, processShipRevenue } = useSimulation()
  const [sourceChain, setSourceChain] = useState(CHAINS[1]) // ETH
  const [destChain, setDestChain] = useState(CHAINS[0]) // X LAYER
  const [amount, setAmount] = useState('')
  const [isWarping, setIsWarping] = useState(false)
  const [warpProgress, setWarpProgress] = useState(0)

  const handleSwapChains = () => {
    const temp = sourceChain
    setSourceChain(destChain)
    setDestChain(temp)
  }

  const handleWarp = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    setIsWarping(true)
    setWarpProgress(0)

    try {
      const bridgeFee = 250 // Mock fee in AOXC or similar for bridge toll (simulated deduction from source)

      // In this demo, we just simulate the gas cost on X Layer if sending FROM X Layer
      // For simplicity, we assume we pay a toll in AOXC regardless of direction for the simulation context
      await executeTransaction(
        'BRIDGE',
        `Bridging ${amount} USDC from ${sourceChain.name} to ${destChain.name}`,
        { token: 'AOXC', amount: 50 } // Toll fee
      )

      await processShipRevenue('centaurus', 50)

      // Progress Animation
      const interval = setInterval(() => {
        setWarpProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsWarping(false)
            alert(
              'WARP JUMP COMPLETE.\nAssets arrived in target dimension.\n-50 AOXC Toll paid to Centaurus Treasury.'
            )
            return 100
          }
          return prev + 2
        })
      }, 50)
    } catch (e: any) {
      alert(`BRIDGE FAILED: ${e.message}`)
      setIsWarping(false)
    }
  }

  // ... (Rest of UI remains identical) ...
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="relative bg-[#050505] border border-violet-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-violet-950/30 border border-violet-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-violet-500/20 border-t-violet-400 animate-spin-slow"></div>
              <Network className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  WORMHOLE STABILIZED
                </span>
                <span className="text-[10px] text-gray-500 font-mono">#CEN-BRG-004</span>
              </div>
              <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                Centaurus Bridge
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                CLASS: WORMHOLE NAVIGATOR / CROSS-CHAIN HUB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Gate Security</div>
              <div className="text-red-400 font-mono text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> HIGH-ALERT
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Latency</div>
              <div className="text-violet-400 font-mono text-sm font-bold flex items-center gap-2">
                <Timer className="w-4 h-4" /> 3.5 MIN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT: TRANSFER PANEL (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-[#050505] border border-violet-500/30 rounded-3xl p-1 relative shadow-[0_0_40px_rgba(139,92,246,0.15)]">
            <div className="bg-[#0a0a0a] rounded-[20px] p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-500" />
                  WARP TELEPORTATION
                </h2>
              </div>

              {/* Source Galaxy */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/5 hover:border-violet-500/50 transition-colors group relative">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                  Origin Galaxy (Source)
                </div>
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className={`text-lg font-bold ${sourceChain.color}`}>
                      {sourceChain.name}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={handleSwapChains}
                  className="bg-[#151515] border border-violet-500/30 p-2 rounded-full text-violet-500 hover:rotate-180 transition-transform shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </button>
              </div>

              {/* Dest Galaxy */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/5 hover:border-violet-500/50 transition-colors group mt-2">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                  Destination Galaxy
                </div>
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className={`text-lg font-bold ${destChain.color}`}>{destChain.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Asset Amount */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>ASSET TO BEAM</span>
                  <span>Available: High</span>
                </div>
                <div className="flex items-center gap-3 bg-[#050505] p-3 rounded-xl border border-white/5">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="bg-transparent text-xl font-mono font-bold text-white outline-none w-full placeholder-gray-700"
                  />
                  <div className="px-3 py-1 bg-white/10 rounded text-xs font-bold text-white">
                    USDC
                  </div>
                </div>
              </div>

              {/* Info Stats */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">ESTIMATED ARRIVAL</span>
                  <span className="text-white font-mono">~3.5 Mins</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">BRIDGE TOLL (AOXC)</span>
                  <span className="text-white font-mono">50.00 AOXC</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleWarp}
                disabled={isWarping}
                className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-bold font-display uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50"
              >
                {isWarping ? (
                  <>
                    <div
                      className="absolute inset-0 bg-violet-800/50"
                      style={{ width: `${warpProgress}%` }}
                    ></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <Loader2 className="animate-spin" /> BEAMING... {warpProgress}%
                    </span>
                  </>
                ) : (
                  <>
                    <Zap className="fill-white w-4 h-4" />
                    INITIATE WARP JUMP
                  </>
                )}
              </button>
            </div>
          </div>

          {/* BRIDGE STABILITY */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-500" /> Bridge Stability
              </h3>
              <span className="text-violet-400 font-bold text-xs">100%</span>
            </div>
            <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] w-full"></div>
            </div>
            <div className="text-[9px] text-gray-500 text-right">
              Current Traffic: 12 Ships in Transit
            </div>
          </div>
        </div>

        {/* MIDDLE: WORMHOLE VISUALIZER (5 cols) */}
        <div className="xl:col-span-5 flex flex-col justify-center">
          <div className="aspect-square relative flex items-center justify-center">
            {/* The Wormhole */}
            <div
              className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-all duration-1000 ${isWarping ? 'scale-110' : 'scale-100'}`}
            >
              {/* Deep Void */}
              <div className="absolute inset-0 bg-black rounded-full border border-violet-900/50 shadow-[inset_0_0_50px_rgba(0,0,0,1)]"></div>

              {/* Rotating Accretion Disk */}
              <div className="absolute inset-0 rounded-full border-[20px] border-double border-violet-600/20 border-t-violet-400 border-l-transparent animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border-[10px] border-dashed border-purple-500/30 border-b-purple-300 animate-[spin_12s_linear_infinite_reverse]"></div>

              {/* Particle Stream */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,92,246,0.1)_70%)] animate-pulse"></div>

              {/* Center Singularity */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full blur-md shadow-[0_0_30px_white] animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>

              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"></div>
            </div>

            {/* Status Overlay */}
            <div className="absolute bottom-0 text-center">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1">
                Singularity Status
              </div>
              <div
                className={`text-lg font-display font-bold ${isWarping ? 'text-white animate-pulse' : 'text-violet-400'}`}
              >
                {isWarping ? 'OPENING DIMENSIONAL RIFT...' : 'STABLE'}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: CREW & LOGS (3 cols) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          {/* CREW PANEL */}
          <div className="bg-[#0a0a0a] border border-violet-500/30 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Users className="w-4 h-4" /> Crew: Gatekeepers
            </h3>

            {/* Lead Profile */}
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="relative w-12 h-12">
                <div className="absolute -inset-1 rounded-full border border-violet-500/50 border-t-violet-300 animate-spin-slow"></div>
                <div className="rounded-full overflow-hidden w-full h-full border border-black">
                  <GenerativeAvatar seed="Arcturus" className="w-full h-full" rankColor="#8b5cf6" />
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase font-display">
                  Cmdr. Arcturus
                </div>
                <div className="text-[10px] text-gray-500 font-mono">Wormhole Navigator</div>
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
                <span className="text-gray-400">Gate Guards</span>
                <span className="text-violet-400 font-bold">200 / 200 ACTIVE</span>
              </div>
              <div className="mt-2 p-2 bg-black border border-white/10 rounded text-[10px] text-gray-400 italic leading-tight">
                "Zincirler arası boşlukta hiçbir varlık kaybolmaz. Yol açık, kapı güvenli."
              </div>
            </div>
          </div>

          {/* RECENT TRANSFERS */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 overflow-hidden flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Jumps
            </h3>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
              {RECENT_TRANSFERS.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                      <span>{log.source}</span>
                      <ArrowRight className="w-3 h-3 text-violet-500" />
                      <span>{log.dest}</span>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded border 
                                    ${log.status === 'SUCCESS' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'}
                                  `}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-white">
                      {log.amount} {log.asset}
                    </span>
                    <span className="text-[9px] text-gray-600 font-mono group-hover:text-violet-400 transition-colors cursor-pointer">
                      {log.hash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TVL BOX */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
            <h3 className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-2">
              <Lock className="w-3 h-3" /> Locked in Vaults
            </h3>
            <div className="text-2xl font-mono font-bold text-white">$12,450,900</div>
            <div className="text-[9px] text-green-500 mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> +5% Growth
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
