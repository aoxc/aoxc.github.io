import React, { useState } from 'react'
import {
  ShoppingBag,
  Search,
  Fuel,
  FileText,
  Zap,
  Box,
  Shield,
  Award,
  Users,
  CreditCard,
  Hammer,
  Activity,
  Pizza,
  Crosshair,
  Gem,
  Ghost,
  Scan,
  X,
  Share2,
  Network
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useSimulation } from '../contexts/SimulationContext'
import { db } from '../services/databaseService'

// --- TYPES & DATA ---

type MarketZone = 'ANDROMEDA' | 'AQUILA' | 'CENTAURUS' | 'PEGASUS' | 'QUASAR' | 'VIRGO' | 'SOMBRERO'
type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY' | 'ARTIFACT'

interface MarketItem {
  id: string
  name: string
  type: string
  description: string
  lore: string
  effect: string
  price: number
  currency: string
  stock: number | 'UNLIMITED'
  rarity: Rarity
  zone: MarketZone
  imageIcon: any
  tokenId: string
}

// MOCK DATA: 7 ZONES
const MARKET_DATABASE: MarketItem[] = [
  // --- CENTAURUS (Logistics & Food) ---
  {
    id: 'c-1',
    name: 'Nebula Pizza (Slice)',
    type: 'FOOD',
    description: 'Zero-G ortamında pişirilmiş, kozmik radyasyonla baharatlanmış.',
    lore: "Centaurus Köprüsü'nde uzun nöbet tutan pilotların favorisi.",
    effect: '+10% Mission Speed (1h)',
    price: 150,
    currency: 'USDC',
    stock: 'UNLIMITED',
    rarity: 'COMMON',
    zone: 'CENTAURUS',
    imageIcon: Pizza,
    tokenId: '#FOOD-001'
  },
  {
    id: 'c-2',
    name: 'Hyper-Warp Fuel Cell',
    type: 'LOGISTICS',
    description: 'Yıldızlararası sıçrama için yoğunlaştırılmış plazma.',
    lore: 'Bu yakıt hücreleri, karadeliklerin olay ufkundan toplanan parçacıklarla zenginleştirilmiştir.',
    effect: 'Unlock Distance: 50 LY',
    price: 500,
    currency: 'USDC',
    stock: 120,
    rarity: 'UNCOMMON',
    zone: 'CENTAURUS',
    imageIcon: Fuel,
    tokenId: '#FUEL-99'
  },
  // --- QUASAR (Security & Defense) ---
  {
    id: 'q-1',
    name: 'Plasma Rifle Mk-II',
    type: 'WEAPON',
    description: 'Standart piyade tüfeği. Bot saldırılarına karşı etkili.',
    lore: 'Quasar dökümhanelerinde seri üretilen bu silah, basitliği ve güvenilirliği ile bilinir.',
    effect: '+15 Attack Power',
    price: 800,
    currency: 'AOXC',
    stock: 50,
    rarity: 'UNCOMMON',
    zone: 'QUASAR',
    imageIcon: Crosshair,
    tokenId: '#WEP-202'
  },
  // --- VIRGO (Materials) ---
  {
    id: 'v-1',
    name: 'Industrial Titanium',
    type: 'MATERIAL',
    description: 'Gemi gövdesi onarımı için ham blok.',
    lore: 'Asteroid kuşağından çıkarılmış saf titanyum.',
    effect: 'Used for Crafting',
    price: 100,
    currency: 'USDC',
    stock: 5000,
    rarity: 'COMMON',
    zone: 'VIRGO',
    imageIcon: Gem,
    tokenId: '#MAT-TI'
  },
  // --- ANDROMEDA (Luxury) ---
  {
    id: 'a-1',
    name: 'Medal of Honor',
    type: 'BADGE',
    description: 'Üstün hizmet madalyası.',
    lore: 'Andromeda Konseyi tarafından sadece en sadık üyelere verilir.',
    effect: '+5% Voting Power',
    price: 1000,
    currency: 'AOXC',
    stock: 3,
    rarity: 'ARTIFACT',
    zone: 'ANDROMEDA',
    imageIcon: Award,
    tokenId: '#MDL-01'
  },
  // --- SOMBRERO (Intel) ---
  {
    id: 's-1',
    name: 'Intercepted Signal Data',
    type: 'INTEL',
    description: 'Rakip filolardan ele geçirilen şifreli veri.',
    lore: 'Sombrero casuslarının canları pahasına getirdiği bilgiler.',
    effect: 'Reveals Map Sector 7',
    price: 300,
    currency: 'AOXC',
    stock: 10,
    rarity: 'RARE',
    zone: 'SOMBRERO',
    imageIcon: FileText,
    tokenId: '#DAT-77'
  },
  // --- AQUILA (Finance) ---
  {
    id: 'aq-1',
    name: "Trader's Algorithm",
    type: 'SOFTWARE',
    description: 'Yüksek frekanslı alım-satım botu yazılımı.',
    lore: 'Aquila borsasında arbitraj fırsatlarını kaçırmayın.',
    effect: '+2% Swap Efficiency',
    price: 2000,
    currency: 'USDC',
    stock: 5,
    rarity: 'LEGENDARY',
    zone: 'AQUILA',
    imageIcon: Activity,
    tokenId: '#ALG-01'
  }
]

