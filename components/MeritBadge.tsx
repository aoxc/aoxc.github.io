import React from 'react'
import { RankTier } from '../types'
import { Hexagon, Star, Shield, Award, Anchor } from 'lucide-react'

export type BadgeVariant =
  | 'CASSIOPEIA'
  | 'BELLATRIX'
  | 'VEGA'
  | 'ANDROMEDA'
  | 'ANTARES'
  | 'RIGEL'
  | 'ARCTURUS'
  | 'POLARIS'
  | 'GENERIC'

interface MeritBadgeProps {
  tier?: RankTier // Optional now, used for border colors
  variant?: BadgeVariant // Specific captain badge
  className?: string
  showGlow?: boolean
}

export const MeritBadge: React.FC<MeritBadgeProps> = ({
  tier = 'BRONZE',
  variant = 'GENERIC',
  className = 'w-16 h-16',
  showGlow = true
}) => {
  // Color configuration based on Rank
  const getRankColors = () => {
    switch (tier) {
      case 'ADMIRAL':
        return { stroke: '#22d3ee', glow: '#22d3ee' } // Cyan
      case 'CAPTAIN':
        return { stroke: '#f97316', glow: '#f97316' } // Orange
      case 'GOLD':
        return { stroke: '#eab308', glow: '#eab308' } // Gold
      default:
        return { stroke: '#8CD100', glow: '#8CD100' } // Default Neon Green
    }
  }

  const c = getRankColors()

  // UNIQUE SVG PATHS FOR CAPTAINS
  const renderUniqueSymbol = () => {
    switch (variant) {
      case 'CASSIOPEIA': // W shape forming a 3D Crystal
        return (
          <g transform="translate(50,50) scale(0.9)">
            <path
              d="M-30 -20 L-15 20 L0 -10 L15 20 L30 -20 L15 40 L0 10 L-15 40 Z"
              fill="url(#metalGrad)"
              stroke="url(#neonGrad)"
              strokeWidth="1.5"
              filter="url(#neonGlow)"
            />
            <path
              d="M-30 -20 L0 10 L30 -20"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
          </g>
        )
      case 'BELLATRIX': // Vertical Eye with Pulsar Star
        return (
          <g transform="translate(50,50)">
            {/* Eye Shape */}
            <path
              d="M0 -35 Q35 0 0 35 Q-35 0 0 -35 Z"
              fill="url(#metalGrad)"
              stroke="url(#neonGrad)"
              strokeWidth="1.5"
            />
            {/* Pulsar Star Center */}
            <path
              d="M0 -15 L4 0 L0 15 L-4 0 Z M-15 0 L0 4 L15 0 L0 -4 Z"
              fill="#fff"
              filter="url(#neonGlow)"
            />
            {/* Circuit Lines */}
            <path
              d="M-35 0 H-20 M20 0 H35 M0 -35 V-20 M0 20 V35"
              stroke={c.stroke}
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        )
      case 'VEGA': // Lyre Strings forming a Shield
        return (
          <g transform="translate(50,50)">
            {/* Shield Outline */}
            <path
              d="M-25 -30 H25 V10 Q0 45 -25 10 Z"
              fill="url(#metalGrad)"
              stroke="url(#neonGrad)"
              strokeWidth="2"
            />
            {/* Strings */}
            <path
              d="M-10 -30 V20 M0 -30 V25 M10 -30 V20"
              stroke={c.stroke}
              strokeWidth="1"
              opacity="0.8"
              filter="url(#neonGlow)"
            />
          </g>
        )
      case 'ANDROMEDA': // Spiral Galaxy Arms + Scale
        return (
          <g transform="translate(50,50)">
            {/* Spirals */}
            <path
              d="M-20 -10 Q0 -30 20 -10 Q30 10 0 30 Q-30 10 -20 -10"
              fill="none"
              stroke="url(#neonGrad)"
              strokeWidth="2"
              filter="url(#neonGlow)"
            />
            {/* Scale Center */}
            <path d="M0 -30 V30 M-15 10 H15" stroke="#fff" strokeWidth="1.5" />
            <circle cx="0" cy="-30" r="3" fill={c.stroke} />
          </g>
        )
      case 'ANTARES': // Infinity Flame
        return (
          <g transform="translate(50,50) scale(0.8)">
            {/* Infinity Loop resembling flame at top */}
            <path
              d="M-20 0 C-20 -20 0 -10 0 0 C0 -10 20 -20 20 0 C20 30 -20 30 -20 0 Z"
              fill="url(#metalGrad)"
              stroke="#ef4444"
              strokeWidth="2"
            />
            {/* Core Flame */}
            <path d="M0 5 Q-5 -10 0 -25 Q5 -10 0 5" fill="#facc15" filter="url(#neonGlow)" />
          </g>
        )
      case 'RIGEL': // Hex Bolt + Starburst
        return (
          <g transform="translate(50,50)">
            <path
              d="M-25 -15 L0 -30 L25 -15 L25 15 L0 30 L-25 15 Z"
              fill="url(#metalGrad)"
              stroke={c.stroke}
              strokeWidth="2"
            />
            {/* Piston Lines */}
            <path d="M-25 -15 L-10 -5 M25 -15 L10 -5 M0 30 V15" stroke="#fff" opacity="0.3" />
            {/* Blue Starburst */}
            <path
              d="M0 -10 L3 0 L0 10 L-3 0 Z M-10 0 L0 3 L10 0 L0 -3 Z"
              fill="#3b82f6"
              filter="url(#neonGlow)"
            />
          </g>
        )
      case 'ARCTURUS': // Wormhole Spiral + Compass
        return (
          <g transform="translate(50,50)">
            <circle
              cx="0"
              cy="0"
              r="28"
              stroke="url(#metalGrad)"
              strokeWidth="1"
              strokeDasharray="4 2"
              opacity="0.5"
            />
            <path d="M-20 -20 Q0 0 20 20 M-20 20 Q0 0 20 -20" stroke={c.stroke} strokeWidth="1" />
            {/* Compass Needle */}
            <path d="M0 -25 L5 0 L0 25 L-5 0 Z" fill="#fff" filter="url(#neonGlow)" />
          </g>
        )
      case 'POLARIS': // 8-point North Star + Radar
        return (
          <g transform="translate(50,50)">
            {/* Radar Rings */}
            <circle cx="0" cy="0" r="35" stroke={c.stroke} strokeWidth="0.5" opacity="0.3" />
            <circle cx="0" cy="0" r="25" stroke={c.stroke} strokeWidth="0.5" opacity="0.6" />
            {/* North Star */}
            <path
              d="M0 -20 L4 -4 L20 0 L4 4 L0 20 L-4 4 L-20 0 L-4 -4 Z"
              fill="#fff"
              filter="url(#neonGlow)"
            />
          </g>
        )
      default: // GENERIC FALLBACK
        return (
          <g transform="translate(50,50)">
            <path d="M-20 -20 L20 20 M20 -20 L-20 20" stroke={c.stroke} strokeWidth="2" />
            <circle cx="0" cy="0" r="15" stroke={c.stroke} fill="none" />
          </g>
        )
    }
  }

  return (
    <div
      className={`relative flex items-center justify-center aspect-square ${className} rounded-full group`}
    >
      {/* 
         SVG CONTAINER 
         ViewBox 0 0 100 100 is the standard coordinate system for our drawings 
      */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          {/* Cosmic Dark Metal Gradient */}
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Neon Gradient for Strokes */}
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c.stroke} stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fff" />
            <stop offset="100%" stopColor={c.stroke} stopOpacity="0.4" />
          </linearGradient>

          {/* Intense Neon Glow Filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Glass Background (Outer Badge Shape) */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#metalGrad)"
          fillOpacity="0.5"
          stroke={c.stroke}
          strokeWidth="0.5"
          className="backdrop-blur-sm"
        />

        {/* 2. Rotating Ring (Cosmic Effect) */}
        <g className="origin-center animate-spin-slow opacity-40">
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            fill="none"
          />
        </g>

        {/* 3. The Unique Symbol */}
        {renderUniqueSymbol()}

        {/* 4. Glass Reflection Overlay */}
        <path d="M15 50 Q50 10 85 50" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#neonGrad)"
          fillOpacity="0.05"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>

      {/* Outer Glow HTML Layer (for environment lighting) */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-xlayer-green/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
    </div>
  )
}
