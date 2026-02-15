import React, { useState, useEffect } from 'react'
import {
  Landmark,
  PieChart,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Layers,
  Activity,
  Flame,
  Disc,
  AlertTriangle,
  CheckCircle2,
  Lock
} from 'lucide-react'
import { FLEET_MODULES } from '../constants'
import { AOXCLogo } from '../components/AOXCLogo'

// --- SUB-COMPONENT: DONUT CHART ---
const DistributionChart = () => {
  // SVG Config
  const size = 200
  const strokeWidth = 20
  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Data: 55% AOXC, 25% Stable, 20% XP
  const segments = [
    { color: '#8CD100', percent: 55, label: 'AOXC Reserve' }, // Green
    { color: '#3b82f6', percent: 25, label: 'Liquid Stable' }, // Blue
    { color: '#a855f7', percent: 20, label: 'Ship XP Tokens' } // Purple
  ]

  let offset = 0

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90 drop-shadow-xl">
        {segments.map((seg, i) => {
          const strokeDasharray = `${(seg.percent / 100) * circumference} ${circumference}`
          const strokeDashoffset = -offset
          offset += (seg.percent / 100) * circumference

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out hover:opacity-80"
            />
          )
        })}
        {/* Inner Glow Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - 15}
          fill="transparent"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          Total Value
        </span>
        <span className="text-xl font-mono font-bold text-white">$42.5M</span>
      </div>
    </div>
  )
}

export const Treasury: React.FC = () => {
  const [uplinkStable, setUplinkStable] = useState(true)

  // Simulate Uplink check
  useEffect(() => {
    const timer = setTimeout(() => setUplinkStable(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. FINANCIAL UPLINK STATUS BAR */}
      <div
        className={`w-full px-4 py-2 rounded-lg border flex items-center justify-between transition-colors ${uplinkStable ? 'bg-green-900/10 border-green-500/20' : 'bg-yellow-900/10 border-yellow-500/20'}`}
      >
        <div className="flex items-center gap-2">
          {uplinkStable ? (
            <Activity className="w-4 h-4 text-green-500" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          )}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${uplinkStable ? 'text-green-400' : 'text-yellow-500'}`}
          >
            {uplinkStable
              ? 'FINANCIAL UPLINK ESTABLISHED [X LAYER MAINNET]'
              : 'ESTABLISHING SECURE CONNECTION...'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
          <span>BLOCK: #1245092</span>
          <span>SYNC: 12ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. THE MASTER VAULT (Main Stats + Donut) */}
        <div className="lg:col-span-2 bg-[#0B0C15] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Left Text Info */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <Landmark className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                    Master Vault
                  </h2>
                  <p className="text-xs text-gray-400">Konsolide DAO Hazinesi & Teminat Merkezi</p>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Toplam Varlık (TVL)
                </div>
                <div className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                  $42,509,120
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-500/10 border border-green-500/20 px-2 py-1 rounded">
                    <TrendingUp className="w-3 h-3" /> +$1.2M (Haftalık Büyüme)
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    PASİF GELİR AKIŞLARI AKTİF
                  </span>
                </div>
              </div>

              {/* Collateral Info */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-xlayer-green" />
                  <span className="text-xs font-bold text-white">Collateralization (Teminat)</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  AOXC, ekosistemdeki tüm XP tokenlerinin ana rezerv para birimidir. Her XP tokeni,
                  hazinedeki AOXC varlıklarıyla %100 oranında desteklenir.
                </p>
              </div>
            </div>

            {/* Right Chart */}
            <div className="flex-shrink-0 flex flex-col items-center gap-6">
              <DistributionChart />

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-xlayer-green shadow-[0_0_10px_#8CD100]"></div>
                  <span className="text-gray-300">AOXC (%55)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                  <span className="text-gray-300">Stable (%25)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
                  <span className="text-gray-300">XP Tokens (%20)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. AOXC ECONOMIC CORE (Right Sidebar) */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          {/* Background Logo */}
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <AOXCLogo className="w-48 h-48" />
          </div>

          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
            <RefreshCw className="w-5 h-5 text-gray-400" /> Token Ekonomisi
          </h3>

          <div className="space-y-4 relative z-10 flex-1">
            {/* Base Asset */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
                Base Reserve Asset
              </span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">AOXC</span>
                <span className="px-2 py-0.5 bg-xlayer-green/20 text-xlayer-green text-[10px] font-bold rounded border border-xlayer-green/30">
                  GOVERNANCE
                </span>
              </div>
            </div>

            {/* Peg Status */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
                Peg Health Status
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-bold text-white">HEALTHY</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">Dev: 0.02%</span>
              </div>
            </div>

            {/* Info Text */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-500 leading-relaxed">
                <span className="text-white font-bold">Algoritmik Dengeleyici:</span> Aquila
                Exchange, parite sapmalarını (De-peg) otomatik arbitraj ile düzeltir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FLEET TOKENOMICS BREAKDOWN */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Layers className="text-xlayer-green" />
            FİLO TOKEN HAZİNELERİ & PARİTELER
          </h3>
          <div className="hidden sm:flex gap-2 text-[10px] font-bold uppercase text-gray-500">
            <span className="px-2 py-1 bg-white/5 rounded">Ref: Block #12M</span>
            <span className="px-2 py-1 bg-white/5 rounded">Network: X Layer</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_MODULES.filter(m => m.id !== 'andromeda').map(module => (
            <div
              key={module.id}
              className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group relative overflow-hidden"
            >
              {/* Token Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${module.themeColor}-500/10 flex items-center justify-center border border-${module.themeColor}-500/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
                  >
                    <span className={`font-bold text-${module.themeColor}-400 text-xs`}>
                      {module.localToken.symbol}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm group-hover:text-white transition-colors">
                      {module.localToken.name}
                    </h4>
                    <div className="text-[10px] text-gray-500 font-mono">{module.name}</div>
                  </div>
                </div>

                {/* Parity Badge */}
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Parity</div>
                  <div className="text-xs font-mono font-bold text-white">
                    1:{module.localToken.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Supply Dynamics (Burn vs Mint) */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-[9px] uppercase font-bold text-gray-500 mb-1">
                  <span>Supply Dynamics</span>
                  <span>24H Activity</span>
                </div>

                {/* Mint Bar */}
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5">
                    <span className="text-green-500 flex items-center gap-1">
                      <RefreshCw size={8} /> MINT RATE
                    </span>
                    <span className="font-mono text-white">High</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[65%]"></div>
                  </div>
                </div>

                {/* Burn Bar */}
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5">
                    <span className="text-orange-500 flex items-center gap-1">
                      <Flame size={8} /> BURN RATE
                    </span>
                    <span className="font-mono text-white">Medium</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[35%]"></div>
                  </div>
                </div>
              </div>

              {/* Treasury & Change */}
              <div className="flex justify-between items-end bg-[#151515] p-3 rounded-lg border border-white/5">
                <div>
                  <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                    Silo Capacity
                  </div>
                  <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-gray-400" />
                    {module.treasury.locked}
                  </div>
                </div>

                <div
                  className={`text-xs font-bold font-mono px-2 py-1 rounded bg-black border ${module.localToken.change24h >= 0 ? 'text-green-400 border-green-900' : 'text-red-400 border-red-900'}`}
                >
                  {module.localToken.change24h > 0 ? '+' : ''}
                  {module.localToken.change24h}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
