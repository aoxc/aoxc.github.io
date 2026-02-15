import React, { useState, useEffect } from 'react'
import { MeritBadge, BadgeVariant } from './MeritBadge'
import { GenerativeAvatar } from './GenerativeAvatar'
import { RankTier, ElectionState } from '../types'
import {
  Crown,
  BarChart3,
  Activity,
  Wifi,
  AlertTriangle,
  Vote,
  Loader2,
  ServerOff,
  ShoppingBag
} from 'lucide-react'
import { useSimulation } from '../contexts/SimulationContext'

interface Candidate {
  id: number
  name: string
  wallet: string
  role: string
  rank: RankTier
  shipId: string
  badgeId: BadgeVariant
  votes: number
  voteTarget: number
  electionState: ElectionState
  marketPerk: string
}

// INITIAL CANDIDATE ROSTER
const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: 'Adm. Andromeda',
    wallet: '0xAD...7701',
    role: 'High Council',
    rank: 'CANDIDATE',
    shipId: 'andromeda',
    badgeId: 'ANDROMEDA',
    votes: 2,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '⚖️ Governance NFTs -5% Tax'
  },
  {
    id: 2,
    name: 'Capt. Antares',
    wallet: '0xAN...8812',
    role: 'Liquidity Chief',
    rank: 'CANDIDATE',
    shipId: 'aquila',
    badgeId: 'ANTARES',
    votes: 4,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '💧 LP Tokens +10% Yield'
  },
  {
    id: 3,
    name: 'Cmdr. Bellatrix',
    wallet: '0xBE...3399',
    role: 'Oracle Ops',
    rank: 'CANDIDATE',
    shipId: 'pegasus',
    badgeId: 'BELLATRIX',
    votes: 1,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '🔮 Data Feeds 0 Cost'
  },
  {
    id: 4,
    name: 'Capt. Vega Lyra',
    wallet: '0xVE...5544',
    role: 'Security Chief',
    rank: 'CANDIDATE',
    shipId: 'quasar',
    badgeId: 'VEGA',
    votes: 0,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '🛡️ Shield Battery -20% Price'
  },
  {
    id: 5,
    name: 'Cmdr. Arcturus',
    wallet: '0xAR...1122',
    role: 'Bridge Cmdr',
    rank: 'CANDIDATE',
    shipId: 'centaurus',
    badgeId: 'ARCTURUS',
    votes: 3,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '🌉 Warp Oil Stock Refill'
  },
  {
    id: 6,
    name: 'Capt. Cassiopeia',
    wallet: '0xCA...9988',
    role: 'Fabricator',
    rank: 'CANDIDATE',
    shipId: 'virgo',
    badgeId: 'CASSIOPEIA',
    votes: 0,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '⚒️ Crafting Time -30%'
  },
  {
    id: 7,
    name: 'Eng. Rigel',
    wallet: '0xRI...0011',
    role: 'Chief Eng',
    rank: 'CANDIDATE',
    shipId: 'sombrero',
    badgeId: 'RIGEL',
    votes: 5,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '🕵️ Intel Reports Unlocked'
  },
  {
    id: 8,
    name: 'Capt. Polaris',
    wallet: '0xPO...4477',
    role: 'Tactical Lead',
    rank: 'CANDIDATE',
    shipId: 'andromeda',
    badgeId: 'POLARIS',
    votes: 8,
    voteTarget: 10,
    electionState: 'NOMINATED',
    marketPerk: '🎖️ Rank Badges Available'
  }
]

const StatusPanel = ({ state }: { state: ElectionState }) => {
  const isLive = state === 'NOMINATED' || state === 'ELECTED'
  const isTx = state === 'VOTING'
  const isErr = state === 'ERROR' || state === 'DISQUALIFIED' || state === 'CONNECTING'

  return (
    <div className="flex items-center gap-1 w-full mt-3 pt-2 border-t border-white/5 bg-[#080808]/50 rounded-b-xl px-1">
      <div
        className={`flex-1 flex flex-col items-center justify-center p-1 rounded border transition-all duration-300 ${isLive ? 'bg-green-900/20 border-green-500/50 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-[#111] border-white/5 text-gray-700 opacity-30 grayscale'}`}
      >
        <Wifi className="w-2.5 h-2.5 mb-0.5" />
        <span className="text-[6px] font-bold tracking-widest uppercase font-mono">LIVE</span>
      </div>
      <div
        className={`flex-1 flex flex-col items-center justify-center p-1 rounded border transition-all duration-300 ${isTx ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse' : 'bg-[#111] border-white/5 text-gray-700 opacity-30 grayscale'}`}
      >
        <Activity className="w-2.5 h-2.5 mb-0.5" />
        <span className="text-[6px] font-bold tracking-widest uppercase font-mono">TX</span>
      </div>
      <div
        className={`flex-1 flex flex-col items-center justify-center p-1 rounded border transition-all duration-300 ${isErr ? 'bg-red-900/20 border-red-500/50 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'bg-[#111] border-white/5 text-gray-700 opacity-30 grayscale'}`}
      >
        <AlertTriangle className="w-2.5 h-2.5 mb-0.5" />
        <span className="text-[6px] font-bold tracking-widest uppercase font-mono">ERR</span>
      </div>
    </div>
  )
}

