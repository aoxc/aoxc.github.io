import React, { useEffect, useState } from 'react';
import { UserCircle, Shield, Award, Activity, Hash, Share2 } from 'lucide-react';
import { UserProfile } from '../types';
import { connectWallet } from '../services/web3Service';
import { MeritBadge } from '../components/MeritBadge';
import { FLEET_MODULES } from '../constants';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // In a real app, this would come from a global context or hook
    connectWallet().then(setUser);
  }, []);

  if (!user) return <div className="text-center p-10 text-gray-500">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
        <div className="bg-[#0B0C15]/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-600 relative">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                         <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover opacity-80" />
                    </div>
                    {/* Admiral Badge Overlay */}
                    <div className="absolute -bottom-2 -right-2">
                        <MeritBadge tier="ADMIRAL" className="w-12 h-12" />
                    </div>
                </div>
                
                <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                        <h2 className="text-3xl font-display font-bold text-white">Komutan Shepard</h2>
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                            Fleet Admiral
                        </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-mono text-sm mb-4">
                        <Hash className="w-4 h-4" />
                        <span>0x71C...9A23</span>
                    </div>
                    
                    <div className="flex gap-4 justify-center md:justify-start">
                        <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                            <div className="text-xs text-gray-500 uppercase">Liyakat (Rep)</div>
                            <div className="text-xl font-bold text-cyan-400">850</div>
                        </div>
                         <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                            <div className="text-xs text-gray-500 uppercase">Toplam AOXC</div>
                            <div className="text-xl font-bold text-white">1,450.50</div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NFT Merit Wall */}
             <div className="bg-[#0B0C15]/60 border border-white/10 rounded-2xl p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                        <Award className="text-yellow-400" />
                        Liyakat Rozetleri (SBT)
                    </h3>
                    <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white">
                        <Share2 className="w-4 h-4" />
                    </button>
                 </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {user.badges.map((badge) => {
                        const ship = FLEET_MODULES.find(m => m.id === badge.shipId);
                        return (
                            <div key={badge.id} className="aspect-square bg-gradient-to-b from-white/5 to-black rounded-xl border border-white/5 flex flex-col items-center justify-center p-2 relative group cursor-pointer hover:border-cyan-500/30 transition-all">
                                <MeritBadge tier={badge.tier} className="w-16 h-16" />
                                <div className="mt-2 text-[8px] uppercase tracking-wider text-gray-500 text-center">{ship?.name.split(' ')[0]}</div>
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="text-[10px] text-gray-400">Token ID</div>
                                        <div className="text-xs font-mono text-cyan-400">#{badge.tokenId}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Empty Slots placeholder */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square border border-dashed border-white/10 rounded-xl flex items-center justify-center">
                            <span className="text-[10px] text-gray-700 uppercase font-bold">Kilitli</span>
                        </div>
                    ))}
                </div>
             </div>

             <div className="bg-[#0B0C15]/60 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="text-green-400" />
                    Kimlik & Yetkiler
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Role Authority</span>
                        <span className="text-white text-sm font-medium">Level 4 Clearance</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-gray-400 text-sm">IdentityRegistry Durumu</span>
                        <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Doğrulanmış (KYC)
                        </span>
                    </div>
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-gray-400 text-sm">DAO Oy Hakkı</span>
                        <span className="text-white text-sm font-medium">Aktif</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Aktif Görev</span>
                        <span className="text-cyan-400 text-sm font-medium">Operation Centaurus</span>
                    </div>
                </div>
             </div>
        </div>
    </div>
  );
};