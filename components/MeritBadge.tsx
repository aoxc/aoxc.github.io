import React from 'react';
import { RankTier } from '../types';
import { Hexagon, Star, Shield, Award, Anchor } from 'lucide-react';

interface MeritBadgeProps {
  tier: RankTier;
  className?: string;
  showGlow?: boolean;
}

export const MeritBadge: React.FC<MeritBadgeProps> = ({ tier, className = "w-16 h-16", showGlow = true }) => {
  
  const getTierStyles = () => {
    switch (tier) {
      case 'ADMIRAL':
        return {
          gradient: "from-cyan-400 via-blue-500 to-purple-600",
          border: "stroke-cyan-300",
          glow: "shadow-[0_0_30px_rgba(34,211,238,0.6)]",
          icon: <Anchor className="w-1/2 h-1/2 text-white drop-shadow-md" />,
          label: "ADMIRAL"
        };
      case 'CAPTAIN':
        return {
          gradient: "from-red-500 via-orange-500 to-yellow-500",
          border: "stroke-orange-300",
          glow: "shadow-[0_0_25px_rgba(249,115,22,0.5)]",
          icon: <Shield className="w-1/2 h-1/2 text-white drop-shadow-md" />,
          label: "CPT"
        };
      case 'GOLD':
        return {
          gradient: "from-yellow-300 via-yellow-500 to-amber-600",
          border: "stroke-yellow-200",
          glow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]",
          icon: <Star className="w-1/2 h-1/2 text-white fill-white/50" />,
          label: "GOLD"
        };
      case 'SILVER':
        return {
          gradient: "from-gray-300 via-gray-400 to-slate-500",
          border: "stroke-gray-300",
          glow: "shadow-[0_0_20px_rgba(148,163,184,0.4)]",
          icon: <Award className="w-1/2 h-1/2 text-white" />,
          label: "SLVR"
        };
      case 'BRONZE':
        return {
          gradient: "from-orange-800 via-amber-900 to-yellow-900",
          border: "stroke-amber-700",
          glow: "shadow-[0_0_15px_rgba(120,53,15,0.4)]",
          icon: <Hexagon className="w-1/2 h-1/2 text-amber-200" />,
          label: "BRNZ"
        };
      default:
        return {
            gradient: "from-gray-700 to-gray-900",
            border: "stroke-gray-600",
            glow: "",
            icon: null,
            label: "N/A"
        };
    }
  };

  const styles = getTierStyles();

  return (
    <div className={`relative flex items-center justify-center aspect-square ${className} ${showGlow ? styles.glow : ''} rounded-full transition-transform hover:scale-110 duration-300`}>
      {/* SVG Background Layer */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-xl">
        <defs>
          <linearGradient id={`grad-${tier}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {/* We map generic colors to SVG stops roughly */}
            <stop offset="0%" stopColor="var(--tw-gradient-from, #555)" style={{ stopColor: tier === 'ADMIRAL' ? '#22d3ee' : tier === 'CAPTAIN' ? '#ef4444' : tier === 'GOLD' ? '#fde047' : tier === 'SILVER' ? '#cbd5e1' : '#92400e' }} />
            <stop offset="100%" stopColor="var(--tw-gradient-to, #000)" style={{ stopColor: tier === 'ADMIRAL' ? '#9333ea' : tier === 'CAPTAIN' ? '#eab308' : tier === 'GOLD' ? '#d97706' : tier === 'SILVER' ? '#64748b' : '#451a03' }} />
          </linearGradient>
        </defs>
        
        {/* Outer Hexagon Border */}
        <path 
          d="M50 5 L93.3 30 V70 L50 95 L6.7 70 V30 Z" 
          fill="none" 
          stroke="url(#grad-tier)" // Simplified for demo, ideally match state
          strokeWidth="4"
          className={`${styles.border} opacity-50`}
        />
        
        {/* Inner Filled Hexagon */}
        <path 
          d="M50 10 L89 32.5 V67.5 L50 90 L11 67.5 V32.5 Z" 
          fill={`url(#grad-${tier})`}
          className="opacity-90"
        />
      </svg>

      {/* Icon Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {styles.icon}
        <span className="text-[8px] font-display font-bold text-white tracking-widest mt-1 drop-shadow-md">
            {styles.label}
        </span>
      </div>
      
      {/* Shininess Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/20 to-transparent opacity-30 rounded-full pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};