// --- ZONE CONFIGURATION ---
const ZONE_CONFIG: Record<
  MarketZone,
  { color: string; currency: string; icon: any; label: string }
> = {
  CENTAURUS: { color: 'violet', currency: 'USDC', icon: Network, label: 'FOOD & LOGISTICS' },
  QUASAR: { color: 'cyan', currency: 'AOXC', icon: Shield, label: 'ARMORY & DEFENSE' },
  VIRGO: { color: 'fuchsia', currency: 'USDC', icon: Hammer, label: 'MATERIALS & FORGE' },
  ANDROMEDA: { color: 'rose', currency: 'AOXC', icon: Award, label: 'GOVERNANCE & LUXURY' },
  AQUILA: { color: 'emerald', currency: 'USDC', icon: Activity, label: 'FINANCE & BROKERAGE' },
  PEGASUS: { color: 'amber', currency: 'USDC', icon: Zap, label: 'DATA & TECH' },
  SOMBRERO: { color: 'orange', currency: 'AOXC', icon: Users, label: 'INTEL & BLACK OPS' }
}

const NftCard = ({
  item,
  color,
  onClick
}: {
  item: MarketItem
  color: string
  onClick: () => void
}) => {
  const rarityColor = {
    COMMON: 'border-gray-600 text-gray-400',
    UNCOMMON: 'border-blue-500 text-blue-400',
    RARE: 'border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    LEGENDARY: 'border-yellow-500 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)]',
    ARTIFACT: 'border-red-600 text-red-500 shadow-[0_0_25px_rgba(220,38,38,0.6)] animate-pulse'
  }[item.rarity]

  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#0a0a0a] border rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 ${item.rarity === 'ARTIFACT' ? 'border-red-500/50' : 'border-white/10 hover:border-white/30'}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-t from-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      ></div>
      <div className="flex justify-between items-start p-4">
        <div
          className={`p-3 rounded-lg bg-[#151515] border border-white/5 group-hover:bg-${color}-500/10 group-hover:border-${color}-500/30 transition-colors`}
        >
          <item.imageIcon
            className={`w-8 h-8 text-gray-400 group-hover:text-${color}-400 transition-colors`}
          />
        </div>
        <span
          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border bg-black ${rarityColor}`}
        >
          {item.rarity}
        </span>
      </div>
      <div className="flex justify-center py-4 relative">
        <div
          className={`absolute inset-0 bg-${color}-500/5 blur-xl rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-700`}
        ></div>
        <item.imageIcon
          className={`w-24 h-24 text-${color}-500/20 group-hover:text-${color}-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500 transform group-hover:rotate-12`}
        />
      </div>
      <div className="p-4 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="text-[10px] text-gray-500 font-mono mb-1">{item.type}</div>
        <h3 className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded border border-green-900/30 truncate">
            {item.effect}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-500 uppercase">Price</span>
            <span className={`text-sm font-mono font-bold text-${color}-400`}>
              {item.price} <span className="text-[10px] text-gray-600">{item.currency}</span>
            </span>
          </div>
          <div
            className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-[#111] group-hover:bg-${color}-500 group-hover:text-black transition-colors`}
          >
            <ShoppingBag className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

