import React, { useState } from 'react';
import { FLEET_MODULES } from '../constants';
import { MeritBadge } from './MeritBadge';
import { RankTier } from '../types';
import { ChevronRight, Trophy, Medal, TrendingUp, Target, Star, Crown } from 'lucide-react';

// Mock Data for Leaders
const COMMAND_ROSTER = [
  { name: "Admiral Shepard", rank: 'ADMIRAL' as RankTier, shipId: 'andromeda', avatar: 'https://i.pravatar.cc/150?u=shepard' },
  { name: "Cpt. Reynolds", rank: 'CAPTAIN' as RankTier, shipId: 'aquila', avatar: 'https://i.pravatar.cc/150?u=reynolds' },
  { name: "Cpt. Adama", rank: 'CAPTAIN' as RankTier, shipId: 'centaurus', avatar: 'https://i.pravatar.cc/150?u=adama' },
  { name: "Cpt. Picard", rank: 'CAPTAIN' as RankTier, shipId: 'pegasus', avatar: 'https://i.pravatar.cc/150?u=picard' },
  { name: "Cpt. Janeway", rank: 'CAPTAIN' as RankTier, shipId: 'quasar', avatar: 'https://i.pravatar.cc/150?u=janeway' },
  { name: "Cpt. Kirk", rank: 'CAPTAIN' as RankTier, shipId: 'virgo', avatar: 'https://i.pravatar.cc/150?u=kirk' },
  { name: "Cpt. Sisko", rank: 'CAPTAIN' as RankTier, shipId: 'sombrero', avatar: 'https://i.pravatar.cc/150?u=sisko' },
];

const TOP_CREW = [
  { name: "Lt. Starbuck", rank: 'GOLD' as RankTier, shipId: 'aquila', points: 1250, missions: 42, avatar: 'https://i.pravatar.cc/150?u=starbuck' },
  { name: "Ens. Crusher", rank: 'SILVER' as RankTier, shipId: 'andromeda', points: 980, missions: 35, avatar: 'https://i.pravatar.cc/150?u=crusher' },
  { name: "Chf. O'Brien", rank: 'BRONZE' as RankTier, shipId: 'pegasus', points: 850, missions: 28, avatar: 'https://i.pravatar.cc/150?u=obrien' },
  { name: "Lt. Data", rank: 'GOLD' as RankTier, shipId: 'quasar', points: 820, missions: 31, avatar: 'https://i.pravatar.cc/150?u=data' },
  { name: "Cmdr. Riker", rank: 'SILVER' as RankTier, shipId: 'andromeda', points: 760, missions: 22, avatar: 'https://i.pravatar.cc/150?u=riker' },
];

