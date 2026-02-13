import React, { useEffect, useState } from 'react';
import { Terminal, Activity, Box, Database, Radio, RefreshCw, Cpu, Layers, Wifi, WifiOff } from 'lucide-react';
import { fetchChainIntel, ChainData } from '../services/notaryService';

export const SystemTerminal: React.FC = () => {
  const [data, setData] = useState<ChainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'network' | 'contracts' | 'feed'>('network');

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchChainIntel();
      setData(result);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Refresh every 15s
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
      return (
          <div className="h-full min-h-[350px] bg-[#050505] border border-white/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-xlayer-green/5 animate-pulse"></div>
               <RefreshCw className="w-8 h-8 text-xlayer-green animate-spin mb-2" />
               <div className="text-xs font-mono text-gray-400">ESTABLISHING UPLINK...</div>
          </div>
      );
  }

  if (error || !data) {
      return (
        <div className="h-full min-h-[350px] bg-[#050505] border border-red-900/30 rounded-xl flex flex-col items-center justify-center p-6 text-center">
            <Activity className="w-8 h-8 text-red-500 mb-2" />
            <div className="text-sm font-bold text-white">CONNECTION FAILURE</div>
            <div className="text-xs text-gray-500 mt-1 mb-4">RPC Gateway Unreachable</div>
            <button onClick={loadData} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white">
                RETRY HANDSHAKE
            </button>
        </div>
      );
  }

  const isSimulated = data.isSimulated;

  return (
    <div className="h-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden font-mono flex flex-col relative group">
       
       {/* Decorative Background */}
       <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent ${isSimulated ? 'via-yellow-500' : 'via-xlayer-green'} to-transparent opacity-30`}></div>
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

       {/* Header */}
       <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/5 relative z-10">
          <div className="flex items-center gap-2">
             <Terminal className={`w-4 h-4 ${isSimulated ? 'text-yellow-500' : 'text-xlayer-green'}`} />
             <span className="font-bold text-xs text-gray-200 tracking-wider">AOXC INTELLIGENCE</span>
          </div>
          <div className="flex items-center gap-2">
             <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${isSimulated ? 'bg-yellow-900/20 border-yellow-500/20' : 'bg-green-900/20 border-green-500/20'}`}>
                {isSimulated ? (
                    <>
                        <WifiOff className="w-3 h-3 text-yellow-500" />
                        <span className="text-[9px] font-bold text-yellow-500">SIMULATED</span>
                    </>
                ) : (
                    <>
                        <Wifi className="w-3 h-3 text-green-500" />
                        <span className="text-[9px] font-bold text-green-400">ONLINE</span>
                    </>
                )}
             </div>
             <button onClick={loadData} className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-white transition-colors">
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
             </button>
          </div>
       </div>

       {/* Tabs */}
       <div className="flex border-b border-white/5 bg-[#080808]">
          <button 
            onClick={() => setActiveTab('network')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'network' ? (isSimulated ? 'border-yellow-500 text-white bg-white/5' : 'border-xlayer-green text-white bg-white/5') : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Network
          </button>
          <button 
            onClick={() => setActiveTab('contracts')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'contracts' ? (isSimulated ? 'border-yellow-500 text-white bg-white/5' : 'border-xlayer-green text-white bg-white/5') : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Contracts
          </button>
          <button 
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'feed' ? (isSimulated ? 'border-yellow-500 text-white bg-white/5' : 'border-xlayer-green text-white bg-white/5') : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Live Feed
          </button>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-y-auto p-4 relative z-10 scrollbar-thin">
          
          {/* NETWORK TAB */}
          {activeTab === 'network' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-[#111] rounded-lg p-3 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded text-blue-400"><Box size={16} /></div>
                          <div>
                              <div className="text-[10px] text-gray-500 uppercase">Block Height</div>
                              <div className="text-lg font-bold text-white tracking-tighter">#{data.block?.number.toLocaleString()}</div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-[#111] rounded-lg p-3 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/10 rounded text-purple-400"><Database size={16} /></div>
                          <div>
                              <div className="text-[10px] text-gray-500 uppercase">Block Time</div>
                              <div className="text-sm font-bold text-white">{data.block?.time}</div>
                          </div>
                      </div>
                  </div>

                   <div className="bg-[#111] rounded-lg p-3 border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase mb-1">Block Hash</div>
                      <div className="text-[10px] text-gray-400 font-mono break-all leading-tight bg-black p-2 rounded border border-white/5">
                        {data.block?.hash}
                      </div>
                   </div>
              </div>
          )}

          {/* CONTRACTS TAB */}
          {activeTab === 'contracts' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {data.tokens.map((token, idx) => (
                      <div key={idx} className={`bg-[#111] rounded-lg p-3 border border-white/5 hover:${isSimulated ? 'border-yellow-500/30' : 'border-xlayer-green/30'} transition-colors group`}>
                          <div className="flex justify-between items-start mb-2">
                              <div className="font-bold text-white text-sm flex items-center gap-2">
                                  {token.name}
                                  <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{token.symbol}</span>
                              </div>
                              <Layers size={14} className={`text-gray-600 group-hover:${isSimulated ? 'text-yellow-500' : 'text-xlayer-green'} transition-colors`} />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                                <div>
                                    <div className="text-[9px] text-gray-500 uppercase">Total Supply</div>
                                    <div className="text-xs font-mono text-gray-300">
                                        {parseFloat(token.supply).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                                <div>
                                     <div className="text-[9px] text-gray-500 uppercase">Contract</div>
                                     <div className="text-[9px] font-mono text-gray-500 truncate">{token.address}</div>
                                </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {/* FEED TAB */}
          {activeTab === 'feed' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {data.events.length === 0 ? (
                      <div className="text-center text-xs text-gray-500 py-4">No recent activity detected.</div>
                  ) : (
                      data.events.map((event, idx) => (
                          <div key={idx} className="flex gap-3 p-2 rounded hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                              <div className="flex-shrink-0 mt-1">
                                  <Radio size={12} className={`${isSimulated ? 'text-yellow-500' : 'text-xlayer-green'} animate-pulse`} />
                              </div>
                              <div className="min-w-0">
                                  <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                      <span className="text-white font-bold">Block {event.block}</span>
                                      <span className="text-gray-600">•</span>
                                      <span>TX Detected</span>
                                  </div>
                                  <div className="text-[9px] text-gray-500 font-mono truncate w-full mt-0.5 opacity-70">
                                      {event.tx}
                                  </div>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          )}
       </div>

       {/* Footer */}
       <div className="bg-[#080808] border-t border-white/5 p-2 px-3 flex justify-between items-center text-[9px] text-gray-500">
          <div className="flex items-center gap-1">
             <Cpu size={10} />
             <span>X LAYER RPC</span>
          </div>
          <div className="font-mono">LATENCY: {isSimulated ? '0ms (Virtual)' : '42ms'}</div>
       </div>
    </div>
  );
};
