import React from 'react';

export const AOXCLogo: React.FC<{ className?: string, collapsed?: boolean }> = ({ className, collapsed = false }) => {
  if (collapsed) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={className} aria-label="AOXC Icon">
            <defs>
                <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
                    <stop offset="50%" stopColor="#00FFA3" /> {/* Green */}
                    <stop offset="100%" stopColor="#eab308" /> {/* Yellow */}
                </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="28" fill="#0B0C15" stroke="url(#iconGrad)" strokeWidth="2" />
            <path d="M20 40 L30 20 L40 40" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 450 120" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label="AOXCDAO - X LAYER INSIDE"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        
        <linearGradient id="gradO" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>

        <linearGradient id="gradX" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#000000" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>

        <linearGradient id="gradC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <linearGradient id="gradDAO" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor="#fb923c" />
           <stop offset="50%" stopColor="#f97316" />
           <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        <linearGradient id="gradBar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Glows */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Void Inner Shadow */}
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
           <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#ffffff" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* --- DECORATIVE TECH ELEMENTS --- */}
      <g opacity="0.4">
          <path d="M 20 20 L 30 10 L 100 10" stroke="#333" strokeWidth="1" fill="none" />
          <rect x="18" y="18" width="4" height="4" fill="#333" />
          <path d="M 330 20 L 320 10 L 250 10" stroke="#333" strokeWidth="1" fill="none" />
          <rect x="328" y="18" width="4" height="4" fill="#333" />
      </g>

      {/* --- MAIN TEXT: AOXCDAO --- */}
      <g transform="translate(10, 80)">
        <text fontFamily="'Rajdhani', sans-serif" fontWeight="800" fontSize="85">
            {/* A - Blue */}
            <tspan x="0" fill="url(#gradA)" filter="url(#glow)">A</tspan>
            
            {/* O - Green */}
            <tspan x="50" fill="url(#gradO)" filter="url(#glow)">O</tspan>
            
            {/* X - Black Void */}
            <tspan x="105" fill="url(#gradX)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">X</tspan>
            
            {/* C - Yellow */}
            <tspan x="155" fill="url(#gradC)" filter="url(#glow)">C</tspan>
            
            {/* DAO - Orange */}
            <tspan x="205" fill="url(#gradDAO)" filter="url(#glow)">D</tspan>
            <tspan x="255" fill="url(#gradDAO)" filter="url(#glow)">A</tspan>
            <tspan x="305" fill="url(#gradDAO)" filter="url(#glow)">O</tspan>
        </text>
      </g>

      {/* --- SLOGAN DECK --- */}
      <g transform="translate(15, 105)">
         {/* Divider Line */}
         <rect x="0" y="-8" width="345" height="1" fill="url(#gradBar)" />
         
         {/* Slogan Text - UPDATED: animate-green-breathing class and wider spacing */}
         <text 
            x="172.5" 
            y="10" 
            fontFamily="'Rajdhani', sans-serif" 
            fontWeight="700" 
            fontSize="15" 
            className="animate-green-breathing"
            letterSpacing="0.8em"
            textAnchor="middle"
         >
            X LAYER INSIDE
         </text>
         
         {/* Tech Dots */}
         <circle cx="0" cy="5" r="2" fill="#00FFA3" className="animate-pulse" />
         <circle cx="345" cy="5" r="2" fill="#00FFA3" className="animate-pulse" />
      </g>
    </svg>
  );
};