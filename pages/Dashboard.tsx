import React from 'react'
import { FLEET_MODULES } from '../constants'
import * as Icons from 'lucide-react'
import { FleetCommandWidget } from '../components/FleetCommandWidget'
import { FlagshipWidget } from '../components/FlagshipWidget'
import { HolographicFleet } from '../components/HolographicFleet' // NEW COMPONENT
import { ElectionCampaignBanner } from '../components/ElectionCampaignBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { useSimulation } from '../contexts/SimulationContext'
import { PageView } from '../types'

interface DashboardProps {
  setPage: (page: PageView) => void
}

// --- SUB-COMPONENT: MARKET TICKER (LIVE) ---
const MarketTicker = () => {
  const { transactions } = useSimulation()
  const recentTx = transactions.slice(0, 8)

  return (
    <div className="w-full bg-black/40 border-y border-white/10 overflow-hidden py-1 mb-4 flex items-center">
      <div className="flex items-center gap-2 px-3 text-[10px] font-bold text-yellow-500 uppercase tracking-widest shrink-0 border-r border-white/10 bg-black z-10">
        <Icons.Zap className="w-3 h-3 animate-pulse" /> Live Chain Feed
      </div>
      <div className="whitespace-nowrap overflow-hidden flex-1 relative">
        <div className="animate-[marquee_60s_linear_infinite] inline-block text-[10px] font-mono text-gray-400">
          {recentTx.map((tx, i) => (
            <span key={i} className="mx-4">
              <span className="text-cyan-400 font-bold">[BLOCK #{tx.block}]</span>
              <span className="ml-2 text-white">{tx.type}</span>: {tx.details}
              <span
                className={`ml-1 ${tx.status === 'CONFIRMED' ? 'text-green-500' : 'text-red-500'}`}
              >
                ({tx.status})
              </span>
            </span>
          ))}
          <span className="mx-4 text-emerald-400">[SYSTEM]</span> Mempool Syncing...
        </div>
      </div>
    </div>
  )
}

const NetworkStatusGrid = () => {
  const { blockNumber, gasPrice, networkLoad } = useSimulation()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
      <div className="bg-[#0a0a0a] border border-xlayer-green/30 rounded-lg p-3 flex items-center justify-between shadow-[0_0_10px_rgba(140,209,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            NETWORK
          </span>
          <span className="text-xs font-bold text-white">X LAYER MAINNET</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-xlayer-green/10 border border-xlayer-green/20 rounded text-xlayer-green text-[9px] font-bold">
          <div className="w-1.5 h-1.5 bg-xlayer-green rounded-full animate-pulse"></div>
          ID: 196
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            BLOCK HEIGHT
          </span>
          <span className="text-xs font-bold text-white font-mono">
            #{blockNumber.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-[9px] font-bold">
          <Icons.Box className="w-3 h-3" />
          3s TIME
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            GAS PRICE
          </span>
          <span className="text-xs font-bold text-white">{gasPrice.toFixed(4)} GWEI</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-[9px] font-bold">
          <Icons.Activity className="w-3 h-3" />
          STABLE
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 flex items-center justify-between opacity-90">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            NET LOAD
          </span>
          <div className="w-16 h-1.5 bg-[#222] rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-1000"
              style={{ width: `${networkLoad}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400 text-[9px] font-bold">
          <Icons.Cpu className="w-3 h-3" />
          {Math.round(networkLoad)}%
        </div>
      </div>
    </div>
  )
}

export const Dashboard: React.FC<DashboardProps> = ({ setPage }) => {
  const { t } = useLanguage()
  const { aoxcPrice, blockNumber } = useSimulation()

  const tvl = (42500000 * aoxcPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })
  const mcap = (100000000 * aoxcPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })
  const activeProposals = 3

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="w-full">
        <NetworkStatusGrid />
        <MarketTicker />
      </div>

      <div className="w-full">
        <ElectionCampaignBanner />
      </div>

      <div className="w-full">
        <FleetCommandWidget />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col h-full">
          <FlagshipWidget />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-6 h-full">
          <div className="bg-[#080808] border border-xlayer-green/30 p-6 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_20px_rgba(140,209,0,0.15)] transition-all flex flex-col justify-center min-h-[140px]">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-xlayer-green to-transparent opacity-80"></div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
              {t('tvl_label')}
            </h3>
            <div className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight transition-all duration-300">
              ${tvl}
            </div>
            <div className="mt-3 text-xs text-xlayer-green flex items-center gap-1 font-medium">
              <Icons.TrendingUp className="w-3 h-3" />
              <span>Active Pool (APY ~12%)</span>
            </div>
          </div>

          <div className="bg-[#080808] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-center min-h-[140px]">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
              Market Cap
            </h3>
            <div className="text-2xl lg:text-3xl font-display font-bold text-white tracking-tight transition-all duration-300">
              ${mcap}
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <Icons.CheckCircle2 className="w-3 h-3 text-xlayer-green" />
              {t('verified')} (AOXC Supply)
            </div>
          </div>

          <div className="bg-[#080808] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-center min-h-[140px]">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
              {t('governance_label')}
            </h3>
            <div className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
              {activeProposals}
            </div>
            <div className="mt-3 text-xs text-gray-500">Block #{blockNumber}</div>
          </div>
        </div>
      </div>

      {/* NEW: HOLOGRAPHIC FLEET VISUALIZATION */}
      <div className="w-full pt-4">
        <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2 px-1">
          <Icons.LayoutGrid className="text-xlayer-green w-5 h-5" />
          {t('fleet_modules_title')}
        </h3>

        {/* Replaced static Grid with Holographic Carousel */}
        <HolographicFleet ships={FLEET_MODULES} setPage={setPage} />
      </div>
    </div>
  )
}