const getShipTheme = (shipId: string) => {
  switch (shipId) {
    case 'andromeda':
      return {
        color: 'rose',
        hex: '#f43f5e',
        tailwind: 'text-rose-400 border-rose-500 bg-rose-500'
      }
    case 'aquila':
      return {
        color: 'emerald',
        hex: '#10b981',
        tailwind: 'text-emerald-400 border-emerald-500 bg-emerald-500'
      }
    case 'pegasus':
      return {
        color: 'amber',
        hex: '#f59e0b',
        tailwind: 'text-amber-400 border-amber-500 bg-amber-500'
      }
    case 'quasar':
      return {
        color: 'cyan',
        hex: '#06b6d4',
        tailwind: 'text-cyan-400 border-cyan-500 bg-cyan-500'
      }
    case 'centaurus':
      return {
        color: 'violet',
        hex: '#8b5cf6',
        tailwind: 'text-violet-400 border-violet-500 bg-violet-500'
      }
    case 'virgo':
      return {
        color: 'fuchsia',
        hex: '#d946ef',
        tailwind: 'text-fuchsia-400 border-fuchsia-500 bg-fuchsia-500'
      }
    case 'sombrero':
      return {
        color: 'orange',
        hex: '#f97316',
        tailwind: 'text-orange-400 border-orange-500 bg-orange-500'
      }
    default:
      return {
        color: 'gray',
        hex: '#9ca3af',
        tailwind: 'text-gray-400 border-gray-500 bg-gray-500'
      }
  }
}

