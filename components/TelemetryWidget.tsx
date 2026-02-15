import React, { useEffect, useState, useRef } from 'react'
import {
  Activity,
  Server,
  ShieldAlert,
  FileText,
  RefreshCw,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  UserCheck,
  Cpu,
  Gauge,
  X,
  Code2,
  Terminal,
  Lock,
  Search,
  ArrowRight
} from 'lucide-react'
import { TelemetryLog, SystemMetric, RiskAlert, ModuleHealth } from '../types'
import { fetchTelemetry } from '../services/telemetryService'
import { useLanguage } from '../contexts/LanguageContext'

// --- SUB-COMPONENT: Heartbeat EKG ---
const HeartbeatMonitor = ({ data }: { data: number[] }) => {
  return (
    <div className="relative w-full h-24 bg-[#080808] border border-white/10 rounded-lg overflow-hidden flex items-center">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* The EKG Line */}
      <svg className="w-full h-full" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#8CD100"
          strokeWidth="2"
          points={data.map((val, i) => `${i * (100 / (data.length - 1))},${100 - val}`).join(' ')}
          className="drop-shadow-[0_0_5px_rgba(140,209,0,0.8)]"
        />
      </svg>

      {/* Scan Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-xlayer-green/10 to-transparent w-[20%] animate-[shimmer_2s_linear_infinite]"></div>

      <div className="absolute top-2 left-2 text-[9px] font-mono text-xlayer-green font-bold bg-black/50 px-1 rounded">
        LIVE TPS FEED
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: Gas Pressure Gauge ---
const GasPressureGauge = ({ pressure }: { pressure: number }) => {
  // Pressure 0-100.
  // Rotation mapping: 0 = -90deg, 100 = 90deg.
  const rotation = (pressure / 100) * 180 - 90

  // Color logic
  const color = pressure < 50 ? '#8CD100' : pressure < 80 ? '#fbbf24' : '#ef4444'

  return (
    <div className="relative w-24 h-16 flex items-end justify-center overflow-hidden">
      {/* Gauge Arch */}
      <div className="absolute bottom-0 w-20 h-10 border-[4px] border-t-white/10 border-r-white/10 border-l-white/10 border-b-transparent rounded-t-full"></div>

      {/* Needle */}
      <div
        className="absolute bottom-0 left-1/2 w-[2px] h-10 bg-white origin-bottom transition-all duration-500 ease-out"
        style={{
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          boxShadow: `0 0 10px ${color}`
        }}
      ></div>

      {/* Center Pin */}
      <div className="absolute bottom-0 w-2 h-2 bg-gray-500 rounded-full translate-y-1/2 z-10"></div>

      <div className="absolute bottom-12 text-[8px] font-mono text-gray-500 uppercase">
        Gas Pressure
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: Log Detail Slide-Out ---
const LogDetailPanel = ({ log, onClose }: { log: TelemetryLog; onClose: () => void }) => {
  if (!log) return null
  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-96 bg-[#0c0c0c] border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-xlayer-green" />
          <span className="font-mono text-xs font-bold text-white">TX_INSPECTOR</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-6">
        {/* Status Block */}
        <div className="p-3 bg-black border border-white/10 rounded flex justify-between items-center">
          <span className="text-gray-500">STATUS</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border 
                        ${log.status === 'Success' ? 'border-green-500/30 text-green-400 bg-green-900/20' : 'border-red-500/30 text-red-400 bg-red-900/20'}`}
          >
            {log.status.toUpperCase()}
          </span>
        </div>

        {/* Main Data */}
        <div className="space-y-2">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-1">
            Transaction Data
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <span className="text-gray-600">Hash:</span>
            <span className="text-cyan-400 break-all">{log.hash}</span>

            <span className="text-gray-600">From:</span>
            <span className="text-white break-all">{log.address}</span>

            <span className="text-gray-600">Module:</span>
            <span className="text-yellow-500">{log.targetModule}</span>

            <span className="text-gray-600">Time:</span>
            <span className="text-white">{log.timestamp}</span>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-2">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-1 flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Execution Trace
          </div>
          <div className="bg-[#050505] p-3 rounded border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Gas Used:</span>
              <span className="text-white">{log.technical?.gasUsed || '21000'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nonce:</span>
              <span className="text-white">{log.technical?.nonce || '0'}</span>
            </div>
          </div>
        </div>

        {/* Raw Input Data */}
        <div className="space-y-2">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-1">
            Input Data (Hex)
          </div>
          <div className="bg-black p-3 rounded border border-white/10 text-gray-400 break-all leading-relaxed max-h-32 overflow-y-auto">
            {log.technical?.inputData || '0x'}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
interface TelemetryWidgetProps {
  className?: string
}

export const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({ className = 'h-[600px]' }) => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'logs' | 'metrics' | 'system' | 'alerts'>('logs')
  const [selectedLog, setSelectedLog] = useState<TelemetryLog | null>(null)

  const [data, setData] = useState<{
    logs: TelemetryLog[]
    metrics: SystemMetric
    alerts: RiskAlert[]
    health: ModuleHealth[]
    isSimulated: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  // Live EKG Data State
  const [ekgData, setEkgData] = useState<number[]>(Array(20).fill(50))

  const loadData = async () => {
    if (!data) setLoading(true)
    const result = await fetchTelemetry()
    setData(result)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    // Fetch main data every 5s
    const interval = setInterval(() => {
      fetchTelemetry().then(setData)
    }, 5000)

    // Fast interval for EKG Animation
    const ekgInterval = setInterval(() => {
      setEkgData(prev => {
        const next = [...prev.slice(1), Math.random() * 60 + 20]
        return next
      })
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(ekgInterval)
    }
  }, [])

  if (!data && loading) {
    return (
      <div
        className={`w-full ${className} bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="w-8 h-8 text-xlayer-green animate-spin" />
          <span className="text-xs font-mono text-gray-400">INITIALIZING UPLINK...</span>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div
      className={`w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group shadow-2xl transition-all hover:border-white/20 ${className}`}
    >
      {/* 1. TERMINAL HEADER (The Black Box Look) */}
      <div className="bg-[#020202] p-4 border-b border-white/10 font-mono text-xs">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-gray-500">{'>>> INITIALIZING_TELEMETRY_LINK...'}</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{'>>> LINK_ESTABLISHED'}</span>
              <span
                className={`font-bold ${data.isSimulated ? 'text-yellow-500' : 'text-xlayer-green'}`}
              >
                [{data.isSimulated ? 'SIMULATION_MODE' : 'OKX_X_LAYER_MAINNET'}]
              </span>
            </div>
            <div className="text-gray-500">
              {'>> LATENCY:'} <span className="text-white">21ms</span> | STATUS:{' '}
              <span className="text-xlayer-green">NOMINAL</span>
            </div>
          </div>

          {/* Top Right Status Box */}
          <div className="border border-white/10 p-2 rounded bg-[#0a0a0a] flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase">SYS INTEGRITY</span>
              <span className="text-xlayer-green font-bold">100%</span>
            </div>
            <Lock className="w-4 h-4 text-xlayer-green" />
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex border-b border-white/5 bg-[#080808] shrink-0 overflow-x-auto scrollbar-none">
        {[
          { id: 'logs', label: 'LOG ANALYZER', icon: Search },
          { id: 'metrics', label: 'LIVE METRICS', icon: Zap },
          { id: 'system', label: 'SUB-SYSTEMS', icon: Server },
          { id: 'alerts', label: 'RISK & SECURITY', icon: ShieldAlert }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[120px] py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border-b-2 
                    ${
                      activeTab === tab.id
                        ? data.isSimulated
                          ? 'border-yellow-500 text-white bg-white/5'
                          : 'border-xlayer-green text-white bg-white/5'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative bg-[#050505] flex">
        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin relative">
          {/* TAB: LOG ANALYZER */}
          {activeTab === 'logs' && (
            <div className="w-full">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#0e0e0e] text-[9px] text-gray-500 font-mono uppercase sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Hash (Click to Inspect)</th>
                    <th className="px-4 py-3">Target Module</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-mono">
                  {data.logs.map(log => (
                    <tr
                      key={log.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-4 py-3 text-gray-400">{log.timestamp}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-1.5 py-0.5 rounded border text-[9px] font-bold 
                                            ${
                                              log.type === 'VOTE'
                                                ? 'border-purple-500/30 text-purple-400'
                                                : log.type === 'TX'
                                                  ? 'border-blue-500/30 text-blue-400'
                                                  : 'border-gray-500/30 text-gray-400'
                                            }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-white hover:text-xlayer-green hover:underline decoration-dashed underline-offset-4 transition-all flex items-center gap-1"
                        >
                          <Terminal className="w-3 h-3 opacity-50" />
                          {log.hash}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{log.targetModule}</td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`text-[9px] font-bold ${log.status === 'Success' ? 'text-green-500' : 'text-yellow-500'}`}
                        >
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: METRICS (Heartbeat & Gauges) */}
          {activeTab === 'metrics' && (
            <div className="p-6 space-y-8">
              {/* Top Row: Heartbeat & Gas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heartbeat Card */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Activity className="w-4 h-4 text-xlayer-green" /> Network Heartbeat (TPS)
                    </h4>
                    <span className="text-xl font-mono text-white font-bold">
                      {data.metrics.tps}
                    </span>
                  </div>
                  <HeartbeatMonitor data={ekgData} />
                </div>

                {/* Gas Card */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-yellow-500" /> Gas Pressure
                    </h4>
                    <span className="text-xl font-mono text-white font-bold">
                      {data.metrics.gasPressure}{' '}
                      <span className="text-[10px] text-gray-500">GWEI</span>
                    </span>
                  </div>
                  <GasPressureGauge pressure={data.metrics.gasPressure} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#111] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 uppercase">Avg Block Time</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {data.metrics.avgBlockTime}
                  </div>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 uppercase">Success Rate</div>
                  <div className="text-lg font-bold text-green-400 mt-1">
                    {data.metrics.successRate}%
                  </div>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 uppercase">Active Peers</div>
                  <div className="text-lg font-bold text-blue-400 mt-1">
                    {data.metrics.activeNodes}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SYSTEM LOADS */}
          {activeTab === 'system' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.health.map(mod => (
                  <div
                    key={mod.moduleId}
                    className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm text-white">{mod.name}</h4>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border ${mod.status === 'HIGH_LOAD' ? 'text-yellow-500 border-yellow-500/30 bg-yellow-900/10' : 'text-green-500 border-green-500/30 bg-green-900/10'}`}
                      >
                        {mod.status}
                      </span>
                    </div>

                    {/* Load Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-gray-500">
                        <span>Load</span>
                        <span>{mod.loadPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${mod.loadPercent > 80 ? 'bg-red-500' : mod.loadPercent > 50 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                          style={{ width: `${mod.loadPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 text-[10px] font-mono text-gray-400">
                      <span>Lat: {mod.latency}ms</span>
                      <span>Uptime: {mod.uptime}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: RISK & SECURITY */}
          {activeTab === 'alerts' && (
            <div className="p-6 space-y-4">
              {/* Critical Status Bar */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-[10px] text-red-400 font-bold uppercase">
                        Fail-Safe Protocol
                      </div>
                      <div className="text-xs text-red-200">Emergency Shutdown</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 font-mono bg-black/40 px-2 py-1 rounded">
                    INACTIVE
                  </span>
                </div>

                <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-[10px] text-blue-400 font-bold uppercase">
                        Mempool Monitor
                      </div>
                      <div className="text-xs text-blue-200">Scanning Pending TXs</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-400 font-mono bg-black/40 px-2 py-1 rounded animate-pulse">
                    SCANNING
                  </span>
                </div>
              </div>

              {/* Alert List */}
              {data.alerts.map(alert => (
                <div key={alert.id} className="bg-[#111] border-l-2 border-red-500 p-4 flex gap-4">
                  <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{alert.message}</h4>
                    <div className="flex gap-3 text-[10px] text-gray-500 font-mono">
                      <span>Source: {alert.source}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                      <span>•</span>
                      <span className="text-red-400 font-bold">{alert.severity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. SLIDE-OUT PANEL (Conditional Render) */}
        {selectedLog && <LogDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />}
      </div>
    </div>
  )
}