export const FleetCommandWidget: React.FC = () => {
  const [selectedShip, setSelectedShip] = useState<string>('all');

  const filteredCrew = selectedShip === 'all' 
    ? TOP_CREW 
    : TOP_CREW.filter(c => c.shipId === selectedShip);

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-xlayer-magenta/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-xl font-display font-black text-white flex items-center gap-2 tracking-wide">
            <Crown className="text-yellow-500 w-6 h-6 fill-yellow-500/20" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              AOXC DAO YÖNETİM
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Canlı Liyakat Sıralaması (On-Chain)
          </p>
        </div>
        
        {/* Ship Filter */}
        <div className="relative">
             <select 
              value={selectedShip} 
              onChange={(e) => setSelectedShip(e.target.value)}
              className="appearance-none bg-[#121212] border border-white/10 text-xs text-white rounded-lg pl-4 pr-8 py-2 outline-none focus:border-xlayer-magenta/50 cursor-pointer hover:bg-white/5 transition-colors uppercase font-bold tracking-wider"
            >
              <option value="all">TÜM FİLO</option>
              {FLEET_MODULES.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-3 h-3 text-gray-500 rotate-90" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: Commanders Grid */}
        <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1">Gemi Komutanları</div>
                <div className="text-[10px] text-gray-600 font-mono">Status: ACTIVE</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMMAND_ROSTER.filter(c => selectedShip === 'all' || c.shipId === selectedShip).map((officer, idx) => {
                 const ship = FLEET_MODULES.find(m => m.id === officer.shipId);
                 const isAdmiral = officer.rank === 'ADMIRAL';
                 
                 return (
                   <div key={idx} className={`relative group flex items-center gap-3 bg-[#121212] hover:bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-xl transition-all duration-300 ${isAdmiral ? 'col-span-1 sm:col-span-2 bg-gradient-to-r from-cyan-900/20 to-transparent border-cyan-500/20' : ''}`}>
                      <div className="relative flex-shrink-0">
                        <MeritBadge tier={officer.rank} className={isAdmiral ? "w-14 h-14" : "w-12 h-12"} />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
                            <img 
                            src={officer.avatar} 
                            alt={officer.name} 
                            className="w-full h-full rounded-full object-cover" 
                            />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className={`font-sans font-bold truncate ${isAdmiral ? 'text-sm text-cyan-300' : 'text-xs text-gray-200'}`}>{officer.name}</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wide flex items-center gap-1 mt-0.5">
                           <span className={isAdmiral ? "text-cyan-600 font-bold" : ""}>{ship?.name}</span>
                        </div>
                        {isAdmiral && <div className="mt-1 inline-block text-[8px] font-bold px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">FLEET ADMIRAL</div>}
                      </div>
                   </div>
                 );
              })}
            </div>
        </div>

        {/* RIGHT COLUMN: The Ranking Leaderboard */}
        <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                 <div className="text-[10px] font-bold text-xlayer-magenta uppercase tracking-widest flex items-center gap-2 border-b border-xlayer-magenta/20 pb-1">
                    <Trophy className="w-3 h-3" />
                    Şubat Ayı Başarı Sıralaması
                 </div>
                 <div className="text-[9px] text-gray-600">Cycle #42</div>
            </div>
           
           <div className="flex flex-col gap-3">
             {filteredCrew.slice(0, 5).map((crew, idx) => {
               const ship = FLEET_MODULES.find(m => m.id === crew.shipId);
               
               // Styling for Top 3
               let rankStyle = "bg-[#121212] border-white/5";
               let rankIcon = <span className="font-mono text-gray-600 text-xs font-bold">#{idx + 1}</span>;
               let glowEffect = "";

               if (idx === 0) {
                   rankStyle = "bg-gradient-to-r from-yellow-900/20 to-[#121212] border-yellow-500/30";
                   rankIcon = <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_#eab308]">1</div>;
                   glowEffect = "shadow-[0_0_20px_rgba(234,179,8,0.05)]";
               } else if (idx === 1) {
                   rankStyle = "bg-gradient-to-r from-gray-800/20 to-[#121212] border-gray-400/30";
                   rankIcon = <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_#d1d5db]">2</div>;
               } else if (idx === 2) {
                   rankStyle = "bg-gradient-to-r from-orange-900/20 to-[#121212] border-orange-500/30";
                   rankIcon = <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_#ea580c]">3</div>;
               }

               return (
                 <div key={idx} className={`relative flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer group ${rankStyle} ${glowEffect}`}>
                    {/* Rank Indicator */}
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 flex justify-center">
                          {rankIcon}
                      </div>
                      
                      <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-black p-0.5 border border-white/10 overflow-hidden">
                              <img src={crew.avatar} alt={crew.name} className="w-full h-full object-cover" />
                          </div>
                          {idx === 0 && (
                              <div className="absolute -top-2 -right-2 text-yellow-400 drop-shadow-md animate-bounce">
                                  <Crown className="w-4 h-4 fill-yellow-400" />
                              </div>
                          )}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-xlayer-magenta transition-colors flex items-center gap-2">
                            {crew.name}
                            {idx === 0 && <span className="text-[8px] bg-yellow-500 text-black px-1 rounded font-black">MVP</span>}
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full`} style={{backgroundColor: idx === 0 ? '#eab308' : '#525252'}}></span>
                            {ship?.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                       <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {crew.points}
                       </div>
                       <div className="flex items-center gap-1 text-[9px] text-gray-500">
                           <Target className="w-3 h-3" />
                           {crew.missions} Görev
                       </div>
                    </div>
                 </div>
               );
             })}
           </div>
           
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>Haftalık Katılım: %84</span>
                </div>
                <button className="hover:text-white transition-colors flex items-center gap-1">
                    Tüm Lider Tablosu <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
