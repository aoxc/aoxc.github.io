import React from 'react'

interface LogoProps {
  className?: string
  collapsed?: boolean
}

export const AOXCLogo: React.FC<LogoProps> = ({ className, collapsed = false }) => {
  const PRIMARY_GREEN = '#8CD100' // X Layer Green
  const CYAN_CORE = '#22d3ee'
  const DARK_BG = '#050505'

  // Collapsed / Mobile Icon
  if (collapsed) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={className}
        aria-label="AOXC Icon"
      >
        <defs>
          <linearGradient id="miniGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={PRIMARY_GREEN} />
            <stop offset="100%" stopColor={CYAN_CORE} />
          </linearGradient>
          <filter id="miniGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor={PRIMARY_GREEN}
              floodOpacity="0.6"
            />
          </filter>
        </defs>
        {/* Hex Background */}
        <path
          d="M32 2 L58 17 V47 L32 62 L6 47 V17 Z"
          fill={DARK_BG}
          stroke="url(#miniGrad)"
          strokeWidth="2"
        />

        {/* Abstract A / Core */}
        <path
          d="M32 12 L46 52 H18 Z"
          fill="none"
          stroke={PRIMARY_GREEN}
          strokeWidth="3"
          strokeLinejoin="round"
          filter="url(#miniGlow)"
        />
        <circle cx="32" cy="38" r="6" fill={CYAN_CORE} />
      </svg>
    )
  }

  // Full Logo (Slightly Compacted ViewBox)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 70"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label="AOXCDAO Logo"
    >
      <defs>
        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PRIMARY_GREEN} />
          <stop offset="100%" stopColor={CYAN_CORE} />
        </linearGradient>

        <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2"
            floodColor={PRIMARY_GREEN}
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* --- LOGOMARK (Left Side) - Scaled Down --- */}
      <g transform="translate(35, 35) scale(0.75)">
        {/* Outer Rotating Ring */}
        <circle
          cx="0"
          cy="0"
          r="28"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-spin-slow"
          opacity="0.5"
        />

        {/* Hex Frame */}
        <path
          d="M0 -24 L21 -12 V12 L0 24 L-21 12 V-12 Z"
          fill="none"
          stroke="url(#accentGrad)"
          strokeWidth="2"
          filter="url(#textGlow)"
        />

        {/* Inner Triangle / A */}
        <path
          d="M0 -14 L12 10 H-12 Z"
          fill={PRIMARY_GREEN}
          fillOpacity="0.2"
          stroke={PRIMARY_GREEN}
          strokeWidth="1.5"
        />

        {/* Core Dot */}
        <circle cx="0" cy="2" r="3" fill="#fff" className="animate-pulse" />
      </g>

      {/* --- TYPOGRAPHY (Right Side) --- */}
      <g transform="translate(70, 48) scale(1.0)">
        {/* Main Title */}
        <text
          fontFamily="'Orbitron', sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="1"
          fill="url(#mainGrad)"
        >
          AOXC
          <tspan fill={PRIMARY_GREEN} filter="url(#textGlow)">
            DAO
          </tspan>
        </text>

        {/* Subtitle / Tagline */}
        <g transform="translate(2, 14)">
          <rect x="0" y="-8" width="80" height="1" fill="#333" />
          <rect x="0" y="-8" width="30" height="1" fill={PRIMARY_GREEN} />

          <text
            fontSize="6"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fill={PRIMARY_GREEN}
            letterSpacing="4"
            y="4"
            className="animate-pulse"
            style={{ textShadow: `0 0 5px ${PRIMARY_GREEN}` }}
          >
            X LAYER GOVERNANCE
          </text>
        </g>
      </g>
    </svg>
  )
}
