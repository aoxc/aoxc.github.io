import React, { useState, useEffect, useRef } from 'react'
import {
  Eye,
  Activity,
  Globe,
  Database,
  Zap,
  Radio,
  CheckCircle2,
  AlertOctagon,
  Server,
  ArrowRight,
  Wifi,
  Users,
  ShieldAlert
} from 'lucide-react'
import { GenerativeAvatar } from '../components/GenerativeAvatar'
import { MeritBadge } from '../components/MeritBadge'

// --- MOCK DATA ---

interface PriceFeed {
  symbol: string
  price: string
  change: number
  confidence: number
  sources: number
  status: 'STABLE' | 'VOLATILE' | 'UPWARD' | 'DOWNWARD'
}

const INITIAL_FEEDS: PriceFeed[] = [
  {
    symbol: 'AOXC / USD',
    price: '1.2405',
    change: 2.1,
    confidence: 99.8,
    sources: 12,
    status: 'STABLE'
  },
  {
    symbol: 'OKB / USD',
    price: '54.12',
    change: 1.4,
    confidence: 99.9,
    sources: 8,
    status: 'UPWARD'
  },
  {
    symbol: 'ETH / USD',
    price: '2,450.10',
    change: -0.5,
    confidence: 99.7,
    sources: 15,
    status: 'VOLATILE'
  },
  {
    symbol: 'BTC / USD',
    price: '64,230.00',
    change: 0.2,
    confidence: 99.9,
    sources: 20,
    status: 'STABLE'
  }
]

const LOGS = [
  '>> FETCHING_EXTERNAL_DATA [BINANCE, OKX, COINBASE]...',
  '>> AGGREGATING_PRICE_MEDIAN...',
  '>> VALIDATING_STAKE_PROOF [NODE #421]...',
  '>> BROADCASTING_TO_ANDROMEDA...',
  '>> CONSENSUS_REACHED [BLOCK #124092]',
  '>> UPDATING_ON_CHAIN_STORAGE...'
]

