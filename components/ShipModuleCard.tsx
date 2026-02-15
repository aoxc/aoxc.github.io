import React, { useState, useEffect } from 'react'
import {
  Cpu,
  ArrowRightLeft,
  Network,
  Eye,
  ShieldAlert,
  Box,
  Scale,
  LucideIcon,
  HelpCircle,
  Lock,
  Wallet,
  AlertTriangle,
  Loader2,
  TrendingUp,
  ShoppingBag,
  ExternalLink
} from 'lucide-react'
import { ShipModule, PageView } from '../types'
import { db, ShipTreasury } from '../services/databaseService'

// Map string keys from JSON/Constants to actual components
const ICON_MAP: Record<string, LucideIcon> = {
  Cpu: Cpu,
  ArrowRightLeft: ArrowRightLeft,
  Network: Network,
  Eye: Eye,
  ShieldAlert: ShieldAlert,
  Box: Box,
  Scale: Scale
}

interface ColorTheme {
  bg: string
  border: string
  text: string
  glow: string
  gradient: string
  stroke: string
}

const getColorClasses = (color: string): ColorTheme => {
  const map: Record<string, ColorTheme> = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      gradient: 'from-emerald-900 to-black',
      stroke: '#34d399'
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/40',
      text: 'text-violet-400',
      glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      gradient: 'from-violet-900 to-black',
      stroke: '#a78bfa'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      gradient: 'from-amber-900 to-black',
      stroke: '#fbbf24'
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/40',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.3)]',
      gradient: 'from-rose-900 to-black',
      stroke: '#fb7185'
    },
    fuchsia: {
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/40',
      text: 'text-fuchsia-400',
      glow: 'shadow-[0_0_20px_rgba(217,70,239,0.3)]',
      gradient: 'from-fuchsia-900 to-black',
      stroke: '#e879f9'
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/40',
      text: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
      gradient: 'from-orange-900 to-black',
      stroke: '#fb923c'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/40',
      text: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      gradient: 'from-cyan-900 to-black',
      stroke: '#22d3ee'
    }
  }
  return map[color] || map.cyan
}

