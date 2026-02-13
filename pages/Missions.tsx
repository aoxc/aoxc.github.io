import React, { useState } from 'react';
import { Crosshair, Shield, Zap, Clock, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Omega';
  duration: string;
  reward: string;
  xp: number;
  description: string;
  status: 'Ready' | 'In Progress' | 'Completed';
  requirements: string;
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Operation Deep Scan",
    difficulty: "Low",
    duration: "20m",
    reward: "50 AOXC",
    xp: 100,
    description: "X Layer ağındaki şüpheli likidite havuzlarını tara ve raporla.",
    status: "Ready",
    requirements: "Level 1 Clearance"
  },
  {
    id: 2,
    title: "Void Defense Protocol",
    difficulty: "High",
    duration: "4h",
    reward: "250 AOXC + NFT",
    xp: 500,
    description: "Quasar Sentry modülünü siber saldırılara karşı 4 saat boyunca koru.",
    status: "Ready",
    requirements: "Quasar Badge"
  },
  {
    id: 3,
    title: "Bridge Stabilization",
    difficulty: "Medium",
    duration: "1h",
    reward: "120 AOXC",
    xp: 250,
    description: "Centaurus köprüsündeki volatiliteyi dengelemek için likidite sağla.",
    status: "In Progress",
    requirements: "500 USDC Staked"
  }
];

export const Missions: React.FC = () => {
  const [missions, setMissions] = useState(MOCK_MISSIONS);

  const startMission = (id: number) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: 'In Progress' } : m));
    alert("Filo göreve gönderildi! Zincir onayı bekleniyor...");
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Low': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'High': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'Omega': return 'text-red-500 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <Crosshair className="text-red-500 w-8 h-8" />
            GÖREV KOMUTA MERKEZİ
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Filo operasyonlarına katıl, AOXC ödülleri kazan ve Liyakat (Reputation) puanını yükselt.
            Tamamlanan her görev, bir sonraki rütbe için referans sayılır.
          </p>
        </div>
        
        <div className="flex gap-4 mt-6">
            <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-gray-300">Enerji: %98</span>
            </div>
            <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold text-gray-300">Hazır Gemiler: 4/7</span>
            </div>
        </div>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <div key={mission.id} className="group relative bg-[#0e0e0e] border border-white/10 hover:border-red-500/30 rounded-xl p-1 transition-all hover:-translate-y-1">
            {/* Status Indicator Stripe */}
            <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${mission.status === 'In Progress' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>

            <div className="bg-[#121212] rounded-lg p-5 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getDifficultyColor(mission.difficulty)}`}>
                        {mission.difficulty} INTEL
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {mission.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-1">
                    {mission.description}
                </p>

                {/* Rewards Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                        <div className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Süre
                        </div>
                        <div className="text-sm font-mono text-white font-bold">{mission.duration}</div>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                         <div className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> Ödül
                        </div>
                        <div className="text-sm font-mono text-yellow-400 font-bold">{mission.reward}</div>
                    </div>
                </div>

                {/* Requirements Warning */}
                <div className="mb-4 flex items-center gap-2 text-[10px] text-gray-500">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Gereksinim: {mission.requirements}</span>
                </div>

                {/* Action Button */}
                <button 
                    onClick={() => startMission(mission.id)}
                    disabled={mission.status === 'In Progress'}
                    className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all relative overflow-hidden
                        ${mission.status === 'In Progress' 
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 cursor-wait'
                            : 'bg-white/5 hover:bg-red-600 text-white border border-white/10 hover:border-red-500'
                        }
                    `}
                >
                    {mission.status === 'In Progress' ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
                            DEVAM EDİYOR...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            FİLOYU GÖNDER
                        </span>
                    )}
                </button>
            </div>
          </div>
        ))}

        {/* Locked Mission Placeholder */}
        <div className="relative bg-[#0e0e0e] border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <div className="text-2xl">🔒</div>
            </div>
            <h3 className="text-white font-bold">Classified Operation</h3>
            <p className="text-xs text-gray-500 mt-2">Bu görevin kilidini açmak için "Admiral" rütbesine ulaş.</p>
        </div>
      </div>
    </div>
  );
};
