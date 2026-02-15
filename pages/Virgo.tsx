import React, { useState, useEffect, useRef } from 'react'
import {
  Hammer,
  Flame,
  Box,
  Layers,
  Cpu,
  Thermometer,
  Activity,
  Zap,
  Users,
  FileCode,
  CheckCircle2,
  RefreshCw,
  Construction
} from 'lucide-react'
import { GenerativeAvatar } from '../components/GenerativeAvatar'
import { useSimulation } from '../contexts/SimulationContext'

const CONSTRUCTION_LOGS = [
  '>> INITIALIZING_FORGE_CORE_V7.0...',
  '>> HEATING_CHAMBER_TO_1800C...',
  '>> LOADING_RAW_MATERIALS [AOXC]...',
  '>> COMPILING_SMART_CONTRACT_TEMPLATES...',
  '>> 3D_PRINTER_HEAD_ALIGNMENT [OK]...'
]

const RECENT_FORGED = [
  { name: 'Crew Rank Badge #442', type: 'NFT', status: 'SUCCESS' },
  { name: 'Governance Token V2', type: 'CONTRACT', status: 'DEPLOYED' },
  { name: 'VIP Lounge Pass', type: 'NFT', status: 'SUCCESS' },
  { name: 'Liquidity Lock Module', type: 'CONTRACT', status: 'STABLE' }
]

