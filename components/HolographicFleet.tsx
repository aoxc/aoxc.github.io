import React, { useState } from 'react'
import {
  Cpu,
  ArrowRightLeft,
  Network,
  Eye,
  ShieldAlert,
  Box,
  Scale,
  ChevronRight,
  ExternalLink,
  Activity
} from 'lucide-react'
import { ShipModule, PageView } from '../types'
import { useLanguage } from '../contexts/LanguageContext'

// Icon Map
const ICON_MAP: Record<string, any> = {
  Cpu: Cpu,
  ArrowRightLeft: ArrowRightLeft,
  Network: Network,
  Eye: Eye,
  ShieldAlert: ShieldAlert,
  Box: Box,
  Scale: Scale
}

interface HolographicFleetProps {
  ships: ShipModule[]
  setPage: (page: PageView) => void
}

export const HolographicFleet: React.FC<HolographicFleetProps> = ({ ships, setPage }) => {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleNavigate = (id: string) => {
    switch (id) {
      case 'andromeda':
        setPage(PageView.GOVERNANCE)
        break
      case 'aquila':
        setPage(PageView.SWAP)
        break
      case 'centaurus':
        setPage(PageView.BRIDGE)
        break
      case 'pegasus':
        setPage(PageView.ORACLE)
        break
      case 'quasar':
        setPage(PageView.SECURITY)
        break
      case 'virgo':
        setPage(PageView.VIRGO)
        break
      case 'sombrero':
        setPage(PageView.SENTINEL)
        break
      default:
        setPage(PageView.DASHBOARD)
    }
  }

  return (
    <div className="w-full overflow-x-auto pb-8 pt-4 scrollbar-thin">
      <div className="flex gap-6 min-w-max px-4">
        {ships
          .filter(s => s.id !== 'andromeda')
          .map(ship => {
            const Icon = ICON_MAP[ship.icon] || Activity
            const isActive = activeId === ship.id

            // Dynamic translation key based on ID
            const descKey = `desc_${ship.id}` as keyof typeof t
            const description = t(descKey as any) || ship.description

            return (
              <div
                key={ship.id}
                onMouseEnter={() => setActiveId(ship.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`relative w-[280px] h-[320px] transition-all duration-500 perspective-1000 group cursor-pointer
                ${isActive ? 'scale-105 z-10' : 'scale-100 opacity-90'}
              `}
              >
                {/* HOLO CARD CONTAINER */}
                <div
                  className={`absolute inset-0 bg-[#080808] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl
                 ${isActive ? `border-${ship.themeColor}-500/50 shadow-[0_0_30px_rgba(var(--color-${ship.themeColor}),0.3)]` : ''}
              `}
                >
                  {/* Background Gradient & Grid */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-${ship.themeColor}-900/20 to-black opacity-50`}
                  ></div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

                  {/* Top Status Bar */}
                  <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 border-b border-white/5 bg-black/20 backdrop-blur-sm">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest text-${ship.themeColor}-400`}
                    >
                      {ship.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-${ship.themeColor}-500 animate-pulse`}
                      ></div>
                    </div>
                  </div>

                  {/* Main Content (Center) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pt-12 z-10 transition-all duration-500 group-hover:-translate-y-4">
                    {/* Icon Container with Glow */}
                    <div
                      className={`relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-black border border-${ship.themeColor}-500/30 group-hover:border-${ship.themeColor}-500 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                    >
                      <div
                        className={`absolute inset-0 bg-${ship.themeColor}-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all`}
                      ></div>
                      <Icon
                        className={`w-8 h-8 text-${ship.themeColor}-400 group-hover:text-white transition-colors duration-300`}
                      />

                      {/* Rotating Rings */}
                      <div
                        className={`absolute inset-0 border border-${ship.themeColor}-500/20 rounded-full border-dashed animate-spin-slow`}
                      ></div>
                    </div>

                    <h3 className="text-xl font-display font-black text-white uppercase tracking-wider mb-2 text-center">
                      {ship.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">
                      {ship.role}
                    </p>

                    {/* Hidden Description (Reveals on Hover) */}
                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-[10px] text-gray-300 text-center leading-relaxed px-2">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleNavigate(ship.id)}
                      className={`w-full py-3 rounded-xl bg-${ship.themeColor}-600/20 hover:bg-${ship.themeColor}-600/40 border border-${ship.themeColor}-500/50 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all backdrop-blur-md`}
                    >
                      ACCESS NODE <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
