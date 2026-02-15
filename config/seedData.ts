import { Transaction } from '../contexts/SimulationContext'
import { Proposal } from '../types'

// --- 10 ELITE COUNCIL MEMBERS (RANDOM WHALES FOR SIMULATION) ---
export const SEED_COUNCIL_MEMBERS = [
  {
    id: 'c1',
    name: 'Grand Adm. Cipher',
    wallet: '0x71C...9A23',
    rank: 'ADMIRAL',
    balance: 15420000,
    avatarColor: '#ef4444',
    role: 'Supreme Commander'
  },
  {
    id: 'c2',
    name: 'Baroness Vesta',
    wallet: '0x88B...11CC',
    rank: 'ADMIRAL',
    balance: 12800000,
    avatarColor: '#22d3ee',
    role: 'Treasury Keeper'
  },
  {
    id: 'c3',
    name: 'Cmdr. Helix',
    wallet: '0xAA1...99DD',
    rank: 'CAPTAIN',
    balance: 8500000,
    avatarColor: '#10b981',
    role: 'Fleet Ops'
  },
  {
    id: 'c4',
    name: 'Unit 734 (AI)',
    wallet: '0x000...B0T1',
    rank: 'CAPTAIN',
    balance: 9200000,
    avatarColor: '#a855f7',
    role: 'Algorithmic Trader'
  },
  {
    id: 'c5',
    name: 'Lord Nebula',
    wallet: '0xBB2...44EE',
    rank: 'GOLD',
    balance: 4100000,
    avatarColor: '#eab308',
    role: 'Investor'
  },
  {
    id: 'c6',
    name: 'Lady Stardust',
    wallet: '0xCC3...55FF',
    rank: 'GOLD',
    balance: 3900000,
    avatarColor: '#f472b6',
    role: 'Media Lead'
  },
  {
    id: 'c7',
    name: 'Eng. Spark',
    wallet: '0xDD4...66AA',
    rank: 'SILVER',
    balance: 1200000,
    avatarColor: '#f97316',
    role: 'Builder'
  },
  {
    id: 'c8',
    name: 'Dr. Horizon',
    wallet: '0xEE5...77BB',
    rank: 'SILVER',
    balance: 980000,
    avatarColor: '#3b82f6',
    role: 'Researcher'
  },
  {
    id: 'c9',
    name: 'Shadow Operative',
    wallet: '0xFF6...88CC',
    rank: 'BRONZE',
    balance: 550000,
    avatarColor: '#64748b',
    role: 'Unknown'
  },
  {
    id: 'c10',
    name: 'Vault Keeper',
    wallet: '0x123...0000',
    rank: 'BRONZE',
    balance: 42000000,
    avatarColor: '#8CD100',
    role: 'Liquidity Provider'
  }
]

// --- SHIP TREASURIES (Live Tracking) ---
export const SEED_SHIP_TREASURIES = {
  andromeda: { locked: 145000000, revenue: 5400.5 },
  aquila: { locked: 42000000, revenue: 18240.2 },
  centaurus: { locked: 25000000, revenue: 8900.1 },
  pegasus: { locked: 15000000, revenue: 4200.0 },
  quasar: { locked: 30000000, revenue: 11500.8 },
  virgo: { locked: 18000000, revenue: 22100.4 },
  sombrero: { locked: 5000000, revenue: 1200.0 }
}

export const SEED_TRANSACTIONS: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
  hash: `0x${Math.floor(Math.random() * 16 ** 64)
    .toString(16)
    .padStart(64, '0')}`,
  type: i % 4 === 0 ? 'VOTE' : i % 3 === 0 ? 'SWAP' : 'MINT',
  details:
    i % 4 === 0
      ? `Council Vote: Proposal #${1040 + i}`
      : i % 3 === 0
        ? `Liquidity Add: ${Math.floor(Math.random() * 50000)} AOXC`
        : `Forged Component: Hull Plating v${i}`,
  block: 18940000 - i * 12, // 2026 Block Height projection
  status: 'CONFIRMED',
  timestamp: new Date(Date.now() - i * 1000 * 60 * 15).toLocaleString()
}))

export const SEED_PROPOSALS: Proposal[] = [
  {
    id: 2045,
    title: 'Protocol Upgrade: Andromeda V6 (Stellar Burn)',
    proposer: '0x71...9A23',
    description:
      "2026 Mali Yılı için işlem ücretlerinin %15'inin kalıcı olarak yakılması (Burn) teklifi.",
    forVotes: 15420000,
    againstVotes: 450000,
    endTime: '48s 12dk',
    status: 'Active',
    module: 'ANDROMEDA'
  },
  {
    id: 2044,
    title: 'Treasury Allocation: Sector 9 Expansion',
    proposer: 'Aquila DAO',
    description:
      'Yeni keşfedilen L3 ağlarına likidite köprüsü kurulması için 10 Milyon AOXC bütçe.',
    forVotes: 8900000,
    againstVotes: 9200000,
    endTime: '0s',
    status: 'Defeated',
    module: 'TREASURY'
  },
  {
    id: 2043,
    title: 'Security Patch: Quantum Shielding v2',
    proposer: 'Quasar System',
    description: 'Kuantum dirençli imza algoritmalarının zorunlu hale getirilmesi.',
    forVotes: 45000000,
    againstVotes: 0,
    endTime: '0s',
    status: 'Executed',
    module: 'QUASAR'
  },
  {
    id: 2042,
    title: 'Market Listing: Dark Matter (DMAT) Futures',
    proposer: 'Dr. Horizon',
    description: 'Virgo tarafından üretilen sentetik vadeli işlem kontratlarının listelenmesi.',
    forVotes: 2100000,
    againstVotes: 50000,
    endTime: '12h 30m',
    status: 'Active',
    module: 'VIRGO'
  }
]

// --- INITIAL USER WALLET (FULL BALANCE) ---
export const SEED_INVENTORY = {
  AOXC: 100000.0,
  USDC: 50000.0,
  OKB: 150.0,
  ETH: 10.5,
  AQLXP: 1500.0,
  VRGXP: 320.0,
  DMAT: 50.0
}
