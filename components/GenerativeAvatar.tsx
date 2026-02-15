import React, { useMemo } from 'react'

interface GenerativeAvatarProps {
  seed: string
  className?: string
  rankColor?: string
}

export const GenerativeAvatar: React.FC<GenerativeAvatarProps> = ({
  seed,
  className,
  rankColor = '#8CD100'
}) => {
  // Generate deterministic numbers from seed string
  const hash = useMemo(() => {
    let h = 0
    for (let i = 0; i < seed.length; i++) {
      h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
    }
    return Math.abs(h)
  }, [seed])

  const hue = hash % 360
  const secondaryHue = (hue + 180) % 360

  // Deterministic shapes
  const eyeType = hash % 3 // 0: Visor, 1: Eyes, 2: Single Lens
  const armorType = (hash >> 2) % 3

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue}, 70%, 20%)`} />
            <stop offset="100%" stopColor={`hsl(${secondaryHue}, 70%, 10%)`} />
          </linearGradient>
          <filter id="glow-av" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Tech Grid */}
        <path
          d="M10 10 H90 M10 30 H90 M10 50 H90 M10 70 H90 M10 90 H90"
          stroke="white"
          strokeOpacity="0.05"
          strokeWidth="0.5"
        />
        <path
          d="M10 10 V90 M30 10 V90 M50 10 V90 M70 10 V90 M90 10 V90"
          stroke="white"
          strokeOpacity="0.05"
          strokeWidth="0.5"
        />

        {/* Base Head Shape */}
        <path
          d="M30 80 L30 40 L50 25 L70 40 L70 80 L50 90 Z"
          fill={`url(#grad-${seed})`}
          stroke={rankColor}
          strokeWidth="1"
        />

        {/* Armor / Shoulders */}
        {armorType === 0 && (
          <path
            d="M20 90 L30 80 L70 80 L80 90 V100 H20 Z"
            fill="#1a1a1a"
            stroke="#333"
            strokeWidth="1"
          />
        )}
        {armorType === 1 && (
          <path d="M15 100 L30 80 L70 80 L85 100" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        )}
        {armorType === 2 && (
          <path
            d="M25 90 Q50 95 75 90 L80 100 H20 Z"
            fill="#1a1a1a"
            stroke="#333"
            strokeWidth="1"
          />
        )}

        {/* Face / Sensor */}
        {eyeType === 0 && (
          <rect
            x="38"
            y="45"
            width="24"
            height="6"
            rx="1"
            fill={rankColor}
            filter="url(#glow-av)"
            opacity="0.9"
          />
        )}
        {eyeType === 1 && (
          <g>
            <circle cx="40" cy="48" r="3" fill={rankColor} filter="url(#glow-av)" />
            <circle cx="60" cy="48" r="3" fill={rankColor} filter="url(#glow-av)" />
          </g>
        )}
        {eyeType === 2 && (
          <circle
            cx="50"
            cy="48"
            r="8"
            fill="none"
            stroke={rankColor}
            strokeWidth="2"
            filter="url(#glow-av)"
          >
            <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Tech Decor */}
        <path d="M35 60 H45 M55 60 H65" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="48" y="70" width="4" height="15" fill="#111" />
      </svg>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-30"></div>
    </div>
  )
}
