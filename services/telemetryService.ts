import { TelemetryLog, SystemMetric, RiskAlert, ModuleHealth } from '../types'
import { FLEET_MODULES } from '../constants'

// MOCK DATA GENERATORS
// Used when RPC connection fails or for simulation mode

const generateLogs = (): TelemetryLog[] => {
  const types: TelemetryLog['type'][] = ['VOTE', 'TX', 'BRIDGE', 'DEPLOY']
  const statuses: TelemetryLog['status'][] = ['Success', 'Success', 'Success', 'Pending', 'Failed']

  return Array.from({ length: 15 }).map((_, i) => {
    const mod = FLEET_MODULES[Math.floor(Math.random() * FLEET_MODULES.length)]
    return {
      id: `log-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - i * 1000 * 60 * 2).toLocaleTimeString(),
      type: types[Math.floor(Math.random() * types.length)],
      address: `0x${Math.floor(Math.random() * 16777215).toString(16)}...${Math.floor(Math.random() * 16777215).toString(16)}`,
      details: `Operation on ${mod.name}`,
      targetModule: mod.name,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16))
        .join('')
        .substring(0, 16)}...`,
      technical: {
        gasUsed: `${Math.floor(Math.random() * 500000)} WEI`,
        nonce: 1042 + i,
        inputData: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        signature: `0x${Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...`
      }
    }
  })
}

const generateMetrics = (): SystemMetric => ({
  gasUsage: Array.from({ length: 24 }).map(() => Math.floor(Math.random() * 50) + 10),
  avgBlockTime: '2.1s',
  tps: Math.floor(Math.random() * 100) + 50,
  activeNodes: 12,
  successRate: 98.4,
  gasPressure: Math.floor(Math.random() * 60) + 20, // 20-80 pressure
  heartbeatHistory: Array.from({ length: 30 }).map(() => Math.random() * 50 + 20) // For EKG
})

const generateAlerts = (): RiskAlert[] => [
  {
    id: 'alert-1',
    severity: 'MEDIUM',
    source: 'Quasar Sentry',
    message: 'Mempool congestion detected. Unusual activity from bridge endpoint.',
    timestamp: '10 mins ago',
    resolved: false,
    type: 'MEMPOOL'
  },
  {
    id: 'alert-2',
    severity: 'LOW',
    source: 'Andromeda Core',
    message: 'Governance proposal #1043 voting power disparity sync.',
    timestamp: '1 hr ago',
    resolved: true,
    type: 'PROTOCOL'
  }
]

const generateHealth = (): ModuleHealth[] => {
  return FLEET_MODULES.map(m => ({
    moduleId: m.id,
    name: m.name,
    uptime: 99.9,
    latency: Math.floor(Math.random() * 50) + 10,
    status: Math.random() > 0.9 ? 'HIGH_LOAD' : 'OPTIMAL',
    eventDensity: Math.random() > 0.7 ? 'HIGH' : 'MODERATE',
    loadPercent: Math.floor(Math.random() * 80) + 10
  }))
}

export const fetchTelemetry = async (): Promise<{
  logs: TelemetryLog[]
  metrics: SystemMetric
  alerts: RiskAlert[]
  health: ModuleHealth[]
  isSimulated: boolean
}> => {
  // Simulate RPC Call Check
  const isRpcLive = Math.random() > 0.1

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        logs: generateLogs(),
        metrics: generateMetrics(),
        alerts: generateAlerts(),
        health: generateHealth(),
        isSimulated: !isRpcLive
      })
    }, 800)
  })
}
