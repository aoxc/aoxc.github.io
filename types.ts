export interface ShipModule {
  id: string
  name: string
  role: string
  contractRef: string
  status: 'active' | 'maintenance' | 'offline'
  description: string
  // New visual & economic props
  themeColor: string // Tailwind color class prefix (e.g., 'emerald') or Hex
  localToken: {
    symbol: string
    name: string
    contractAddress?: string // Real chain address
    explorerUrl?: string
    price: number // in AOXC
    change24h: number // percentage
  }
  marketStats?: {
    taxRevenue24h: string // e.g. "12,400 AOXC"
    exchangeRate: string // e.g. "1 XP = 0.042 AOXC"
  }
  treasury: {
    locked: string // e.g. "1,000,000"
    earnings: string // e.g. "0.000"
    asset: string // e.g. "AOXC"
  }
  missions: {
    id: number
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED'
    label: string
  }[]
  icon: string
}

export interface Proposal {
  id: number
  title: string
  proposer: string
  description: string
  forVotes: number
  againstVotes: number
  endTime: string
  status: 'Active' | 'Executed' | 'Defeated'
  module: string // e.g., 'Andromeda', 'Aquila'
}

export type RankTier = 'ADMIRAL' | 'CAPTAIN' | 'GOLD' | 'SILVER' | 'BRONZE' | 'CANDIDATE'

export type ElectionState =
  | 'NOMINATED'
  | 'VOTING'
  | 'ELECTED'
  | 'DISQUALIFIED'
  | 'CONNECTING'
  | 'ERROR'

export interface MeritBadgeNFT {
  id: string
  tier: RankTier
  shipId: string // Hangi gemiye ait olduğu
  issuedDate: string
  tokenId: string
}

export interface UserProfile {
  address: string
  balance: string
  reputation: number // Liyakat puanı based on ReputationManager.sol
  rank: string
  role: string // Based on RoleAuthority.sol
  badges: MeritBadgeNFT[] // Kullanıcının sahip olduğu NFT rozetleri
}

export enum ContractStatus {
  DESIGN = 'DESIGN', // Tasarım/Öneri Aşaması
  DEV = 'DEV', // Geliştirme
  TESTNET = 'TESTNET', // Test Ağı
  AUDIT = 'AUDIT', // Denetim/Onay
  MAINNET = 'MAINNET' // Canlı Ağ (X Layer)
}

export interface ContractFile {
  name: string
  type: 'file'
  status: ContractStatus
  version: string
  description: string
  content: string // Mock Solidity code
  deployedAddress?: string
}

export interface ContractFolder {
  name: string
  type: 'folder'
  children: (ContractFolder | ContractFile)[]
}

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  GOVERNANCE = 'GOVERNANCE',
  SWAP = 'SWAP',
  BRIDGE = 'BRIDGE',
  TREASURY = 'TREASURY',
  PROFILE = 'PROFILE',
  MISSIONS = 'MISSIONS',
  CONTRACTS = 'CONTRACTS',
  DOCS = 'DOCS',
  TELEMETRY = 'TELEMETRY',
  ORACLE = 'ORACLE',
  SECURITY = 'SECURITY',
  SENTINEL = 'SENTINEL',
  VIRGO = 'VIRGO',
  MARKET = 'MARKET',
  FLEET_ENGINEERING = 'FLEET_ENGINEERING'
}

// --- TELEMETRY TYPES ---

export interface TelemetryLog {
  id: string
  timestamp: string
  type: 'VOTE' | 'TX' | 'UPGRADE' | 'DEPLOY' | 'BRIDGE'
  address: string
  details: string
  status: 'Success' | 'Failed' | 'Pending'
  hash: string
  targetModule: string // e.g., 'AQUILA EXCHANGE'
  // Extended technical data for slide-out panel
  technical?: {
    gasUsed: string
    nonce: number
    inputData: string // Hex code
    signature: string
  }
}

export interface SystemMetric {
  gasUsage: number[] // Array for chart (last 24h)
  avgBlockTime: string
  tps: number
  activeNodes: number
  successRate: number // Percentage
  gasPressure: number // 0-100 for gauge
  heartbeatHistory: number[] // Array for EKG
}

export interface RiskAlert {
  id: string
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL'
  source: string // e.g., "Quasar Sentry"
  message: string
  timestamp: string
  resolved: boolean
  type: 'MEMPOOL' | 'PROTOCOL' | 'INFRASTRUCTURE'
}

export interface ModuleHealth {
  moduleId: string
  name: string
  uptime: number // %
  latency: number // ms
  status: 'OPTIMAL' | 'DEGRADED' | 'OFFLINE' | 'HIGH_LOAD'
  eventDensity: 'LOW' | 'MODERATE' | 'HIGH'
  loadPercent: number // 0-100
}
