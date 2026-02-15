import React, { useState, useEffect } from 'react'
import {
  Crown,
  Shield,
  Activity,
  Layers,
  FileText,
  AlertOctagon,
  Wallet,
  Vote,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Users
} from 'lucide-react'
import { AOXCLogo } from '../components/AOXCLogo'
import { MeritBadge, BadgeVariant } from '../components/MeritBadge'
import { GenerativeAvatar } from '../components/GenerativeAvatar'
import { RankTier, Proposal } from '../types'
import { useSimulation } from '../contexts/SimulationContext'
import { db, CouncilMember } from '../services/databaseService'

export const Governance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'council' | 'proposals'>('council')
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([])
  const [votingOn, setVotingOn] = useState<number | null>(null)
  const { balances, executeTransaction, processShipRevenue } = useSimulation()

  useEffect(() => {
    // Load data from DB
    const loadData = async () => {
      setProposals(await db.getProposals())
      setCouncilMembers(await db.getCouncilMembers())
    }
    loadData()

    // Live refresh for votes
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleVote = async (id: number, type: 'for' | 'against') => {
    setVotingOn(id)
    try {
      const voteCost = 0.5 // AOXC cost per vote

      // 1. EXECUTE CHAIN TX (Deduct Gas/Voting Fee)
      await executeTransaction('VOTE', `Proposal #${id} Vote: ${type.toUpperCase()}`, {
        token: 'AOXC',
        amount: voteCost
      })

      // 2. UPDATE DB (Votes)
      await db.voteOnProposal(id, type)

      // 3. SEND REVENUE TO ANDROMEDA (Core Treasury)
      await processShipRevenue('andromeda', voteCost)

      const updated = await db.getProposals()
      setProposals(updated)
      alert(`Vote Confirmed.\n-${voteCost} AOXC Gas fee sent to Andromeda Treasury.`)
    } catch (e: any) {
      alert(`Voting Failed: ${e.message}`)
    } finally {
      setVotingOn(null)
    }
  }

  // ... (Rest of the UI render remains identical to original file, just ensure handleVote is wired) ...
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">
      {/* HEADER: Flagship Identity */}
      <div className="relative bg-[#080808] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shrink-0 group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:bg-rose-900/20 transition-colors duration-1000"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Rotating Core Visual */}
            <div className="relative w-24 h-24 hidden md:flex items-center justify-center">
              <div className="absolute inset-0 border border-rose-500/30 rounded-full animate-spin-slow border-t-rose-400"></div>
              <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-reverse-spin border-b-cyan-400"></div>
              <AOXCLogo collapsed className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-widest rounded animate-pulse">
                  SUPREME COMMAND
                </span>
                <span className="text-[10px] text-gray-500 font-mono">REGISTRY: #ADR-001-X</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase drop-shadow-lg">
                AOXC ANDROMEDA
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  NEURAL CORE ONLINE
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  ACTIVE NODES: {councilMembers.length}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Status Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Your Voting Power
              </div>
              <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                <Crown className="w-3 h-3 text-rose-500" />
                {balances.AOXC ? balances.AOXC.toLocaleString() : 0} VP
              </div>
            </div>
            <div className="bg-[#111] p-3 rounded-lg border border-white/5 min-w-[140px]">
              <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                Council Quorum
              </div>
              <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                <Users className="w-3 h-3 text-cyan-500" />
                72% REACHED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none shrink-0 bg-[#050505] rounded-t-xl">
        {[
          { id: 'council', label: 'THE HIGH COUNCIL', icon: Crown },
          { id: 'proposals', label: 'ACTIVE PROPOSALS', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'border-rose-500 text-white bg-white/5'
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }
                `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0 pr-2">
        {/* TAB: HIGH COUNCIL */}
        {activeTab === 'council' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 pb-10">
            <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 mb-6">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                  Konsey Oturumu Açık
                </div>
                <div className="text-[10px] text-rose-200/60">
                  Yönetim Modülü: v4.2 • Bu üyeler DAO hazinesinin %65'ini kontrol etmektedir.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {councilMembers.map(member => (
                <div
                  key={member.id}
                  className={`group relative bg-[#0a0a0a] border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${member.rank === 'ADMIRAL' ? 'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-white/10'}`}
                >
                  <div
                    className={`h-10 flex items-center justify-between px-4 bg-gradient-to-r from-transparent via-white/5 to-transparent border-b border-white/5`}
                  >
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${member.rank === 'ADMIRAL' ? 'text-rose-400' : 'text-gray-400'}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${member.rank === 'ADMIRAL' ? 'bg-rose-500' : 'bg-gray-500'} animate-pulse`}
                      ></div>
                      {member.rank}
                    </span>
                    {member.rank === 'ADMIRAL' && <Crown className="w-3.5 h-3.5 text-rose-500" />}
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      <div
                        className={`absolute inset-0 rounded-full border-2 border-${member.rank === 'ADMIRAL' ? 'rose' : 'gray'}-500/20 border-t-${member.rank === 'ADMIRAL' ? 'rose' : 'gray'}-500 animate-spin-slow`}
                      ></div>
                      <div className="absolute inset-1.5 rounded-full overflow-hidden border border-white/10 bg-black">
                        <GenerativeAvatar
                          seed={member.name}
                          className="w-full h-full"
                          rankColor={member.avatarColor}
                        />
                      </div>
                      {member.rank === 'ADMIRAL' && (
                        <div className="absolute -bottom-2 -right-2 transform scale-75 filter drop-shadow-xl group-hover:scale-90 transition-transform">
                          <MeritBadge tier="ADMIRAL" variant="ANDROMEDA" showGlow={false} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white uppercase mb-1 text-center">
                      {member.name}
                    </h3>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                      {member.role}
                    </div>

                    <div className="w-full bg-[#111] rounded p-2 flex justify-between items-center text-[10px]">
                      <span className="text-gray-500">Voting Power</span>
                      <span className="font-mono text-white font-bold">
                        {(member.balance / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROPOSALS (Real DB Data) */}
        {activeTab === 'proposals' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500 pb-10">
            {proposals.map(prop => {
              const totalVotes = prop.forVotes + prop.againstVotes
              const forPercent = totalVotes > 0 ? (prop.forVotes / totalVotes) * 100 : 0
              const isProcessing = votingOn === prop.id

              return (
                <div
                  key={prop.id}
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/10">
                          #{prop.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border 
                                              ${
                                                prop.status === 'Active'
                                                  ? 'text-green-400 border-green-500/30 bg-green-900/10'
                                                  : prop.status === 'Executed'
                                                    ? 'text-blue-400 border-blue-500/30 bg-blue-900/10'
                                                    : 'text-red-400 border-red-500/30 bg-red-900/10'
                                              }
                                          `}
                        >
                          {prop.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                        {prop.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-2xl">{prop.description}</p>
                    </div>
                    <div className="text-right text-[10px] text-gray-500 font-mono">
                      <div className="flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {prop.endTime}
                      </div>
                      <div>Proposer: {prop.proposer}</div>
                    </div>
                  </div>

                  {/* Voting Bars */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span className="text-green-500">For ({prop.forVotes.toLocaleString()})</span>
                      <span className="text-red-500">
                        Against ({prop.againstVotes.toLocaleString()})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-green-500 transition-all duration-1000"
                        style={{ width: `${forPercent}%` }}
                      ></div>
                      <div className="h-full bg-red-500 transition-all duration-1000 flex-1"></div>
                    </div>
                  </div>

                  {/* Actions */}
                  {prop.status === 'Active' && (
                    <div className="flex gap-3 border-t border-white/5 pt-4">
                      <button
                        onClick={() => handleVote(prop.id, 'for')}
                        disabled={isProcessing}
                        className="flex-1 py-2 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        Vote For
                      </button>
                      <button
                        onClick={() => handleVote(prop.id, 'against')}
                        disabled={isProcessing}
                        className="flex-1 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Vote Against
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
