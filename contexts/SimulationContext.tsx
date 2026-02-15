import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback
} from 'react'
import { db } from '../services/databaseService'
import { useToast } from './ToastContext'

// --- TYPES ---
export interface Transaction {
  hash: string
  type: 'SWAP' | 'VOTE' | 'STAKE' | 'BRIDGE' | 'MINT' | 'MARKET'
  details: string
  block: number
  status: 'CONFIRMED' | 'PENDING' | 'FAILED' | 'REVERTED'
  timestamp: string
}

export interface Balances {
  AOXC: number
  USDC: number
  OKB: number
  ETH: number
  [key: string]: number
}

interface SimulationState {
  blockNumber: number
  gasPrice: number
  aoxcPrice: number
  balances: Balances
  transactions: Transaction[]
  networkLoad: number
  executeTransaction: (
    type: Transaction['type'],
    details: string,
    cost?: { token: string; amount: number }
  ) => Promise<string>
  processShipRevenue: (shipId: string, amount: number) => Promise<void>
  refreshData: () => void
  isConnected: boolean
}

const SimulationContext = createContext<SimulationState | undefined>(undefined)

const genHash = () =>
  '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast()

  const [blockNumber, setBlockNumber] = useState(12940502)
  const [gasPrice, setGasPrice] = useState(0.001)
  const [aoxcPrice, setAoxcPrice] = useState(1.24)
  const [networkLoad, setNetworkLoad] = useState(45)

  const [balances, setBalances] = useState<Balances>({ AOXC: 0, USDC: 0, OKB: 0, ETH: 0 })
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Optimized refresh: only updates if data changed (naive check, but effective for this scale)
  const refreshData = useCallback(async () => {
    const dbTx = await db.getTransactions()
    const dbBal = await db.getBalances()

    setTransactions(dbTx)
    setBalances(dbBal)
  }, [])

  // INITIAL LOAD
  useEffect(() => {
    refreshData()
  }, [refreshData])

  // BACKGROUND SYNC (Keep UI in sync with ghost simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 4000) // Sync every 4s
    return () => clearInterval(interval)
  }, [refreshData])

  // BLOCK PRODUCER (Pure UI Simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber(prev => prev + 1)
      setGasPrice(prev => Math.max(0.0001, prev + (Math.random() - 0.5) * 0.0005))
      // Price Walk
      setAoxcPrice(prev => {
        const change = (Math.random() - 0.5) * 0.01
        return prev * (1 + change)
      })
      setNetworkLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() - 0.5) * 10)))
    }, 2000) // 2s Block Time

    return () => clearInterval(interval)
  }, [])

  // NEW: Process Revenue for Ships
  const processShipRevenue = async (shipId: string, amount: number) => {
    await db.updateShipTreasury(shipId, amount)
    // We don't force refresh here to avoid excessive re-renders,
    // The ShipCard component polls its own treasury data.
  }

  // TRANSACTION EXECUTOR
  const executeTransaction = async (
    type: Transaction['type'],
    details: string,
    cost?: { token: string; amount: number }
  ): Promise<string> => {
    const txHash = genHash()

    // 1. Cost Check
    if (cost) {
      const currentBal = balances[cost.token] || 0
      if (currentBal < cost.amount) {
        const errorMsg = `Yetersiz Bakiye: ${cost.token}. Gereken: ${cost.amount}, Mevcut: ${currentBal.toFixed(2)}`
        addToast('ERROR', 'Transaction Reverted', errorMsg)
        throw new Error(errorMsg)
      }
    }

    // 2. Optimistic Update (Pending State)
    addToast('TX', 'Processing Transaction', 'Broadcasting to X Layer Mempool...', txHash)

    const newTx: Transaction = {
      hash: txHash,
      type,
      details,
      block: blockNumber + 1,
      status: 'PENDING',
      timestamp: new Date().toLocaleString()
    }
    // Update local state immediately for responsiveness
    setTransactions(prev => [newTx, ...prev])

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // 3. Deduct Balance in DB
          if (cost) {
            const currentBal = (await db.getBalances())[cost.token] || 0
            // Double check in DB just in case
            if (currentBal < cost.amount) throw new Error('Insufficient funds during execution')

            const newBalance = currentBal - cost.amount
            await db.updateBalance(cost.token, newBalance)

            // Update local state immediately
            setBalances(prev => ({ ...prev, [cost.token]: newBalance }))
          }

          // 4. Confirm Transaction in DB
          const confirmedTx = { ...newTx, status: 'CONFIRMED' as const }
          await db.insertTransaction(confirmedTx)

          // 5. Notify
          addToast(
            'SUCCESS',
            'Transaction Confirmed',
            `${type} operation successful on block #${blockNumber + 1}`,
            txHash
          )

          refreshData()
          resolve(txHash)
        } catch (e: any) {
          addToast('ERROR', 'Transaction Failed', e.message, txHash)
          // Revert local transaction state
          setTransactions(prev =>
            prev.map(t => (t.hash === txHash ? { ...t, status: 'FAILED' } : t))
          )
          reject(e)
        }
      }, 2000) // 2s Network Delay simulation
    })
  }

  return (
    <SimulationContext.Provider
      value={{
        blockNumber,
        gasPrice,
        aoxcPrice,
        balances,
        transactions,
        networkLoad,
        executeTransaction,
        processShipRevenue,
        refreshData,
        isConnected: true // Always simulated as connected for this demo
      }}
    >
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => {
  const context = useContext(SimulationContext)
  if (!context) throw new Error('useSimulation must be used within SimulationProvider')
  return context
}
