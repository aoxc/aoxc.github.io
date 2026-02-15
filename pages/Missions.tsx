import React, { useState, useEffect } from 'react'
import {
  Shield,
  Zap,
  Activity,
  Database,
  Box,
  Network,
  Rocket,
  CheckCircle2,
  Radio,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { db, MissionState } from '../services/databaseService'
import { useSimulation } from '../contexts/SimulationContext'

// --- TYPES ---
type MissionType = 'INTEL' | 'LOGISTICS' | 'PRODUCTION' | 'DEFENSE'

interface Mission {
  id: number
  title: string
  type: MissionType
  difficulty: 'Low' | 'Medium' | 'High' | 'Omega'
  risk: number
  durationMs: number // in milliseconds for demo
  rewardToken: string
  rewardAmount: number
  description: string
  requirements: string[]
  icon: any
  color: string
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Operation Deep Space Audit',
    type: 'INTEL',
    difficulty: 'High',
    risk: 15,
    durationMs: 8000, // 8 seconds
    rewardToken: 'AOXC',
    rewardAmount: 500,
    description: 'Sombrero Sentinel, rakip bir ağda likidite sızıntısı tespit etti.',
    requirements: ['Level 3 Clearance'],
    icon: Database,
    color: 'amber'
  },
  {
    id: 2,
    title: 'Void Defense Protocol',
    type: 'DEFENSE',
    difficulty: 'Omega',
    risk: 45,
    durationMs: 12000, // 12s
    rewardToken: 'QSRXP',
    rewardAmount: 1000,
    description: 'X Layer köprüsüne yönelik organize bot saldırısı.',
    requirements: ['Quasar Active'],
    icon: Shield,
    color: 'red'
  },
  {
    id: 3,
    title: 'Wormhole Logistics',
    type: 'LOGISTICS',
    difficulty: 'Medium',
    risk: 5,
    durationMs: 5000, // 5s
    rewardToken: 'CNTXP',
    rewardAmount: 150,
    description: 'Centaurus köprüsündeki yoğunluk.',
    requirements: ['Centaurus Access'],
    icon: Network,
    color: 'violet'
  }
]

export const Missions: React.FC = () => {
  const { executeTransaction, balances, refreshData } = useSimulation()
  const [missionStates, setMissionStates] = useState<MissionState[]>([])
  const [activeMissionId, setActiveMissionId] = useState<number | null>(null)

  // Load from DB
  useEffect(() => {
    db.getMissions().then(setMissionStates)
  }, [])

  const handleStartMission = async (id: number) => {
    const mission = MOCK_MISSIONS.find(m => m.id === id)
    if (!mission) return

    // 1. Update DB to Active
    await db.updateMissionStatus(id, 'Active')
    setMissionStates(await db.getMissions())
    setActiveMissionId(id)

    // 2. Wait for duration then Complete
    setTimeout(async () => {
      // A. Mark as Completed
      await db.updateMissionStatus(id, 'Completed')
      setMissionStates(await db.getMissions())
      setActiveMissionId(null)

      // B. Payout Reward via DB Update (Real Simulation)
      const currentBalance = balances[mission.rewardToken] || 0
      await db.updateBalance(mission.rewardToken, currentBalance + mission.rewardAmount)

      // C. Log Transaction
      await executeTransaction(
        'MINT',
        `Mission Reward: ${mission.title} (+${mission.rewardAmount} ${mission.rewardToken})`
      )

      // D. Force UI Refresh to show new balance
      refreshData()

      // E. Alert
      alert(
        `MISSION COMPLETE: Operation successful.\n+${mission.rewardAmount} ${mission.rewardToken} credited to vault.`
      )
    }, mission.durationMs)
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
      {/* HEADER STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0A0A0A] border border-white/10 p-4 rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">
            Active Operations
          </span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-lg font-mono font-bold text-white">
              {missionStates.filter(m => m.status === 'Active').length}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">
            Completed
          </span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-lg font-mono font-bold text-white">
              {missionStates.filter(m => m.status === 'Completed').length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MISSIONS.map(mission => {
              const state = missionStates.find(m => m.id === mission.id)
              const status = state?.status || 'Ready'
              const isActive = status === 'Active'
              const isCompleted = status === 'Completed'
              const Icon = mission.icon

              return (
                <div
                  key={mission.id}
                  className={`relative bg-[#0a0a0a] border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1
                                ${isActive ? `border-${mission.color}-500 shadow-[0_0_15px_${mission.color}20]` : 'border-white/10 hover:border-white/20'}
                                ${isCompleted ? 'opacity-60 grayscale' : ''}
                            `}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-${mission.color}-500/10 text-${mission.color}-400 border border-${mission.color}-500/20`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {mission.title}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                          {mission.type} OP
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 text-gray-400">
                      {mission.difficulty}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 mb-4 h-8 leading-tight">
                    {mission.description}
                  </p>

                  {/* Reward */}
                  <div className="bg-black/40 p-2 rounded-lg border border-white/5 mb-4 flex justify-between items-center px-4">
                    <div className="text-[8px] text-gray-500 uppercase font-bold">Bounty</div>
                    <div className="text-xs text-green-400 font-mono font-bold flex items-center gap-1">
                      +{mission.rewardAmount} {mission.rewardToken}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] text-gray-500 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-xlayer-green" />
                      Duration: {mission.durationMs / 1000}s
                    </div>

                    {isActive ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold uppercase rounded flex items-center gap-2 cursor-wait"
                      >
                        <Loader2 className="w-3 h-3 animate-spin" />
                        IN PROGRESS...
                      </button>
                    ) : isCompleted ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-bold uppercase rounded flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        CLAIMED
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartMission(mission.id)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-[10px] font-bold uppercase rounded transition-colors flex items-center gap-2"
                      >
                        <Rocket className="w-3 h-3" />
                        DEPLOY SQUAD
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-500" /> Mission Log
            </h3>
            <div className="space-y-2">
              {missionStates
                .slice(-5)
                .reverse()
                .map((m, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-[10px] text-gray-400 border-b border-white/5 pb-2 last:border-0"
                  >
                    <span className="font-mono">Mission ID #{m.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${m.status === 'Completed' ? 'text-green-500 bg-green-900/10' : m.status === 'Active' ? 'text-yellow-500 bg-yellow-900/10' : 'text-gray-500'}`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              {missionStates.length === 0 && (
                <div className="text-[10px] text-gray-600">No mission data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