export const FleetCommandWidget: React.FC = () => {
  const { executeTransaction } = useSimulation()
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [globalLoading, setGlobalLoading] = useState(false)

  const castVote = async (id: number) => {
    const candidate = candidates.find(c => c.id === id)
    if (!candidate) return

    // 1. Set Local State to Voting
    setCandidates(prev => prev.map(c => (c.id === id ? { ...c, electionState: 'VOTING' } : c)))

    try {
      // 2. Execute Real Transaction
      await executeTransaction(
        'VOTE',
        `Elected: ${candidate.name} (ID: ${id})`,
        { token: 'OKB', amount: 0.0005 } // Minimal gas cost
      )

      // 3. Update UI on Success
      setCandidates(prev =>
        prev.map(c => {
          if (c.id === id) {
            const newVotes = c.votes + 1
            return {
              ...c,
              votes: newVotes,
              electionState: newVotes >= c.voteTarget ? 'ELECTED' : 'NOMINATED'
            }
          }
          return c
        })
      )
    } catch (e) {
      // Handle Error
      alert('Transaction Failed: Insufficient Gas or Network Error')
      setCandidates(prev => prev.map(c => (c.id === id ? { ...c, electionState: 'ERROR' } : c)))
      // Reset error after 2s
      setTimeout(() => {
        setCandidates(prev =>
          prev.map(c => (c.id === id ? { ...c, electionState: 'NOMINATED' } : c))
        )
      }, 2000)
    }
  }

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col gap-6">
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-xl font-display font-black text-white flex items-center gap-3 tracking-wide">
            <div className="p-2 bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/30 rounded-lg">
              <Crown className="text-cyan-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-700">
              DAO SEÇİM DÖNGÜSÜ: GENESIS
            </span>
          </h3>
          <p className="text-[10px] text-cyan-500/70 font-mono mt-1 ml-1 flex items-center gap-2">
            {globalLoading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>ZİNCİR TARANIYOR (X LAYER NODE)...</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span>OYLAMA PROTOKOLÜ AKTİF • ZİNCİR BAĞLANTISI KURULDU</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {candidates.map(cmdr => {
          const isConnecting = cmdr.electionState === 'CONNECTING'
          const isError = cmdr.electionState === 'ERROR'
          const isElected = cmdr.electionState === 'ELECTED'
          const progress = (cmdr.votes / cmdr.voteTarget) * 100
          const theme = getShipTheme(cmdr.shipId)

          return (
            <div
              key={cmdr.id}
              className={`group relative bg-[#0a0a0a] border rounded-xl p-3 pb-0 transition-all duration-300 flex flex-col hover:-translate-y-1
                    ${isElected ? `border-${theme.color}-500 shadow-[0_0_15px_${theme.hex}22]` : `border-white/10 hover:border-${theme.color}-500/50`}
                  `}
            >
              <div className="flex flex-col items-center mb-2 relative">
                <div
                  className={`relative w-16 h-16 mb-2 transition-all ${isConnecting || isError ? 'grayscale opacity-50' : ''}`}
                >
                  <div
                    className={`absolute -inset-1 rounded-full border border-${theme.color}-500/30 border-t-${theme.color}-400 animate-spin-slow`}
                  ></div>
                  <div className="rounded-full overflow-hidden w-full h-full relative z-10">
                    <GenerativeAvatar
                      seed={cmdr.name + cmdr.wallet}
                      className="w-full h-full"
                      rankColor={theme.hex}
                    />
                  </div>
                  {!isConnecting && !isError && (
                    <div className="absolute -bottom-4 -right-4 transform scale-[0.65] z-30 drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500">
                      <MeritBadge
                        tier={cmdr.rank}
                        variant={cmdr.badgeId}
                        showGlow={false}
                        className="w-16 h-16"
                      />
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white text-center leading-tight font-display tracking-wide uppercase">
                  {cmdr.name}
                </h4>
                <div
                  className={`text-[9px] font-mono uppercase tracking-wider mt-0.5 text-${theme.color}-400/70`}
                >
                  {cmdr.role}
                </div>
              </div>

              <div
                className={`bg-[#050505] rounded-lg p-2 border border-white/5 mb-2 group-hover:border-${theme.color}-500/30 transition-colors`}
              >
                <div className="text-[7px] text-gray-600 uppercase font-bold tracking-widest mb-1">
                  Seçim Vaadi
                </div>
                <div
                  className={`text-[9px] font-bold ${isElected ? `text-${theme.color}-400` : 'text-gray-300'}`}
                >
                  {cmdr.marketPerk}
                </div>
              </div>

              <div className="mt-auto relative min-h-[80px] flex flex-col justify-end">
                {isError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/10 backdrop-blur-sm rounded border border-red-500/20 z-20">
                    <ServerOff className="w-5 h-5 text-red-500 mb-1" />
                    <span className="text-[9px] text-red-400 font-bold uppercase">TX FAILED</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-end mb-1">
                      <span
                        className={`text-[8px] uppercase font-bold flex items-center gap-1 text-${theme.color}-500`}
                      >
                        <BarChart3 className="w-2.5 h-2.5" /> VOTES
                      </span>
                      <span
                        className={`text-[9px] font-mono tabular-nums ${isElected ? `text-${theme.color}-400 font-bold` : 'text-white'}`}
                      >
                        {cmdr.votes} <span className="text-gray-600">/ {cmdr.voteTarget}</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full transition-all duration-700 bg-${theme.color}-500`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {!isElected && (
                      <div className="flex gap-1 mb-1">
                        <button
                          onClick={() => castVote(cmdr.id)}
                          disabled={cmdr.electionState === 'VOTING'}
                          className={`flex-1 py-2 rounded flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait
                                            bg-${theme.color}-500/10 text-${theme.color}-400 border border-${theme.color}-500/30 hover:bg-${theme.color}-500/20 hover:border-${theme.color}-500/60
                                        `}
                        >
                          {cmdr.electionState === 'VOTING' ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Vote className="w-3 h-3" />
                          )}
                          OY
                        </button>
                        <button
                          className="w-8 py-2 rounded flex items-center justify-center bg-[#151515] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                          title="İncele"
                        >
                          <ShoppingBag className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {isElected && (
                      <div
                        className={`w-full py-1.5 mb-1 bg-${theme.color}-900/20 border border-${theme.color}-500/30 rounded text-center text-[10px] text-${theme.color}-400 font-bold uppercase tracking-widest`}
                      >
                        SEÇİM TAMAMLANDI
                      </div>
                    )}
                  </>
                )}
                <StatusPanel state={cmdr.electionState} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
