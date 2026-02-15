import React, { useState } from 'react'
import {
  Wrench,
  Shield,
  Zap,
  Activity,
  AlertTriangle,
  Battery,
  Gauge,
  Hammer,
  RefreshCw
} from 'lucide-react'
import { FLEET_MODULES } from '../constants'

export const FleetEngineering: React.FC = () => {
  const [selectedShip, setSelectedShip] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between bg-[#050505] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Wrench className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              Fleet Engineering
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-1">
              MAINTENANCE DOCK • REPAIR • UPGRADE
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-right hidden md:block">
            <div className="text-[9px] text-gray-500 font-bold uppercase">Drydock Capacity</div>
            <div className="text-sm font-mono font-bold text-white">7 / 7 Ships</div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: SHIP LIST */}
        <div className="lg:col-span-2 space-y-4">
          {FLEET_MODULES.map(ship => {
            const integrity = Math.floor(Math.random() * 30) + 70 // 70-100%
            const isDamaged = integrity < 85

            return (
              <div
                key={ship.id}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 group hover:border-white/20 transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg bg-${ship.themeColor}-500/10 border border-${ship.themeColor}-500/20 flex items-center justify-center shrink-0`}
                >
                  <div className={`w-3 h-3 bg-${ship.themeColor}-500 rounded-full`}></div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center md:text-left">
                  <h3 className="text-white font-bold text-sm uppercase">{ship.name}</h3>
                  <p className="text-[10px] text-gray-500 font-mono">{ship.role}</p>
                </div>

                {/* Status Bars */}
                <div className="flex-1 w-full md:w-auto grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span className="text-gray-500 uppercase">Hull Integrity</span>
                      <span
                        className={`font-bold ${isDamaged ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {integrity}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isDamaged ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${integrity}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span className="text-gray-500 uppercase">Fuel Cell</span>
                      <span className="text-yellow-500 font-bold">45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button
                  className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors 
                                ${isDamaged ? 'bg-red-500 text-white hover:bg-red-400 animate-pulse' : 'bg-white/5 text-gray-400 hover:bg-white/10'}
                            `}
                >
                  {isDamaged ? 'REPAIR REQ.' : 'DIAGNOSTIC'}
                </button>
              </div>
            )
          })}
        </div>

        {/* RIGHT: WORKBENCH */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-blue-500" /> Active Work Order
            </h3>

            <div className="space-y-4">
              <div className="p-3 bg-[#111] rounded border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white">Centaurus Warp Core</span>
                  <span className="text-[9px] text-yellow-500 bg-yellow-900/20 px-1.5 py-0.5 rounded">
                    IN PROGRESS
                  </span>
                </div>
                <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[60%] animate-pulse"></div>
                </div>
                <div className="text-[9px] text-gray-500 mt-1 text-right">ETA: 12m 30s</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                Resource Cost
              </div>
              <div className="flex justify-between text-xs text-white">
                <span>Spare Parts</span>
                <span className="font-mono">120 / 500</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-2xl p-6 flex flex-col items-center text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-sm font-bold text-yellow-500 uppercase">Maintenance Required</h3>
            <p className="text-[10px] text-yellow-200/60 mt-1 leading-relaxed">
              "Fleet Engineering" module shows high wear on logic gates. Schedule a reboot cycle
              soon.
            </p>
            <button className="mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 text-xs font-bold rounded uppercase">
              Schedule Reboot
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
