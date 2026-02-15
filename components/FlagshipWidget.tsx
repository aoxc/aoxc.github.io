import React, { useEffect, useState } from 'react'
import {
  ShieldCheck,
  Users,
  Lock,
  Gem,
  Activity,
  ArrowUpRight,
  Copy,
  ExternalLink,
  Coins,
  Cpu,
  Trophy,
  Target,
  Clock,
  Zap,
  Medal,
  BarChart,
  Wallet
} from 'lucide-react'
import { AOXCLogo } from './AOXCLogo'
import { getAOXCTokenMetrics, TokenMetrics } from '../services/web3Service'
import { FLEET_MODULES } from '../constants'
import { MeritBadge } from './MeritBadge'

export const FlagshipWidget: React.FC = () => {
  const [metrics, setMetrics] = useState<TokenMetrics | null>(null)
  const aoxcData = FLEET_MODULES.find(m => m.id === 'andromeda')?.localToken

  useEffect(() => {
    getAOXCTokenMetrics().then(setMetrics)
  }, [])

  const copyAddress = () => {
    if (aoxcData?.contractAddress) {
      navigator.clipboard.writeText(aoxcData.contractAddress)
      alert('Kontrat adresi kopyalandı!')
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#06080e] group shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col">
      {/* --- Clearer Background Effects (No Noise) --- */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Content Grid */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Main Info Area */}
        <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">
          {/* Header / Status Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/50 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[10px] font-display text-cyan-300 tracking-widest font-bold uppercase">
                SYSTEMS NOMINAL
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 font-mono">
              <Cpu className="w-3 h-3 text-cyan-500" /> CORE v4.0.2
            </div>
          </div>

          {/* Split Layout: Identity vs Mini Widgets */}
          <div className="flex flex-col xl:flex-row gap-8">
            {/* LEFT: Identity */}
            <div className="flex flex-col sm:flex-row xl:flex-col items-center sm:items-start xl:items-center text-center sm:text-left xl:text-center gap-6 flex-shrink-0">
              {/* Visual Reactor */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <div className="absolute inset-0 rounded-full border border-cyan-500/40 border-t-cyan-400 animate-spin-slow shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
                <div className="absolute inset-2 rounded-full border border-cyan-500/20 border-b-white/60 animate-reverse-spin"></div>
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <AOXCLogo collapsed className="w-12 h-12" />
                </div>
                {/* Rank Insignia Overlay */}
                <div className="absolute -bottom-2 -right-2">
                  <MeritBadge
                    tier="ADMIRAL"
                    variant="ANDROMEDA"
                    className="w-10 h-10"
                    showGlow={false}
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter leading-none drop-shadow-lg uppercase mb-1">
                  ANDROMEDA
                </h1>
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                  Flagship Command
                </p>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto xl:mx-0 hidden sm:block">
                  Merkezi Yönetim Çekirdeği. DAO kararlarının ve AOXC token ekonomisinin kalbi.
                </p>
              </div>
            </div>

            {/* RIGHT: Operational Metrics Grid (The Mini Widgets) */}
            <div className="flex-1 grid grid-cols-2 gap-3 self-center w-full">
              {/* Widget 1: Price */}
              <div className="bg-[#0b0d14]/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-green-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-1.5 bg-green-500/10 rounded-md text-green-400 group-hover:text-green-300">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">Price</span>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white group-hover:text-green-400 transition-colors">
                    ${metrics?.price}
                  </div>
                  <div className="text-[10px] text-gray-400">{metrics?.priceOkb} OKB</div>
                </div>
              </div>

              {/* Widget 2: Market Cap */}
              <div className="bg-[#0b0d14]/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-yellow-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-1.5 bg-yellow-500/10 rounded-md text-yellow-400 group-hover:text-yellow-300">
                    <BarChart className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">M. Cap</span>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
                    {metrics?.marketCap}
                  </div>
                  <div className="text-[10px] text-gray-400">FDV: {metrics?.fdv}</div>
                </div>
              </div>

              {/* Widget 3: TVL */}
              <div className="bg-[#0b0d14]/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-1.5 bg-cyan-500/10 rounded-md text-cyan-400 group-hover:text-cyan-300">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">TVL</span>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {metrics?.tvl}
                  </div>
                  <div className="text-[10px] text-gray-400">Kilitli Değer</div>
                </div>
              </div>

              {/* Widget 4: Holders */}
              <div className="bg-[#0b0d14]/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-red-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-1.5 bg-red-500/10 rounded-md text-red-400 group-hover:text-red-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">Holders</span>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                    {metrics?.holders}
                  </div>
                  <div className="text-[10px] text-gray-400">Cüzdan Sayısı</div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Info Card */}
          <div className="mt-auto bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.03]">
              <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2 font-display">
                <Coins className="w-3.5 h-3.5" /> Token Contract
              </span>
              <div className="flex items-center gap-2">
                <code className="text-[10px] text-cyan-400 font-mono bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded tracking-wide">
                  {aoxcData?.contractAddress
                    ? `${aoxcData.contractAddress.substring(0, 8)}...${aoxcData.contractAddress.substring(36)}`
                    : 'Loading...'}
                </code>
                <button
                  onClick={copyAddress}
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Copy Address"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <a
                  href={aoxcData?.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                  title="View on OKLink"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/10 p-3">
              <div className="text-center sm:text-left">
                <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 font-display">
                  Max Supply
                </div>
                <div className="text-xs md:text-sm font-mono text-white font-bold tabular-nums">
                  100,000,000,000
                </div>
              </div>
              <div className="text-center sm:text-left pl-3">
                <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 font-display">
                  Circulating
                </div>
                <div className="text-xs md:text-sm font-mono text-white font-bold tabular-nums">
                  100,000,000,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