export const Oracle: React.FC = () => {
  const [feeds, setFeeds] = useState(INITIAL_FEEDS)
  const [logs, setLogs] = useState<string[]>(LOGS)
  const [latency, setLatency] = useState(12)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Simulate Live Data Updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update Prices
      setFeeds(prev =>
        prev.map(feed => ({
          ...feed,
          price: (
            parseFloat(feed.price.replace(',', '')) *
            (1 + (Math.random() - 0.5) * 0.001)
          ).toFixed(feed.symbol.includes('AOXC') ? 4 : 2)
        }))
      )

      // Update Latency
      setLatency(Math.floor(Math.random() * 40) + 10)

      // Add Random Log
      const newLog = `>> SIGNAL_DETECTED [${Math.floor(Math.random() * 9999)}] - VERIFIED`
      setLogs(prev => [...prev.slice(-8), newLog])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* --- HEADER --- */}
      <div className="relative bg-[#050505] border border-cyan-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin-slow"></div>
              <Eye className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  SENSORS ONLINE
                </span>
                <span className="text-[10px] text-gray-500 font-mono">#PGS-ORC-003</span>
              </div>
              <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                Pegasus Oracle
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                CLASS: DEEP SPACE OBSERVER / DATA FEED
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Signal Strength
              </div>
              <div className="text-cyan-400 font-mono text-sm font-bold flex items-center gap-2">
                <Wifi className="w-4 h-4" /> 100% STRONG
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Data Integrity
              </div>
              <div className="text-green-400 font-mono text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT COLUMN: LIVE FEEDS (The Deep Sight) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-[#050505] border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-500" /> Data Stream (Live Feeds)
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feeds.map((feed, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0a] border border-white/10 hover:border-cyan-500/40 p-4 rounded-xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-300">
                        {feed.symbol.split('/')[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{feed.symbol}</div>
                        <div className="text-[9px] text-gray-500">Source: {feed.sources} Nodes</div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-0.5 rounded text-[9px] font-bold border 
                                    ${
                                      feed.status === 'STABLE'
                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        : feed.status === 'VOLATILE'
                                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                                    }
                                  `}
                    >
                      {feed.status}
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="text-2xl font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                        ${feed.price}
                      </div>
                      <div
                        className={`text-xs font-mono mt-1 flex items-center gap-1 ${feed.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {feed.change > 0 ? '+' : ''}
                        {feed.change}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-gray-500 uppercase font-bold">Confidence</div>
                      <div className="text-xs font-mono font-bold text-cyan-400">
                        {feed.confidence}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Latency & History Bar */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-[9px] text-gray-500 uppercase font-bold">
                  Heartbeat (Latency)
                </div>
                <div className="text-lg font-mono font-bold text-white">{latency}ms</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500 uppercase font-bold">
                  Historical Accuracy
                </div>
                <div className="text-lg font-mono font-bold text-white">99.99%</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500 uppercase font-bold">Total Requests</div>
                <div className="text-lg font-mono font-bold text-white">2.4M</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500 uppercase font-bold">Next Aggregation</div>
                <div className="text-lg font-mono font-bold text-cyan-400 animate-pulse">~2s</div>
              </div>
            </div>
          </div>

          {/* SIGNAL DECODER */}
          <div className="bg-[#050505] border border-cyan-500/20 rounded-2xl p-6 relative">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-500" /> Signal Decoder (Refinery)
            </h3>

            {/* Pipeline Viz */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10"></div>

              {['RAW_DATA', 'VALIDATION', 'CONSENSUS', 'ON_CHAIN'].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-[#050505] px-2">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center 
                                ${i < 3 ? 'border-cyan-500 bg-cyan-900/20 text-cyan-400' : 'border-white/20 bg-black text-gray-500'}
                              `}
                  >
                    {i === 0 && <Globe size={16} />}
                    {i === 1 && <ShieldAlert size={16} />}
                    {i === 2 && <Users size={16} />}
                    {i === 3 && <Database size={16} />}
                  </div>
                  <span className="text-[9px] font-bold text-gray-400">{step}</span>
                </div>
              ))}
            </div>

            {/* Logs Terminal */}
            <div
              className="mt-6 bg-black border border-white/10 rounded-lg p-4 font-mono text-[10px] text-green-500 h-32 overflow-y-auto"
              ref={logContainerRef}
            >
              {logs.map((log, i) => (
                <div key={i} className="opacity-80 hover:opacity-100">
                  {log}
                </div>
              ))}
              <div className="animate-pulse">_</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONSENSUS & CREW */}
        <div className="flex flex-col gap-6">
          {/* HOLOGRAPHIC CONSENSUS MAP */}
          <div className="bg-[#050505] border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center min-h-[300px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]"></div>

            <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 w-full text-left relative z-10 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Anomaly Detection (Radar)
            </h3>

            {/* Rotating Globe CSS Visualization */}
            <div className="relative w-48 h-48 my-auto">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 rounded-full border-x border-cyan-500/10 rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-y border-cyan-500/10 -rotate-45"></div>

              {/* Scanning Line */}
              <div className="absolute top-1/2 left-1/2 w-[140%] h-[2px] bg-cyan-500/50 -translate-x-1/2 -translate-y-1/2 animate-[spin_2s_linear_infinite] shadow-[0_0_10px_#06b6d4]"></div>

              {/* Nodes */}
              <div className="absolute top-10 left-12 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
              <div className="absolute bottom-12 right-10 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75 shadow-[0_0_5px_#22c55e]"></div>
              <div className="absolute top-1/2 left-4 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150 shadow-[0_0_5px_#22c55e]"></div>
            </div>

            <div className="w-full mt-4 bg-cyan-900/20 border border-cyan-500/30 p-2 rounded text-center">
              <div className="text-[10px] text-cyan-300">No Data Corruption Detected</div>
            </div>
          </div>

          {/* CREW PANEL */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Users className="w-4 h-4 text-cyan-500" /> Crew: Observers
            </h3>

            {/* Lead Profile */}
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="relative w-12 h-12">
                <div className="absolute -inset-1 rounded-full border border-cyan-500/50 border-t-cyan-300 animate-spin-slow"></div>
                <div className="rounded-full overflow-hidden w-full h-full border border-black">
                  <GenerativeAvatar
                    seed="Bellatrix"
                    className="w-full h-full"
                    rankColor="#06b6d4"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase font-display">
                  Cmdr. Bellatrix
                </div>
                <div className="text-[10px] text-gray-500 font-mono">Oracle Sight Observer</div>
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
                <span className="text-gray-400">Signal Listeners</span>
                <span className="text-cyan-400 font-bold">150 / 150 ACTIVE</span>
              </div>
              <div className="mt-2 p-2 bg-black border border-white/10 rounded text-[10px] text-gray-400 italic leading-tight">
                "Evrenin fısıltılarını kodlara döküyoruz. Veri temiz, rota net."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
