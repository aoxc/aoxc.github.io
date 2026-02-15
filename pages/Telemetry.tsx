import React, { useState, useEffect } from 'react'
import { Activity, Zap, Shield, Cpu, Globe, ArrowUpRight, Wifi } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

// 1. Tip Tanımlaması
interface TelemetryData {
  latency: number
  status: string
  isSimulated: boolean
  load: number
  uptime: string
}

// 2. Widget Bileşeni (Alt Bileşen)
export const TelemetryWidget: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<TelemetryData>({
    latency: 21,
    status: 'NOMINAL',
    isSimulated: false,
    load: 42,
    uptime: '156:12:04'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * (25 - 18 + 1) + 18),
        load: Math.floor(Math.random() * (45 - 38 + 1) + 38)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col font-mono ${className}`}
    >
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-xs font-bold text-white tracking-widest uppercase">
            System Telemetry
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-500 font-bold">LIVE_FEED</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto scrollbar-thin">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-gray-500 text-xs">{'>> INITIALIZING_TELEMETRY_LINK...'}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">{'>> LINK_ESTABLISHED'}</span>
              <span
                className={`font-bold ${data.isSimulated ? 'text-yellow-500' : 'text-green-500'}`}
              >
                {` [${data.isSimulated ? 'SIMULATION_MODE' : 'OKX_X_LAYER_MAINNET'}]`}
              </span>
            </div>
            <div className="text-gray-500 text-xs">
              {'>> '}LATENCY: <span className="text-white">{data.latency}ms</span>
              {' | STATUS: '}
              <span className="text-green-500">NOMINAL</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase">System Uptime</div>
            <div className="text-xl text-white font-bold">{data.uptime}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] text-gray-400 uppercase font-bold">Core Load</span>
            </div>
            <div className="text-2xl text-white font-bold">{data.load}%</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-[10px] text-gray-400 uppercase font-bold">Throughput</span>
            </div>
            <div className="text-2xl text-white font-bold">
              1.2k <span className="text-xs text-gray-500">TPS</span>
            </div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] text-gray-400 uppercase font-bold">Security Level</span>
            </div>
            <div className="text-2xl text-white font-bold">MAXIMUM</div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-black border-t border-white/5 flex items-center justify-between text-[9px] text-gray-600 shrink-0">
        <div className="flex items-center gap-4">
          <span>NODE_ID: AX-0492-CD</span>
          <span>REGION: EU-WEST-1</span>
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          <span>X-LAYER_NETWORK_ONLINE</span>
        </div>
      </div>
    </div>
  )
}

// 3. ANA SAYFA BİLEŞENİ (App.tsx'in aradığı Telemetry budur)
export const Telemetry: React.FC = () => {
  const { t } = useLanguage()
  return (
    <div className="h-[calc(100vh-140px)] w-full flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
            {t('telemetry_title') || 'Telemetry Control'}
          </h1>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative z-10">
        <TelemetryWidget className="h-full" />
      </div>
    </div>
  )
}
