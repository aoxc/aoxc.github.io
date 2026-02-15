import React, { useEffect, useState } from 'react'
import {
  UserCircle,
  Shield,
  Award,
  Activity,
  Hash,
  Share2,
  Copy,
  CreditCard,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Cpu,
  Box,
  ShoppingBag
} from 'lucide-react'
import { MeritBadge, BadgeVariant } from '../components/MeritBadge'
import { GenerativeAvatar } from '../components/GenerativeAvatar'
import { useLanguage } from '../contexts/LanguageContext'
import { useSimulation } from '../contexts/SimulationContext'
import { db, InventoryItem } from '../services/databaseService'

export const Profile: React.FC = () => {
  const { t } = useLanguage()
  const { balances, transactions, blockNumber } = useSimulation() // Use live simulation data
  const [activeTab, setActiveTab] = useState<'inventory' | 'logs' | 'permissions'>('inventory')
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  // Load Inventory from DB
  useEffect(() => {
    db.getInventory().then(setInventory)
  }, [balances]) // Reload if balances change (usually implies a purchase)

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* --- 1. ID CARD HEADER --- */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#080808] p-1 group">
        {/* Holographic Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <div className="relative bg-[#0b0c15] rounded-[20px] p-6 md:p-8 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* AVATAR SECTION */}
            <div className="flex-shrink-0 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl p-1 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 relative shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <div className="w-full h-full rounded-xl overflow-hidden bg-black relative group/avatar">
                  <GenerativeAvatar
                    seed="UserWallet"
                    className="w-full h-full"
                    rankColor="#22d3ee"
                  />
                  {/* Scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[20%] w-full animate-[scan-vertical_2s_linear_infinite] opacity-50 pointer-events-none"></div>
                </div>

                {/* Rank Insignia */}
                <div className="absolute -bottom-4 -right-4 bg-[#0b0c15] rounded-full p-1 border border-cyan-500/30 shadow-xl">
                  <MeritBadge tier="ADMIRAL" variant="ANDROMEDA" className="w-12 h-12" />
                </div>
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="flex-1 text-center md:text-left space-y-4 w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-wide uppercase">
                    Fleet Commander
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <span className="px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                      Level {Math.floor(balances.AQLXP / 100) + 1}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Active Duty
                    </span>
                  </div>
                </div>

                {/* QR / ID Code */}
                <div className="text-right hidden md:block">
                  <div className="text-[10px] text-gray-500 font-mono mb-1">PERSONNEL ID</div>
                  <div className="font-mono text-xl text-white tracking-widest">X-99-ALPHA</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-cyan-500/30 transition-colors">
                  <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-2">
                    <Hash className="w-3 h-3 text-cyan-500" /> Wallet Identity
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <code className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
                      0xUser...Wallet
                    </code>
                    <button className="text-gray-500 hover:text-white">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-yellow-500/30 transition-colors">
                  <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-2">
                    <Award className="w-3 h-3 text-yellow-500" /> Merit XP
                  </div>
                  <div className="text-xl font-mono font-bold text-white">
                    {balances.AQLXP?.toFixed(0) || 0}{' '}
                    <span className="text-[10px] text-gray-500">XP</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-green-500/30 transition-colors">
                  <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-green-500" /> Liquid Balance
                  </div>
                  <div className="text-xl font-mono font-bold text-white">
                    {balances.AOXC?.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN DASHBOARD AREA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* LEFT: STATUS */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0b0c15] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                Security Clearance
              </h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Authority Level</span>
                <span className="text-purple-400 font-bold font-mono text-lg">
                  LEVEL {Math.min(5, Math.floor(transactions.length / 5))}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  style={{ width: `${Math.min(100, transactions.length * 5)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-green-500/10 border border-green-500/20 rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-[10px] font-bold text-green-400">KYC VERIFIED</span>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                  <span className="text-[10px] font-bold text-cyan-400">VOTING ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER & RIGHT: TABS CONTENT */}
        <div className="lg:col-span-2 bg-[#0b0c15] border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-[500px]">
          {/* Tabs Header */}
          <div className="flex border-b border-white/5 bg-black/20">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center justify-center gap-2
                            ${activeTab === 'inventory' ? 'border-cyan-500 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}
                        `}
            >
              <ShoppingBag className="w-4 h-4" /> Inventory ({inventory.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center justify-center gap-2
                            ${activeTab === 'logs' ? 'border-cyan-500 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}
                        `}
            >
              <FileText className="w-4 h-4" /> Flight Logs ({transactions.length})
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {inventory.length === 0 ? (
                  <div className="text-center py-12">
                    <Box className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Inventory is empty.</p>
                    <p className="text-gray-600 text-xs mt-1">
                      Visit the Market to acquire assets.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {inventory.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#151515] border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-2 rounded-lg bg-black/50 text-cyan-400 group-hover:text-white">
                            <Box className="w-6 h-6" />
                          </div>
                          <span className="text-[9px] text-gray-500 font-mono">{item.type}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{item.name}</h4>
                        <div className="text-[9px] text-gray-500 font-mono">{item.acquiredAt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FLIGHT LOGS TAB (REAL DB DATA) */}
            {activeTab === 'logs' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-black/30 rounded-xl overflow-hidden border border-white/5">
                  {transactions.map((tx, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded bg-white/5 text-gray-400 group-hover:text-cyan-400 transition-colors">
                        {tx.type === 'VOTE' && <Fingerprint className="w-4 h-4" />}
                        {tx.type === 'SWAP' && <Cpu className="w-4 h-4" />}
                        {tx.type === 'BRIDGE' && <Share2 className="w-4 h-4" />}
                        {tx.type === 'MINT' && <Award className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-white">{tx.type}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${tx.status === 'CONFIRMED' ? 'text-green-400 border-green-500/20 bg-green-900/10' : 'text-red-400 border-red-500/20 bg-red-900/10'}`}
                          >
                            {tx.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono truncate">
                          {tx.details}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" /> {tx.timestamp}
                        </div>
                        <div className="text-[9px] text-gray-600 font-mono">Block #{tx.block}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
