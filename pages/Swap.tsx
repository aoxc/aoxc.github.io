import React, { useState } from 'react';
import { ArrowDown, Settings, Info, Wallet } from 'lucide-react';
import { executeSwap } from '../services/web3Service';

export const Swap: React.FC = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    if (!fromAmount) return;
    setIsSwapping(true);
    await executeSwap("USDC", "AOXC", fromAmount);
    setIsSwapping(false);
    alert("Takas işlemi X Layer ağı üzerinden başlatıldı.");
  };

  return (
    <div className="flex justify-center items-start pt-10">
      <div className="w-full max-w-[480px] bg-[#0A0A0A] border border-white/10 rounded-3xl p-1 shadow-2xl relative">
        {/* Container Inner */}
        <div className="bg-[#121212] rounded-[22px] p-6">
            
            <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sans font-semibold text-white">Takas</h2>
            <div className="flex gap-2">
                <button className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors">
                    <Info className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
            </div>

            {/* Input Field */}
            <div className="bg-[#050505] rounded-2xl p-4 border border-white/5 mb-1 group focus-within:border-xlayer-green transition-colors">
                <div className="flex justify-between text-xs text-gray-400 mb-3">
                    <span className="font-medium">Ödenen</span>
                    <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        <span>2,400.00</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                        type="number" 
                        placeholder="0.0" 
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="bg-transparent text-3xl font-medium text-white outline-none w-full placeholder-gray-700 font-sans"
                    />
                    <button className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 transition-colors shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                        <span className="font-bold text-sm text-white">USDC</span>
                    </button>
                </div>
                <div className="text-right text-xs text-gray-500 mt-2">~$0.00</div>
            </div>

            {/* Switch Button */}
            <div className="h-2 relative z-10 flex justify-center items-center">
                <button className="bg-[#1a1a1a] border-2 border-[#121212] p-2 rounded-full hover:rotate-180 transition-all duration-300 text-xlayer-green shadow-md">
                    <ArrowDown className="w-4 h-4" />
                </button>
            </div>

            {/* Output Field */}
            <div className="bg-[#050505] rounded-2xl p-4 border border-white/5 mt-1 group focus-within:border-xlayer-green transition-colors">
                <div className="flex justify-between text-xs text-gray-400 mb-3">
                    <span className="font-medium">Alınan (Tahmini)</span>
                    <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        <span>1,450.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                        type="text" 
                        placeholder="0.0" 
                        readOnly
                        value={fromAmount ? (parseFloat(fromAmount) * 4.2).toFixed(2) : ''}
                        className="bg-transparent text-3xl font-medium text-white outline-none w-full placeholder-gray-700 font-sans"
                    />
                    <button className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 transition-colors shrink-0">
                        <div className="w-6 h-6 rounded-full bg-xlayer-green flex items-center justify-center text-[10px] font-bold text-black">A</div>
                        <span className="font-bold text-sm text-white">AOXC</span>
                    </button>
                </div>
                 <div className="text-right text-xs text-gray-500 mt-2">~$-.--</div>
            </div>

            {/* Price Accordion */}
            <div className="mt-4 px-3 py-3 border border-white/5 rounded-xl flex items-center justify-between text-xs text-gray-400">
                <span className="font-medium">Kur</span>
                <span className="flex items-center gap-1 text-white">
                    1 USDC = 4.20 AOXC <Info className="w-3 h-3 text-gray-500" />
                </span>
            </div>

            {/* Action Button - OKX Green Pill Style */}
            <button 
                onClick={handleSwap}
                disabled={isSwapping}
                className="w-full mt-6 bg-xlayer-green hover:bg-[#00cc82] text-black font-bold py-4 rounded-full transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-sans text-lg tracking-wide shadow-[0_0_20px_rgba(0,255,163,0.15)]"
            >
                {isSwapping ? 'Takas Onaylanıyor...' : 'Takas Yap'}
            </button>
        </div>
        
        {/* Partner Badge */}
        <div className="mt-6 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Powered by Aquila Liquidity</span>
        </div>
      </div>
    </div>
  );
};