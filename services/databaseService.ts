import {
  SEED_TRANSACTIONS,
  SEED_PROPOSALS,
  SEED_INVENTORY,
  SEED_COUNCIL_MEMBERS,
  SEED_SHIP_TREASURIES
} from '../config/seedData'
import { Transaction, Balances } from '../contexts/SimulationContext'
import { Proposal } from '../types'

const DB_KEYS = {
  TRANSACTIONS: 'aoxc_db_transactions',
  PROPOSALS: 'aoxc_db_proposals',
  BALANCES: 'aoxc_db_balances',
  INVENTORY: 'aoxc_db_inventory',
  MISSIONS: 'aoxc_db_missions',
  COUNCIL: 'aoxc_db_council',
  SHIP_TREASURIES: 'aoxc_db_ship_treasuries',
  INIT: 'aoxc_db_initialized_v3' // BUMPED VERSION TO RESET DATA FOR 100K BALANCE
}

export interface InventoryItem {
  id: string
  itemId: string
  name: string
  type: string
  acquiredAt: string
}

export interface MissionState {
  id: number
  status: 'Ready' | 'Active' | 'Completed'
  startTime?: number
}

export interface CouncilMember {
  id: string
  name: string
  wallet: string
  rank: string
  balance: number
  avatarColor: string
  role: string
}

export interface ShipTreasury {
  locked: number
  revenue: number
}

// --- SIMULATED SQL ENGINE ---
class DatabaseService {
  private simulationInterval: any

  constructor() {
    this.initialize()
    this.startWorldSimulation()
  }

