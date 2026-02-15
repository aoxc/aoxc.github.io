import React, { useState, useEffect, useRef } from 'react'
import {
  ShieldAlert,
  Lock,
  Radar,
  AlertTriangle,
  Terminal,
  Fingerprint,
  UserCheck,
  FileKey,
  ShieldCheck,
  Ban,
  Activity,
  Zap,
  Users,
  CheckCircle2
} from 'lucide-react'
import { GenerativeAvatar } from '../components/GenerativeAvatar'

const THREAT_LOGS = [
  '>> SCANNING_MEMPOOL_0x8f... [SAFE]',
  '>> DETECTED_ANOMALY_BRIDGE_ADAPTER... [ANALYZING]',
  '>> SIGNATURE_VERIFICATION_FAILED_TX_0x33... [BLOCKED]',
  '>> REENTRANCY_ATTEMPT_POOL_B... [NEUTRALIZED]',
  '>> AUDIT_SYNC_CERTIK... [VERIFIED]',
  '>> SYSTEM_INTEGRITY_CHECK... [100%]'
]

export const Security: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(THREAT_LOGS)
  const logContainerRef = useRef<HTMLDivElement>(null)
  const [integrity, setIntegrity] = useState(100)

  // Simulate Threat Logs
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ['SCANNING', 'VERIFYING', 'BLOCKING', 'SYNCING']
      const targets = ['MEMPOOL', 'BRIDGE', 'VAULT', 'ORACLE']
      const action = actions[Math.floor(Math.random() * actions.length)]
      const target = targets[Math.floor(Math.random() * targets.length)]

      const newLog = `>> ${action}_${target}_0x${Math.floor(Math.random() * 999)}... [OK]`
      setLogs(prev => [...prev.slice(-8), newLog])
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="relative bg-[#050505] border border-red-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-red-500/20 border-t-red-500 animate-spin-slow"></div>
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  SHIELDS ACTIVE
                </span>
                <span className="text-[10px] text-gray-500 font-mono">#QSR-SEN-005</span>
              </div>
              <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                Quasar Sentry
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                CLASS: DEFENSE FRIGATE / SECURITY AUDITOR
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Total Protected
              </div>
              <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" /> $42.5M
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Blocked Threats
              </div>
              <div className="text-red-400 font-mono text-sm font-bold flex items-center gap-2">
                <Ban className="w-4 h-4" /> 12,840
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: THREAT RADAR & TERMINAL */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* RADAR VISUALIZATION */}
          <div className="bg-[#050505] border border-red-900/30 rounded-2xl p-1 relative shadow-[0_0_40px_rgba(220,38,38,0.1)] h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>

            {/* Radar Circles */}
            <div className="absolute w-[350px] h-[350px] rounded-full border border-red-900/20"></div>
            <div className="absolute w-[250px] h-[250px] rounded-full border border-red-900/20"></div>
            <div className="absolute w-[150px] h-[150px] rounded-full border border-red-900/20 bg-red-950/10"></div>

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-red-900/20"></div>
            <div className="absolute h-full w-[1px] bg-red-900/20"></div>

            {/* Scanning Sweep */}
            <div
              className="absolute w-[350px] h-[350px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(220,38,38,0.2)_30deg,transparent_30deg)] animate-spin-slow"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Random Blips (Threats) */}
            <div className="absolute top-10 left-20 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-70"></div>
            <div className="absolute bottom-20 right-32 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping delay-1000 opacity-50"></div>

            {/* Center Core */}
            <div className="absolute w-12 h-12 bg-red-900/20 rounded-full border border-red-500/50 flex items-center justify-center backdrop-blur-sm z-10">
              <Radar className="w-6 h-6 text-red-500 animate-pulse" />
            </div>

            <div className="absolute bottom-4 left-6">
              <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                Scanning Sector 7...
              </div>
            </div>
          </div>

          {/* TERMINAL */}
          <div
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 font-mono text-xs h-48 overflow-y-auto"
            ref={logContainerRef}
          >
            <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-white/5 pb-2">
              <Terminal className="w-3 h-3" />
              <span>LIVE DEFENSE LOGS</span>
            </div>
            {logs.map((log, i) => (
              <div key={i} className="text-red-400/80 mb-1">
                {log}
              </div>
            ))}
            <div className="animate-pulse text-red-500">_</div>
          </div>
        </div>

        {/* RIGHT: STATS, VAULT, CREW */}
        <div className="flex flex-col gap-6">
          {/* SHIELD INTEGRITY */}
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/30 transition-colors">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Shield Generator (Audit)
            </h3>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">Shield Integrity</span>
              <span className="text-green-400 font-mono font-bold">100%</span>
            </div>
            <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{ width: '100%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center bg-[#111] p-3 rounded-lg border border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase font-bold">Audit Partner</span>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500" /> CERTIK
                </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase font-bold">Last Scan</span>
                <span className="text-xs font-mono text-gray-300">2h ago</span>
              </div>
            </div>
          </div>

          {/* MULTISIG VAULT */}
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl"></div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileKey className="w-4 h-4 text-yellow-500" /> Multisig Vault Access
            </h3>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={`h-8 rounded border flex items-center justify-center
                            ${i <= 3 ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500' : 'bg-[#111] border-white/10 text-gray-600'}
                          `}
                >
                  <Fingerprint className="w-4 h-4" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>REQ: 3/5 SIGS</span>
              <span className="text-yellow-500 animate-pulse">BIOMETRIC LOCK: ACTIVE</span>
            </div>
          </div>

          {/* CREW */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Users className="w-4 h-4 text-red-500" /> Crew: Void Sentinels
            </h3>

            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="relative w-12 h-12">
                <div className="absolute -inset-1 rounded-full border border-red-500/50 border-t-red-300 animate-spin-slow"></div>
                <div className="rounded-full overflow-hidden w-full h-full border border-black">
                  <GenerativeAvatar seed="VegaLyra" className="w-full h-full" rankColor="#ef4444" />
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase font-display">
                  Capt. Vega Lyra
                </div>
                <div className="text-[10px] text-gray-500 font-mono">Void Shield Commander</div>
              </div>
            </div>

            <div className="mt-2 p-2 bg-black border border-white/10 rounded text-[10px] text-gray-400 italic leading-tight relative z-10">
              "Kalkanlar asla inmez. Hiçbir karanlık veri içeri sızamaz."
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