const NftInspector = ({
  item,
  color,
  onClose,
  onBuy,
  isBuying
}: {
  item: MarketItem
  color: string
  onClose: () => void
  onBuy: () => void
  isBuying: boolean
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className={`relative w-full max-w-4xl bg-[#080808] border border-${color}-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]`}
      >
        <div
          className={`w-full md:w-1/2 bg-gradient-to-br from-black to-${color}-900/20 relative flex items-center justify-center p-12 overflow-hidden border-b md:border-b-0 md:border-r border-white/10`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="relative z-10 animate-[float_4s_ease-in-out_infinite]">
            <item.imageIcon
              className={`w-48 h-48 text-${color}-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className={`text-xs font-bold text-${color}-500 uppercase tracking-widest mb-1`}>
                {item.type} CLASS
              </div>
              <h2 className="text-3xl font-display font-bold text-white uppercase">{item.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="space-y-6 flex-1">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-sm text-white">{item.effect}</div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
              "{item.lore}"
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
            <button
              onClick={onBuy}
              disabled={isBuying}
              className={`flex-1 py-4 bg-${color}-600 hover:bg-${color}-500 text-white font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2`}
            >
              <ShoppingBag className="w-5 h-5" />
              {isBuying ? 'PROCESSING...' : `BUY (${item.price} ${item.currency})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Market: React.FC = () => {
  const { t } = useLanguage()
  const { executeTransaction, processShipRevenue, balances } = useSimulation()
  const [activeZone, setActiveZone] = useState<MarketZone>('CENTAURUS')
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null)
  const [isBuying, setIsBuying] = useState(false)

  const zoneConfig = ZONE_CONFIG[activeZone]
  const items = MARKET_DATABASE.filter(i => i.zone === activeZone)

  const handleBuy = async () => {
    if (!selectedItem) return
    setIsBuying(true)
    try {
      // 1. DEDUCT COST FROM USER
      await executeTransaction('MARKET', `Purchased ${selectedItem.name} in ${activeZone} Zone`, {
        token: selectedItem.currency,
        amount: selectedItem.price
      })

      // 2. CREDIT REVENUE TO SPECIFIC SHIP (Zone Owner)
      await processShipRevenue(activeZone.toLowerCase(), selectedItem.price)

      // 3. ADD ITEM TO INVENTORY
      await db.addItemToInventory({
        id: `inv-${Date.now()}`,
        itemId: selectedItem.id,
        name: selectedItem.name,
        type: selectedItem.type,
        acquiredAt: new Date().toLocaleString()
      })

      alert(
        `TRANSACTION CONFIRMED:\n${selectedItem.name} added to inventory.\n${selectedItem.price} ${selectedItem.currency} transferred to ${activeZone} Treasury.`
      )
      setSelectedItem(null)
    } catch (e: any) {
      alert(`TRANSACTION FAILED: ${e.message}`)
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20 relative">
      <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
        {(Object.keys(ZONE_CONFIG) as MarketZone[]).map(zone => {
          const conf = ZONE_CONFIG[zone]
          const isActive = activeZone === zone
          return (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap
                        ${
                          isActive
                            ? `bg-${conf.color}-500/20 border-${conf.color}-500 text-${conf.color}-400 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                            : 'bg-[#0a0a0a] border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                        }
                    `}
            >
              <conf.icon className="w-3 h-3" />
              {zone}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Wallet Balance</span>
              <CreditCard className="w-3 h-3 text-gray-600" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {balances[zoneConfig.currency]
                ? balances[zoneConfig.currency].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                : '0.00'}{' '}
              <span className={`text-sm text-${zoneConfig.color}-500`}>{zoneConfig.currency}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(item => (
            <NftCard
              key={item.id}
              item={item}
              color={zoneConfig.color}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <NftInspector
          item={selectedItem}
          color={zoneConfig.color}
          onClose={() => setSelectedItem(null)}
          onBuy={handleBuy}
          isBuying={isBuying}
        />
      )}
    </div>
  )
}