  private initialize() {
    // If version mismatch or not initialized, wipe and seed
    if (!localStorage.getItem(DB_KEYS.INIT)) {
      console.log('>> SYSTEM RESET: Seeding new blockchain state (v3)...')
      localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(SEED_TRANSACTIONS))
      localStorage.setItem(DB_KEYS.PROPOSALS, JSON.stringify(SEED_PROPOSALS))
      localStorage.setItem(DB_KEYS.BALANCES, JSON.stringify(SEED_INVENTORY))
      localStorage.setItem(DB_KEYS.COUNCIL, JSON.stringify(SEED_COUNCIL_MEMBERS))
      localStorage.setItem(DB_KEYS.SHIP_TREASURIES, JSON.stringify(SEED_SHIP_TREASURIES))
      localStorage.setItem(DB_KEYS.INVENTORY, JSON.stringify([]))
      localStorage.setItem(DB_KEYS.MISSIONS, JSON.stringify([]))
      localStorage.setItem(DB_KEYS.INIT, 'true')
    }
  }

  // --- BACKGROUND SIMULATION (THE GHOST IN THE MACHINE) ---
  private startWorldSimulation() {
    if (this.simulationInterval) clearInterval(this.simulationInterval)

    // Every 3-7 seconds, a random council member does something
    this.simulationInterval = setInterval(() => {
      this.simulateRandomEvent()
    }, 4500)
  }

  private async simulateRandomEvent() {
    const council = await this.getCouncilMembers()
    const actor = council[Math.floor(Math.random() * council.length)]
    const actions = ['VOTE', 'SWAP', 'STAKE', 'BRIDGE']
    const action = actions[Math.floor(Math.random() * actions.length)]

    let details = ''
    const amount = Math.floor(Math.random() * 5000) + 100

    // Impact Logic: Actions affect specific ship treasuries
    let affectedShip = ''
    let tax = 0

    switch (action) {
      case 'VOTE':
        details = `Voted on Proposal #${2042 + Math.floor(Math.random() * 3)}`
        affectedShip = 'andromeda'
        tax = 0.5 // Voting fee
        break
      case 'SWAP':
        details = `Swapped ${amount} USDC for AOXC via Aquila`
        affectedShip = 'aquila'
        tax = amount * 0.003 // 0.3% fee
        break
      case 'STAKE':
        details = `Staked ${amount * 2} AOXC in Vault`
        affectedShip = 'virgo'
        tax = 0
        break
      case 'BRIDGE':
        details = `Bridged Assets to Ethereum`
        affectedShip = 'centaurus'
        tax = amount * 0.001 // Bridge fee
        break
    }

    // Update Global Log
    const newTx: Transaction = {
      hash: `0x${Math.floor(Math.random() * 16 ** 64)
        .toString(16)
        .substring(0, 64)}`,
      type: action as any,
      details: `${actor.name}: ${details}`,
      block: 18940500 + Math.floor(Math.random() * 1000),
      status: 'CONFIRMED',
      timestamp: new Date().toLocaleTimeString()
    }

    const currentTx = await this.getTransactions(100)
    const updatedTx = [newTx, ...currentTx].slice(0, 100)
    localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(updatedTx))

    // Update Ship Treasury (Simulating Economic Activity)
    if (affectedShip && tax > 0) {
      await this.updateShipTreasury(affectedShip, tax)
    }
  }

  // --- SHIP TREASURIES ---
  public async getShipTreasuries(): Promise<Record<string, ShipTreasury>> {
    const data = localStorage.getItem(DB_KEYS.SHIP_TREASURIES)
    return data ? JSON.parse(data) : SEED_SHIP_TREASURIES
  }

  public async updateShipTreasury(shipId: string, revenueAdd: number): Promise<void> {
    const treasuries = await this.getShipTreasuries()
    if (treasuries[shipId]) {
      treasuries[shipId].revenue += revenueAdd
      treasuries[shipId].locked += revenueAdd // Revenue stays in protocol
      localStorage.setItem(DB_KEYS.SHIP_TREASURIES, JSON.stringify(treasuries))
    }
  }

  // --- COUNCIL MEMBERS ---
  public async getCouncilMembers(): Promise<CouncilMember[]> {
    const data = localStorage.getItem(DB_KEYS.COUNCIL)
    return data ? JSON.parse(data) : SEED_COUNCIL_MEMBERS
  }

  // --- TRANSACTIONS ---
  public async getTransactions(limit: number = 50): Promise<Transaction[]> {
    const data = localStorage.getItem(DB_KEYS.TRANSACTIONS)
    return data ? JSON.parse(data).slice(0, limit) : []
  }

  public async insertTransaction(tx: Transaction): Promise<void> {
    const current = await this.getTransactions(100)
    const updated = [tx, ...current]
    localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(updated))
  }

  // --- BALANCES ---
  public async getBalances(): Promise<Balances> {
    const data = localStorage.getItem(DB_KEYS.BALANCES)
    return data ? JSON.parse(data) : SEED_INVENTORY
  }

  public async updateBalance(token: string, amount: number): Promise<void> {
    const balances = await this.getBalances()
    balances[token] = amount
    localStorage.setItem(DB_KEYS.BALANCES, JSON.stringify(balances))
  }

  // --- PROPOSALS ---
  public async getProposals(): Promise<Proposal[]> {
    const data = localStorage.getItem(DB_KEYS.PROPOSALS)
    return data ? JSON.parse(data) : []
  }

  public async voteOnProposal(id: number, type: 'for' | 'against'): Promise<void> {
    const proposals = await this.getProposals()
    const updated = proposals.map(p => {
      if (p.id === id) {
        // Simulate weighted voting (User has e.g. 1450 voting power)
        const userPower = 2450
        return {
          ...p,
          forVotes: type === 'for' ? p.forVotes + userPower : p.forVotes,
          againstVotes: type === 'against' ? p.againstVotes + userPower : p.againstVotes
        }
      }
      return p
    })
    localStorage.setItem(DB_KEYS.PROPOSALS, JSON.stringify(updated))
  }

  // --- INVENTORY (MARKET) ---
  public async getInventory(): Promise<InventoryItem[]> {
    const data = localStorage.getItem(DB_KEYS.INVENTORY)
    return data ? JSON.parse(data) : []
  }

  public async addItemToInventory(item: InventoryItem): Promise<void> {
    const current = await this.getInventory()
    const updated = [item, ...current]
    localStorage.setItem(DB_KEYS.INVENTORY, JSON.stringify(updated))
  }

  // --- MISSIONS ---
  public async getMissions(): Promise<MissionState[]> {
    const data = localStorage.getItem(DB_KEYS.MISSIONS)
    return data ? JSON.parse(data) : []
  }

  public async updateMissionStatus(
    id: number,
    status: 'Ready' | 'Active' | 'Completed'
  ): Promise<void> {
    let current = await this.getMissions()
    const exists = current.find(m => m.id === id)

    if (exists) {
      current = current.map(m =>
        m.id === id
          ? { ...m, status, startTime: status === 'Active' ? Date.now() : m.startTime }
          : m
      )
    } else {
      current.push({ id, status, startTime: status === 'Active' ? Date.now() : undefined })
    }
    localStorage.setItem(DB_KEYS.MISSIONS, JSON.stringify(current))
  }

  // --- RESET ---
  public factoryReset() {
    localStorage.clear()
    window.location.reload()
  }
}

export const db = new DatabaseService()
