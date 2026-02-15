import React, { useState, useEffect, useRef } from 'react'
import {
  Brain,
  MessageCircle,
  TrendingUp,
  Users,
  Search,
  Radio,
  Zap,
  Eye,
  Target,
  Database,
  Terminal,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { GenerativeAvatar } from '../components/GenerativeAvatar'

const AI_LOGS = [
  '>> INITIALIZING_NEURAL_CORE_V4.2...',
  '>> CONNECTING_TO_X_LAYER_DATA_STREAM...',
  '>> SCANNING_SOCIAL_SENTIMENT_VECTORS...',
  ">> DETECTED_KEYWORD_SPIKE: 'L2_SEASON'...",
  '>> ANALYZING_COMPETITOR_LIQUIDITY_MIGRATION...',
  '>> PREDICTION_MODEL_CONFIDENCE: 72%...'
]

export const Sentinel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(AI_LOGS)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Simulate AI Thinking
  useEffect(() => {
    const interval = setInterval(() => {
      const thoughts = [
        'DETECTING_WHALE_ACCUMULATION...',
        'SENTIMENT_SHIFT_POSITIVE [BULLISH]',
        'MONITORING_DISCORD_ACTIVITY...',
        'ALPHA_SIGNAL_DETECTED_SECTOR_7...',
        'ANALYZING_TOKEN_VELOCITY...',
        'CROSS_REFERENCING_ON_CHAIN_DATA...'
      ]
      const newLog = `>> ${thoughts[Math.floor(Math.random() * thoughts.length)]}`
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
      {/* HEADER */}
      <div className="relative bg-[#050505] border border-fuchsia-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-fuchsia-950/30 border border-fuchsia-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-fuchsia-500/20 border-t-fuchsia-500 animate-spin-slow"></div>
              <Brain className="w-8 h-8 text-fuchsia-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  INTELLIGENCE ONLINE
                </span>
                <span className="text-[10px] text-gray-500 font-mono">#SMB-SNT-006</span>
              </div>
              <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                Sombrero Sentinel
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                CLASS: STEALTH FRIGATE / INTELLIGENCE ANALYST
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Social Sentiment
              </div>
              <div className="text-fuchsia-400 font-mono text-sm font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> 92% BULLISH
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Trend Velocity
              </div>
              <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> ULTRA-FAST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: SENTIMENT RADAR */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#050505] border border-fuchsia-500/20 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Radio className="w-4 h-4 text-fuchsia-500" /> Galactic Sentiment Radar
            </h3>

            {/* RADAR VISUAL */}
            <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.1)_0%,transparent_70%)]"></div>

              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-fuchsia-500/20"></div>
              <div className="absolute inset-10 rounded-full border border-fuchsia-500/20"></div>
              <div className="absolute inset-20 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5"></div>

              {/* Scanning Line */}
              <div className="absolute w-1/2 h-[2px] bg-fuchsia-500/50 top-1/2 left-1/2 origin-left animate-[spin_4s_linear_infinite]"></div>

              {/* Data Points */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-4 w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>

            {/* METRICS */}
            <div className="space-y-4 mt-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" /> X / Twitter Vol
                </span>
                <span className="text-white font-mono font-bold">12.4K</span>
              </div>
              <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[70%]"></div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Discord Hype
                </span>
                <span className="text-white font-mono font-bold">4,200</span>
              </div>
              <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[55%]"></div>
              </div>

              <div className="p-3 bg-fuchsia-900/10 border border-fuchsia-500/20 rounded-lg flex justify-between items-center">
                <span className="text-[10px] text-fuchsia-300 font-bold uppercase">
                  Fear & Greed
                </span>
                <span className="text-sm font-bold text-white">76 (GREED)</span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: AI TERMINAL */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* TERMINAL UI */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-fuchsia-500" />
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                    AI Prediction Core
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">MODEL: G-THINK v4.2</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-green-500">LEARNING ACTIVE</span>
              </div>
            </div>

            {/* Logs Output */}
            <div
              className="flex-1 font-mono text-xs space-y-2 overflow-y-auto pr-2"
              ref={logContainerRef}
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  className="text-fuchsia-400/80 hover:text-fuchsia-300 transition-colors border-l-2 border-transparent hover:border-fuchsia-500 pl-2"
                >
                  {log}
                </div>
              ))}
              <div className="animate-pulse text-fuchsia-500">_</div>
            </div>

            {/* Input Simulation */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
              <span className="text-fuchsia-500 font-bold text-xs">{'>'}</span>
              <div className="h-4 w-2 bg-fuchsia-500/50 animate-pulse"></div>
              <span className="text-xs text-gray-600 italic">Analyst Access Only...</span>
            </div>
          </div>

          {/* STATS & CREW ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Stats */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-5">
              <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
                <Database className="w-3 h-3" /> Neural Network Status
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                  <span className="text-gray-400">Data Processed</span>
                  <span className="text-white font-mono">1.2 PB</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Alpha Signals</span>
                  <span className="text-fuchsia-400 font-bold">3 NEW</span>
                </div>
              </div>
            </div>

            {/* Crew Profile */}
            <div className="bg-[#050505] border border-fuchsia-500/20 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-[10px] text-fuchsia-500 uppercase font-bold mb-3 flex items-center gap-2 relative z-10">
                <Users className="w-3 h-3" /> Intelligence Officer
              </h4>

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-10 h-10">
                  <div className="rounded-full overflow-hidden w-full h-full border border-fuchsia-500/50">
                    <GenerativeAvatar seed="Mira" className="w-full h-full" rankColor="#d946ef" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase font-display">
                    Major Mira
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">Deep Space Strategist</div>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-400 italic relative z-10">
                "Biz fısıltıları duyarız, topluluk ne düşünüyorsa Sombrero onu bilir."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
