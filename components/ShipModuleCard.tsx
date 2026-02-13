import React from 'react';
import * as Icons from 'lucide-react';
import { ShipModule } from '../types';

// Helper to map color names to Tailwind classes dynamically
const getColorClasses = (color: string) => {
  const map: Record<string, any> = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      gradient: 'from-emerald-900 to-black',
      stroke: '#34d399'
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
      gradient: 'from-violet-900 to-black',
      stroke: '#a78bfa'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      gradient: 'from-amber-900 to-black',
      stroke: '#fbbf24'
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
      gradient: 'from-rose-900 to-black',
      stroke: '#fb7185'
    },
    fuchsia: {
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/30',
      text: 'text-fuchsia-400',
      glow: 'shadow-[0_0_20px_rgba(217,70,239,0.2)]',
      gradient: 'from-fuchsia-900 to-black',
      stroke: '#e879f9'
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
      gradient: 'from-orange-900 to-black',
      stroke: '#fb923c'
    },
    cyan: { // Fallback/Default
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
        gradient: 'from-cyan-900 to-black',
        stroke: '#22d3ee'
    }
  };
  return map[color] || map.cyan;
};

// Generates a unique technical "NFT-like" SVG background based on the ship
const ShipEmblemSVG: React.FC<{ color: string, className?: string }> = ({ color, className }) => {
    const c = getColorClasses(color);
    return (
        <svg viewBox="0 0 100 100" className={`${className} overflow-visible`}>
            <defs>
                <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            {/* Rotating Outer Ring */}
            <g className="origin-center animate-spin-slow opacity-30">
                <circle cx="50" cy="50" r="45" fill="none" stroke={c.stroke} strokeWidth="1" strokeDasharray="10 5" />
            </g>
             {/* Reverse Rotating Inner Ring */}
             <g className="origin-center animate-reverse-spin opacity-50">
                <path d="M50 10 L85 30 V70 L50 90 L15 70 V30 Z" fill="none" stroke={c.stroke} strokeWidth="1" />
            </g>
            {/* Core Pulse */}
            <circle cx="50" cy="50" r="20" fill={c.stroke} fillOpacity="0.1" className="animate-pulse" filter={`url(#glow-${color})`} />
        </svg>
    );
};

export const ShipModuleCard: React.FC<{ ship: ShipModule }> = ({ ship }) => {
  // @ts-ignore
  const IconComponent = Icons[ship.icon] || Icons.Box;
  const colors = getColorClasses(ship.themeColor);

  return (
    <div className={`relative group overflow-hidden rounded-2xl bg-[#0e0e0e] border ${colors.border} transition-all duration-500 hover:-translate-y-2 hover:${colors.glow}`}>
      
      {/* Background Gradient Mesh */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

      {/* Content Container */}
      <div className="relative z-10 p-5 flex flex-col h-full">
        
        {/* Header: Status & ID */}
        <div className="flex justify-between items-start mb-4">
            <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${colors.border} ${colors.text} bg-black/50`}>
                {ship.status}
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-500 font-mono">SHIP ID</span>
                <span className="text-[10px] text-gray-300 font-mono uppercase">#{ship.id.substring(0,4)}</span>
            </div>
        </div>

        {/* Central Visual: Logo/NFT */}
        <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <ShipEmblemSVG color={ship.themeColor} className="absolute inset-0 w-full h-full" />
                <div className={`relative z-10 p-2 rounded-lg bg-black/60 backdrop-blur-sm border ${colors.border} ${colors.text}`}>
                    <IconComponent className="w-8 h-8" />
                </div>
            </div>
            <div>
                <h3 className={`text-xl font-display font-bold text-white tracking-wide group-hover:${colors.text} transition-colors`}>
                    {ship.name}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{ship.role}</p>
            </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed mb-6 h-12 line-clamp-3">
            {ship.description}
        </p>

        {/* Treasury & Token Stats (Grid) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-black/40 rounded-lg p-2 border border-white/5">
                <div className="text-[9px] text-gray-500 uppercase">Treasury</div>
                <div className="text-sm font-bold text-white flex items-center gap-1">
                    <Icons.Landmark className="w-3 h-3 text-gray-400" />
                    {ship.treasury.amount}
                </div>
                <div className="text-[8px] text-gray-500">{ship.treasury.asset} Asset</div>
            </div>
            <div className="bg-black/40 rounded-lg p-2 border border-white/5">
                <div className="text-[9px] text-gray-500 uppercase">Local Token</div>
                <div className={`text-sm font-bold ${colors.text}`}>
                    {ship.localToken.symbol}
                </div>
                <div className="flex items-center gap-1 text-[8px]">
                    <span className="text-white">{ship.localToken.price.toFixed(2)} AOXC</span>
                    <span className={ship.localToken.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {ship.localToken.change24h > 0 ? '+' : ''}{ship.localToken.change24h}%
                    </span>
                </div>
            </div>
        </div>

        {/* Action Footer */}
        <div className="mt-auto flex items-center gap-2">
            <button className={`flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 group/btn`}>
                <Icons.FileText className="w-3 h-3 text-gray-500 group-hover/btn:text-white" />
                <span>Kontrat</span>
            </button>
            <button className={`flex-1 py-2 rounded-lg ${colors.bg} hover:bg-opacity-20 border ${colors.border} text-xs font-bold ${colors.text} transition-colors flex items-center justify-center gap-2 relative overflow-hidden`}>
                <span className="relative z-10 flex items-center gap-1">
                   <Icons.ArrowRightLeft className="w-3 h-3" />
                   Swap {ship.localToken.symbol}
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
        </div>

      </div>
    </div>
  );
};