// Intricate NFT Coat of Arms
const ShipEmblemSVG: React.FC<{ color: string; className?: string }> = ({ color, className }) => {
  const c = getColorClasses(color)
  return (
    <svg viewBox="0 0 100 100" className={`${className} overflow-visible`}>
      <defs>
        <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`shieldGrad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <g className="origin-center animate-spin-slow opacity-80">
        <path
          d="M50 5 a 45 45 0 0 1 0 90 a 45 45 0 0 1 0 -90"
          fill="none"
          stroke={c.stroke}
          strokeWidth="0.5"
          strokeDasharray="4 2"
        />
        <circle cx="50" cy="50" r="48" stroke={c.stroke} strokeWidth="0.2" opacity="0.5" />
      </g>
      <path
        d="M50 15 L85 30 V60 C85 80 50 95 50 95 C50 95 15 80 15 60 V30 Z"
        fill={`url(#shieldGrad-${color})`}
        stroke={c.stroke}
        strokeWidth="1.5"
        filter={`url(#glow-${color})`}
      />
      <path
        d="M50 15 V95 M15 30 H85 M30 50 H70"
        stroke={c.stroke}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <circle cx="50" cy="50" r="8" fill={c.stroke} className="animate-pulse" />
      <circle
        cx="50"
        cy="50"
        r="12"
        stroke={c.stroke}
        strokeWidth="1"
        fill="none"
        className="animate-ping"
        opacity="0.3"
      />
    </svg>
  )
}

export const ShipModuleCard: React.FC<{ ship: ShipModule; setPage: (page: PageView) => void }> = ({
  ship,
  setPage
}) => {
  const IconComponent = ICON_MAP[ship.icon] || HelpCircle
  const colors = getColorClasses(ship.themeColor)
  const [liveTreasury, setLiveTreasury] = useState<ShipTreasury>({ locked: 0, revenue: 0 })

  useEffect(() => {
    const load = async () => {
      const all = await db.getShipTreasuries()
      if (all[ship.id]) setLiveTreasury(all[ship.id])
    }
    load()
    // Poll for live updates
    const interval = setInterval(load, 3000)
    return () => clearInterval(interval)
  }, [ship.id])

  // --- SMART ROUTING LOGIC ---
  const handleDetailClick = () => {
    switch (ship.id) {
      case 'andromeda':
        setPage(PageView.GOVERNANCE)
        break
      case 'aquila':
        setPage(PageView.SWAP)
        break
      case 'centaurus':
        setPage(PageView.BRIDGE)
        break
      case 'pegasus':
        setPage(PageView.ORACLE)
        break
      case 'quasar':
        setPage(PageView.SECURITY)
        break
      case 'virgo':
        setPage(PageView.VIRGO)
        break
      case 'sombrero':
        setPage(PageView.SENTINEL)
        break
      default:
        setPage(PageView.DASHBOARD)
    }
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl bg-[#080808] border ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:${colors.glow} flex flex-col`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
      ></div>

      <div className="relative z-10 p-5 pb-0">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${colors.border} ${colors.text} bg-black flex items-center gap-1`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full bg-${ship.themeColor}-500 animate-pulse`}
            ></div>
            {ship.status}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[9px] text-green-500 font-bold bg-green-900/20 px-2 py-0.5 rounded border border-green-900/40">
              <Network className="w-3 h-3" />
              CONNECTED
            </div>
            <span className="text-[9px] text-gray-600 font-mono mt-0.5">X LAYER NODE</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <ShipEmblemSVG color={ship.themeColor} className="absolute inset-0 w-full h-full" />
            <div
              className={`relative z-10 p-2 rounded-full bg-black/80 backdrop-blur border ${colors.border} ${colors.text}`}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          </div>

          <div>
            <h3
              className={`text-xl font-display font-bold text-white tracking-wide group-hover:${colors.text} transition-colors`}
            >
              {ship.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
              {ship.role}
            </p>
            <div className="flex flex-col gap-1">
              <div className="text-[10px] bg-white/5 inline-flex px-1.5 py-0.5 rounded text-gray-400 font-mono border border-white/5 w-fit">
                {ship.localToken.symbol}
              </div>
              {ship.marketStats && (
                <div className={`text-[9px] font-mono font-bold ${colors.text}`}>
                  {ship.marketStats.exchangeRate}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mb-4 space-y-2 relative z-10">
        <div className="bg-[#0c0c0c] border border-white/10 rounded-lg p-3 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase font-bold flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Kilitli Hazine
            </span>
            <span className="text-sm font-mono font-bold text-white tabular-nums">
              {liveTreasury.locked.toLocaleString()}{' '}
              <span className="text-[9px] text-gray-600">AOXC</span>
            </span>
            <span className="text-[8px] font-mono text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5" /> +{liveTreasury.revenue.toFixed(2)} Tax
            </span>
          </div>

          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-[8px] text-gray-500 uppercase font-bold flex items-center gap-1">
              <Wallet className="w-2.5 h-2.5" /> Gelir (APY)
            </span>
            <span className="text-sm font-mono font-bold text-yellow-500 tabular-nums">
              %12.4 <span className="text-[9px] text-yellow-500/50">APR</span>
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 mb-4 relative z-10">
        <div className="text-[9px] text-gray-500 font-bold uppercase mb-2 flex items-center justify-between">
          <span>Aktif Görev İstasyonları</span>
          <span className="text-yellow-500">3/3 Hazır</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ship.missions.map(mission => (
            <div
              key={mission.id}
              onClick={() => setPage(PageView.MISSIONS)}
              className="aspect-square bg-yellow-500/5 border border-yellow-500/20 rounded-lg flex flex-col items-center justify-center text-center p-1 group/mission cursor-pointer hover:bg-yellow-500/10 transition-colors"
            >
              <Loader2 className="w-4 h-4 text-yellow-500 mb-1" />
              <span className="text-[8px] font-bold text-yellow-500 uppercase leading-tight">
                GÖREVİ
                <br />
                BAŞLAT
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-5 pt-0 flex items-center gap-2 relative z-10">
        <button
          onClick={handleDetailClick}
          className={`flex-1 py-2 rounded-lg bg-[#151515] hover:bg-[#202020] border border-white/10 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 group/btn`}
        >
          <ExternalLink className="w-3 h-3 text-gray-500 group-hover/btn:text-white" />
          <span>Modül Detay</span>
        </button>
        <button
          onClick={() => setPage(PageView.MARKET)}
          className={`flex-1 py-2 rounded-lg ${colors.bg} hover:bg-opacity-20 border ${colors.border} text-xs font-bold ${colors.text} transition-colors flex items-center justify-center gap-2 relative overflow-hidden group/market`}
        >
          <span className="relative z-10 flex items-center gap-1">MARKET</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/market:translate-x-full transition-transform duration-500"></div>
        </button>
        <button
          onClick={() => setPage(PageView.MARKET)}
          className={`w-10 flex items-center justify-center py-2 rounded-lg bg-[#151515] hover:bg-white/10 border border-white/10 text-white transition-colors group/cart`}
        >
          <ShoppingBag className="w-4 h-4 group-hover/cart:text-yellow-500 transition-colors" />
        </button>
      </div>
    </div>
  )
}
