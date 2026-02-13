import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Gem, 
  Activity, 
  ArrowUpRight, 
  Copy,
  ExternalLink,
  Coins,
  Cpu
} from 'lucide-react';
import { AOXCLogo } from './AOXCLogo';
import { getAOXCTokenMetrics, TokenMetrics } from '../services/web3Service';
import { FLEET_MODULES } from '../constants';

export const FlagshipWidget: React.FC = () => {
  const [metrics, setMetrics] = useState<TokenMetrics | null>(null);
  const aoxcData = FLEET_MODULES.find(m => m.id === 'andromeda')?.localToken;

  useEffect(() => {
    getAOXCTokenMetrics().then(setMetrics);
  }, []);

  const copyAddress = () => {
    if (aoxcData?.contractAddress) {
      navigator.clipboard.writeText(aoxcData.contractAddress);
      alert("Kontrat adresi kopyalandı!");
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#080a10] group shadow-2xl">
      {/* --- Background Effects --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* Content Grid */}
      <div className="relative z-10 flex flex-col xl:flex-row h-full">
        
        {/* LEFT COLUMN: Identity & Core Info */}
        <div className="flex-1 p-8 flex flex-col gap-6 border-b xl:border-b-0 xl:border-r border-white/5">
            
            {/* Header / Status Badge */}
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-cyan-300 tracking-widest font-bold uppercase">SYSTEMS NOMINAL</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                    <Cpu className="w-3 h-3" /> CORE v4.0.2
                </div>
            </div>

            {/* Main Title Block */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Visual Reactor */}
                <div className="relative w-24 h-24 flex-shrink-0">
                     <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin-slow"></div>
                     <div className="absolute inset-2 rounded-full border border-cyan-500/20 border-b-white/50 animate-reverse-spin"></div>
                     <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <AOXCLogo collapsed className="w-10 h-10" />
                     </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-3 mb-1">
                        <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter leading-none">
                            ANDROMEDA
                        </h1>
                        <span className="text-xs font-bold text-yellow-500 border border-yellow-500/20 bg-yellow-500/5 px-2 py-0.5 rounded uppercase tracking-wider">Flagship Class</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                        Merkezi Yönetim Çekirdeği ve DAO Karar Mekanizması. Tüm alt filoların (Aquila, Centaurus, Pegasus) senkronizasyonunu sağlar.
                    </p>
                </div>
            </div>

            {/* Token Info Card */}
            <div className="mt-auto bg-[#0a0c14] border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                        <Coins className="w-3.5 h-3.5" /> Token Contract
                    </span>
                    <div className="flex items-center gap-2">
                        <code className="text-[10px] text-cyan-400 font-mono bg-cyan-900/20 px-2 py-0.5 rounded">
                            {aoxcData?.contractAddress ? `${aoxcData.contractAddress.substring(0, 6)}...${aoxcData.contractAddress.substring(38)}` : 'Loading...'}
                        </code>
                        <button onClick={copyAddress} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
                    </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/5 p-4">
                     <div>
                        <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Holders</div>
                        <div className="text-sm font-mono text-white">{metrics ? metrics.holders.toLocaleString() : '...'}</div>
                     </div>
                     <div>
                        <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Transfers</div>
                        <div className="text-sm font-mono text-white">{metrics ? metrics.transfers.toLocaleString() : '...'}</div>
                     </div>
                     <div>
                        <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Total Supply</div>
                        <div className="text-sm font-mono text-white">1.0B</div>
                     </div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Live Statistics Grid */}
        <div className="w-full xl:w-[400px] p-6 bg-black/20 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* 1. Treasury */}
                <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:border-green-500/30 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                            <Gem className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Likit Hazine</div>
                        <div className="text-xl font-display font-bold text-white tracking-tight">$14.2M</div>
                        <div className="text-[10px] text-green-400 font-mono mt-1">+$420k (24h)</div>
                    </div>
                </div>

                {/* 2. Locked */}
                <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:border-yellow-500/30 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform">
                            <Lock className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Kilitli Varlık</div>
                        <div className="text-xl font-display font-bold text-white tracking-tight">$42.8M</div>
                        <div className="text-[10px] text-gray-500 mt-1">Staking & Vesting</div>
                    </div>
                </div>

                {/* 3. Passengers */}
                <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:border-blue-500/30 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Yolcular</div>
                        <div className="text-xl font-display font-bold text-white tracking-tight">8,432</div>
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> 420 Online
                        </div>
                    </div>
                </div>

                {/* 4. Governance */}
                <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:border-xlayer-magenta/30 transition-colors group">
                     <div className="flex justify-between items-start">
                        <div className="p-2 bg-xlayer-magenta/10 rounded-lg text-xlayer-magenta group-hover:scale-110 transition-transform">
                            <Activity className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Oylamalar</div>
                        <div className="text-xl font-display font-bold text-white tracking-tight">3</div>
                        <div className="text-[10px] text-gray-500 mt-1">Karar Bekleniyor</div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};