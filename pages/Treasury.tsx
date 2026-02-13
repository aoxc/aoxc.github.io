import React from 'react';
import { Landmark, PieChart, ArrowUpRight, Wallet, TrendingUp, DollarSign, RefreshCw, Layers } from 'lucide-react';
import { FLEET_MODULES } from '../constants';
import { AOXCLogo } from '../components/AOXCLogo';

export const Treasury: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats */}
          <div className="lg:col-span-2 bg-[#0B0C15] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>
             
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/10 rounded-xl">
                    <Landmark className="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-white">DAO Hazinesi (Master Vault)</h2>
                    <p className="text-xs text-gray-400">Tüm gemi tokenlerinin teminat (Collateral) merkezi.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Toplam Konsolide Değer</div>
                    <div className="text-4xl font-mono font-bold text-white">$42,500,000.00</div>
                    <div className="flex items-center gap-1 text-green-400 text-xs mt-2 font-bold bg-green-500/10 px-2 py-1 rounded w-fit">
                        <TrendingUp className="w-3 h-3" /> +$1.2M (Bu hafta)
                    </div>
                </div>
                <div className="space-y-3">
                     <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Yönetim (AOXC) Rezervi</span>
                        <span className="text-white font-bold">%55</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-xlayer-green w-[55%]"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Likit (USDC/ETH)</span>
                        <span className="text-white font-bold">%25</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[25%]"></div>
                    </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Gemi Tokenleri (AQL, PGS...)</span>
                        <span className="text-white font-bold">%20</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[20%]"></div>
                    </div>
                </div>
             </div>
          </div>

          {/* AOXC Parity Info */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 opacity-10">
                <AOXCLogo className="w-40 h-40" />
             </div>
             
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <RefreshCw className="w-5 h-5 text-gray-400" /> Token Ekonomisi
             </h3>
             
             <p className="text-xs text-gray-400 mb-6 relative z-10">
                AOXC, ekosistemdeki tüm yerel gemi tokenleri için temel (base) rezerv para birimidir. Gemi tokenleri AOXC paritesi üzerinden işlem görür.
             </p>

             <div className="space-y-3 relative z-10">
                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-xs text-gray-400">Base Token</span>
                    <span className="text-sm font-bold text-xlayer-green">AOXC (Governance)</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-xs text-gray-400">Peg Status</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> HEALTHY
                    </span>
                </div>
             </div>
          </div>
       </div>

       <h3 className="text-xl font-display font-bold text-white flex items-center gap-2 mt-8">
          <Layers className="text-xlayer-green" />
          FİLO TOKEN HAZİNELERİ & PARİTELER
       </h3>

       {/* Fleet Treasuries Breakdown */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET_MODULES.map((module) => (
                <div key={module.id} className="bg-[#0e0e0e] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all group">
                    
                    {/* Token Header */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-${module.themeColor}-500/10 flex items-center justify-center border border-${module.themeColor}-500/20 group-hover:scale-110 transition-transform`}>
                                <span className={`font-bold text-${module.themeColor}-400 text-xs`}>{module.localToken.symbol}</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">{module.localToken.name}</h4>
                                <div className="text-[10px] text-gray-500 font-mono">{module.name}</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                        
                        {/* Exchange Rate */}
                        <div className="flex justify-between items-center bg-[#151515] p-2 rounded lg:rounded-lg">
                             <div className="text-[10px] text-gray-400 uppercase font-bold">Parite (AOXC)</div>
                             <div className="text-right">
                                <div className="text-sm font-mono font-bold text-white">1 {module.localToken.symbol} = {module.localToken.price.toFixed(2)} AOXC</div>
                                <div className={`text-[9px] ${module.localToken.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {module.localToken.change24h > 0 ? '+' : ''}{module.localToken.change24h}% (24h)
                                </div>
                             </div>
                        </div>

                        {/* Treasury Size */}
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-white/5 rounded text-gray-400">
                                <DollarSign className="w-4 h-4" />
                             </div>
                             <div>
                                 <div className="text-[9px] text-gray-500 uppercase">Gemi Hazinesi</div>
                                 <div className="text-sm font-bold text-white">{module.treasury.amount} <span className="text-gray-500 text-xs">{module.treasury.asset}</span></div>
                             </div>
                         </div>
                    </div>
                </div>
            ))}
       </div>
    </div>
  );
};