export const Virgo: React.FC = () => {
  const { executeTransaction, processShipRevenue, balances } = useSimulation()
  const [logs, setLogs] = useState<string[]>(CONSTRUCTION_LOGS)
  const [temperature, setTemperature] = useState(1500)
  const [progress, setProgress] = useState(72)
  const [isMinting, setIsMinting] = useState(false)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Simulate Forge Activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate Temp
      setTemperature(prev => {
        const change = Math.floor(Math.random() * 50) - 25
        const newTemp = prev + change
        return newTemp > 2000 ? 2000 : newTemp < 1000 ? 1000 : newTemp
      })

      // Add Logs randomly
      if (Math.random() > 0.7) {
        const actions = ['WELDING', 'ASSEMBLING', 'COOLING', 'POLISHING', 'DEPLOYING']
        const targets = ['ASSET_#X99', 'MODULE_CORE', 'SHELL_CASING', 'LOGIC_UNIT']
        const newLog = `>> ${actions[Math.floor(Math.random() * actions.length)]}_${targets[Math.floor(Math.random() * targets.length)]}...`
        setLogs(prev => [...prev.slice(-8), newLog])
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  const handleMint = async () => {
    const mintCost = 500 // 500 AOXC per mint
    setIsMinting(true)

    try {
      // 1. DEDUCT COST
      await executeTransaction('MINT', 'Forging Asset: Standard Asset Container', {
        token: 'AOXC',
        amount: mintCost
      })

      // 2. CREDIT REVENUE TO VIRGO
      await processShipRevenue('virgo', mintCost)

      setTimeout(() => {
        setIsMinting(false)
        setLogs(prev => [...prev, '>> ASSET_FORGED_SUCCESSFULLY!'])
        alert(`ASSET FORGED.\n-${mintCost} AOXC deducted.\nFunds transferred to Virgo Treasury.`)
      }, 3000)
    } catch (e: any) {
      alert(`MINTING FAILED: ${e.message}`)
      setIsMinting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="relative bg-[#050505] border border-orange-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-950/30 border border-orange-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-orange-500/20 border-t-orange-500 animate-spin-slow"></div>
              <Hammer className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  FORGE ONLINE
                </span>
                <span className="text-[10px] text-gray-500 font-mono">#VRG-FAB-007</span>
              </div>
              <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                Virgo Fabricator
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                CLASS: INDUSTRIAL CONSTRUCTOR / NFT FORGE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Total Assets</div>
              <div className="text-orange-400 font-mono text-sm font-bold flex items-center gap-2">
                <Box className="w-4 h-4" /> 124,500
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Minting Status
              </div>
              <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" /> ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: THE FORGE (MINTING STATION) */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#050505] border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Asset Forge
              </h3>
              <span className="text-xs font-mono text-orange-400 animate-pulse">
                {temperature}°C
              </span>
            </div>

            {/* Visual Forge */}
            <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 flex items-center justify-center">
              {/* Heat Glow */}
              <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full"></div>

              {/* Forge Ring */}
              <div className="w-48 h-48 rounded-full border-[8px] border-orange-900/50 border-t-orange-500 animate-[spin_3s_linear_infinite] relative z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full border-[2px] border-orange-500/30 blur-[2px]"></div>

                {/* Inner Core */}
                <div
                  className={`w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.6)] ${isMinting ? 'animate-bounce' : ''}`}
                >
                  <Box className="w-10 h-10 text-black fill-black/20" />
                </div>
              </div>

              {/* Particles (Sparks) */}
              <div className="absolute bottom-10 left-10 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-20 right-10 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping delay-300"></div>
            </div>

            {/* Mint Controls */}
            <div className="mt-auto space-y-4">
              <div className="bg-[#111] p-3 rounded-xl border border-white/5">
                <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2">
                  Project Blueprint
                </label>
                <select className="w-full bg-black border border-white/10 text-white text-xs rounded px-2 py-2 outline-none focus:border-orange-500">
                  <option>Standard Asset Container (500 AOXC)</option>
                  <option>Synthetic Token Contract (2500 AOXC)</option>
                </select>
              </div>

              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>Wallet Balance</span>
                <span className="text-white font-mono">{balances.AOXC.toLocaleString()} AOXC</span>
              </div>

              <button
                onClick={handleMint}
                disabled={isMinting}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isMinting ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <Zap className="fill-white" />
                )}
                {isMinting ? 'FORGING...' : 'IGNITE FORGE (500 AOXC)'}
              </button>
            </div>
          </div>
        </div>

        {/* ... (Existing Right Column Content) ... */}
        {/* MIDDLE: CONSTRUCTION & LOGS */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* MODULE CONSTRUCTION */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Construction className="w-4 h-4 text-orange-500" /> New Module Construction
              </h3>
              <span className="text-xs font-mono font-bold text-white">{progress}%</span>
            </div>

            <div className="w-full h-4 bg-[#111] rounded-full overflow-hidden mb-6 relative border border-white/5">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]"></div>
              <div
                className="h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-1000 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 h-full w-1 bg-white/50 animate-pulse"></div>
              </div>
            </div>

            {/* Terminal Output */}
            <div
              className="bg-black border border-white/10 rounded-lg p-4 font-mono text-xs text-orange-400 h-40 overflow-y-auto"
              ref={logContainerRef}
            >
              {logs.map((log, i) => (
                <div key={i} className="mb-1 opacity-80 hover:opacity-100">
                  {log}
                </div>
              ))}
              <div className="animate-pulse">_</div>
            </div>
          </div>

          {/* STATS & CREW ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fabrication Stats */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-5">
              <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Fabrication Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                  <span className="text-gray-400">NFTs Minted</span>
                  <span className="text-white font-bold font-mono">85,200</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                  <span className="text-gray-400">Contracts Deployed</span>
                  <span className="text-white font-bold font-mono">42</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Merit Badges</span>
                  <span className="text-orange-400 font-bold font-mono">12,400</span>
                </div>
              </div>
            </div>

            {/* Crew Profile */}
            <div className="bg-[#050505] border border-orange-500/20 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-[10px] text-orange-500 uppercase font-bold mb-3 flex items-center gap-2 relative z-10">
                <Users className="w-3 h-3" /> Forge Master
              </h4>

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-10 h-10">
                  <div className="rounded-full overflow-hidden w-full h-full border border-orange-500/50">
                    <GenerativeAvatar
                      seed="Hephaestus"
                      className="w-full h-full"
                      rankColor="#f97316"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase font-display">
                    Chief Hephaestus
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">Master Fabricator</div>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-400 italic relative z-10">
                "Biz sadece kod yazmayız, geleceği dijital maddeye dönüştürürüz."
              </div>
            </div>
          </div>

          {/* RECENTLY FORGED */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
            <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Recently Forged
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RECENT_FORGED.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {item.type === 'NFT' ? (
                      <Box className="w-3 h-3 text-purple-400" />
                    ) : (
                      <FileCode className="w-3 h-3 text-blue-400" />
                    )}
                    <span className="text-xs font-bold text-white">{item.name}</span>
                  </div>
                  <span className="text-[9px] text-green-400 font-bold bg-green-900/20 px-1.5 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
