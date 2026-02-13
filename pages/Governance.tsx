import React, { useState } from 'react';
import { submitVote } from '../services/web3Service';
import { MOCK_PROPOSALS } from '../constants';
import { Timer, BarChart3, ExternalLink } from 'lucide-react';

export const Governance: React.FC = () => {
  const [votingOn, setVotingOn] = useState<number | null>(null);

  const handleVote = async (id: number, support: boolean) => {
    setVotingOn(id);
    await submitVote(id, support);
    setVotingOn(null);
    alert("Oyunuz başarıyla zincire işlendi!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Yönetim Konseyi</h1>
          <p className="text-gray-400 text-sm">X Layer ağı üzerinde merkeziyetsiz karar mekanizması.</p>
        </div>
        <div className="flex gap-3">
            <div className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-white text-sm font-bold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-xlayer-magenta" />
                <span>VP: 850</span>
            </div>
            <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors">
                + Teklif Oluştur
            </button>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_PROPOSALS.map((prop) => (
          <div key={prop.id} className="bg-[#0e0e0e] border border-white/5 rounded-xl p-6 hover:border-xlayer-magenta/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border
                        ${prop.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          prop.status === 'Executed' ? 'bg-xlayer-magenta/10 text-xlayer-magenta border-xlayer-magenta/20' : 
                          'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {prop.status}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">ID: {prop.id}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-xlayer-magenta transition-colors">{prop.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">{prop.description}</p>
                
                <div className="flex items-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <span>by <span className="text-gray-300 font-mono">{prop.proposer}</span></span>
                    </div>
                    {prop.status === 'Active' && (
                         <div className="flex items-center gap-1 text-white">
                            <Timer className="w-3 h-3" />
                            <span>Bitiş: {prop.endTime}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                         <ExternalLink className="w-3 h-3" />
                         <span>On-Chain</span>
                    </div>
                </div>
              </div>

              {/* Voting Stats */}
              <div className="w-full md:w-72 bg-[#151515] rounded-lg p-4 border border-white/5">
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white font-bold">Evet</span>
                        <span className="text-gray-400">{(prop.forVotes / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-white" style={{ width: `${(prop.forVotes / (prop.forVotes + prop.againstVotes)) * 100}%` }}></div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white font-bold">Hayır</span>
                        <span className="text-gray-400">{(prop.againstVotes / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-600" style={{ width: `${(prop.againstVotes / (prop.forVotes + prop.againstVotes)) * 100}%` }}></div>
                    </div>
                </div>

                {prop.status === 'Active' && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <button 
                            onClick={() => handleVote(prop.id, true)}
                            disabled={votingOn === prop.id}
                            className="flex items-center justify-center gap-1 bg-white text-black hover:bg-gray-200 py-2 rounded-md text-xs font-bold transition-colors">
                            EVET
                        </button>
                        <button 
                            onClick={() => handleVote(prop.id, false)}
                            disabled={votingOn === prop.id}
                            className="flex items-center justify-center gap-1 bg-transparent hover:bg-white/5 text-white border border-white/20 py-2 rounded-md text-xs font-bold transition-colors">
                            HAYIR
                        </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};