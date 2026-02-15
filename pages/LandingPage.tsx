import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Power, SkipForward, CheckCircle2 } from 'lucide-react'
import { AOXCLogo } from '../components/AOXCLogo'
import { useLanguage } from '../contexts/LanguageContext'
import { Language } from '../translations'

interface LandingPageProps {
  onEnter: () => void
}

// INIT = Language Select, CRAWL = Star Wars, WARP = Accelerate, BREACH = Dimensional Jump/Flash
type IntroPhase = 'INIT' | 'CRAWL' | 'WARP' | 'BREACH'

// --- ADVANCED WARP DRIVE CANVAS ---
const WarpDriveBackground = ({ phase }: { phase: IntroPhase }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: { x: number; y: number; z: number; color: string }[] = []
    const STAR_COUNT = 2500
    let centerX = width / 2
    let centerY = height / 2

    // Initialize Stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width - centerX,
        y: Math.random() * height - centerY,
        z: Math.random() * width,
        color: Math.random() > 0.9 ? '#8CD100' : Math.random() > 0.95 ? '#22d3ee' : '#e2e8f0'
      })
    }

    let animationFrameId: number
    let speed = 0.5 // Base speed

    const animate = () => {
      // Adjust speed based on phase
      if (phase === 'INIT') speed = 0.2
      else if (phase === 'CRAWL') speed = 2
      else if (phase === 'WARP')
        speed = 100 // Hyper speed
      else if (phase === 'BREACH') speed = 0 // Frozen for explosion

      ctx.fillStyle = phase === 'WARP' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, width, height)

      centerX = width / 2
      centerY = height / 2

      // BREACH EFFECT: Central Singularity
      if (phase === 'BREACH') {
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width)
        gradient.addColorStop(0, '#ffffff')
        gradient.addColorStop(0.1, '#8CD100')
        gradient.addColorStop(1, '#000000')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
        return // Stop processing stars
      }

      for (let i = 0; i < STAR_COUNT; i++) {
        const star = stars[i]
        star.z -= speed

        if (star.z <= 0) {
          star.z = width
          star.x = Math.random() * width - centerX
          star.y = Math.random() * height - centerY
        }

        const k = 128.0 / star.z
        const px = star.x * k + centerX
        const py = star.y * k + centerY

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3.0
          const shade = Math.floor((1 - star.z / width) * 255)

          if (phase === 'WARP') {
            // Streaks
            const prevK = 128.0 / (star.z + speed * 1.5)
            const prevPx = star.x * prevK + centerX
            const prevPy = star.y * prevK + centerY

            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`
            ctx.lineWidth = size
            ctx.moveTo(prevPx, prevPy)
            ctx.lineTo(px, py)
            ctx.stroke()
          } else {
            // Dots
            ctx.fillStyle =
              star.color === '#e2e8f0' ? `rgb(${shade},${shade},${shade})` : star.color
            ctx.beginPath()
            ctx.arc(px, py, size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [phase])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

// --- LANGUAGE INITIALIZER ---
const SystemInitializer = ({ onComplete }: { onComplete: () => void }) => {
  const { language, setLanguage, t } = useLanguage()

  const LANGS: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'ENGLISH', flag: '🇺🇸' },
    { code: 'tr', label: 'TÜRKÇE', flag: '🇹🇷' },
    { code: 'zh', label: 'CHINESE', flag: '🇨🇳' },
    { code: 'ru', label: 'RUSSIAN', flag: '🇷🇺' },
    { code: 'es', label: 'ESPAÑOL', flag: '🇪🇸' },
    { code: 'fr', label: 'FRANÇAIS', flag: '🇫🇷' },
    { code: 'de', label: 'DEUTSCH', flag: '🇩🇪' }
  ]

  const handleAccept = () => {
    localStorage.setItem('aoxc_protocol_consensus', 'true')
    onComplete()
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-700">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-3xl p-10 relative overflow-hidden shadow-[0_0_100px_rgba(140,209,0,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-xlayer-green to-transparent shadow-[0_0_20px_#8CD100]"></div>

        <div className="text-center mb-10">
          <AOXCLogo className="h-20 w-auto mx-auto mb-6" />
          <h2 className="text-3xl font-display font-black text-white tracking-[0.2em] uppercase mb-2">
            {t('init_select_lang')}
          </h2>
          <p className="text-sm text-gray-500 font-mono tracking-wider">
            SYSTEM_BIOS_V4.2 // AWAITING_INPUT
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-300 group
                                ${
                                  language === lang.code
                                    ? 'bg-xlayer-green/10 border-xlayer-green text-white shadow-[0_0_20px_rgba(140,209,0,0.3)] scale-105'
                                    : 'bg-[#111] border-white/5 text-gray-500 hover:border-white/30 hover:text-gray-200'
                                }
                            `}
            >
              <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">
                {lang.flag}
              </span>
              <span className="text-[10px] font-bold tracking-widest">{lang.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-5 border border-white/10 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-xlayer-green/20 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-xlayer-green" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Simulation Protocols Verified
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                {t('init_protocols_desc')}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleAccept}
          className="w-full py-5 bg-xlayer-green hover:bg-white text-black font-black uppercase tracking-[0.3em] text-sm rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(140,209,0,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] active:scale-95 flex items-center justify-center gap-3 group"
        >
          <Power className="w-5 h-5" />
          {t('init_accept_protocols')}
        </button>
      </div>
    </div>
  )
}

// --- STAR WARS CRAWL (FAST & CRISP) ---
const StarWarsIntro = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useLanguage()

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-black font-sans perspective-container">
      <style>{`
                @keyframes crawl {
                    0% {
                        top: 100%;
                        transform: rotateX(25deg) translateZ(0);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        top: -600%; 
                        transform: rotateX(25deg) translateZ(-2500px);
                        opacity: 0;
                    }
                }
                .crawl-container {
                    perspective: 350px; 
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    position: relative;
                }
                .crawl-content {
                    position: absolute;
                    top: 100%;
                    width: 95%; 
                    max-width: 1600px; 
                    color: #fff; 
                    font-weight: 900; 
                    text-align: justify;
                    animation: crawl 30s linear forwards; /* MUCH FASTER (30s) */
                    transform-origin: 50% 100%;
                    will-change: transform, top, opacity;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4); 
                    font-family: 'Orbitron', sans-serif;
                    line-height: 1.6;
                }
                .fade-overlay-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 40vh; 
                    background: linear-gradient(to bottom, #000 0%, transparent 100%);
                    z-index: 10;
                }
            `}</style>

      <div className="crawl-container">
        <div className="fade-overlay-top"></div>

        <div className="crawl-content" onAnimationEnd={onComplete}>
          <div className="text-center mb-64">
            <h2 className="text-[6rem] md:text-[14rem] font-black mb-12 tracking-widest text-xlayer-green drop-shadow-[0_0_50px_rgba(140,209,0,0.8)] uppercase leading-none scale-y-125">
              AOXC DAO
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.5em] mb-8 text-white drop-shadow-md">
              {t('intro_episode')}
            </h3>
          </div>

          <div className="space-y-48 text-4xl md:text-7xl leading-relaxed text-gray-100 font-display text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <p>{t('intro_p1')}</p>
            <p className="text-xlayer-green/90">{t('intro_p2')}</p>
            <p className="text-white">{t('intro_p3')}</p>
          </div>

          <p className="mt-[600px] text-center text-white font-black text-6xl animate-pulse tracking-[0.5em]">
            {t('intro_connection')}
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-12 right-12 z-50 flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/20 border border-white/20 rounded-full text-lg font-bold text-white transition-all backdrop-blur-md group hover:scale-105"
      >
        HYPERDRIVE{' '}
        <SkipForward className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<IntroPhase>('INIT')

  // Transition: INIT -> CRAWL
  const handleInitComplete = useCallback(() => {
    setPhase('CRAWL')
  }, [])

  // Transition: CRAWL -> WARP -> BREACH -> DASHBOARD
  const handleAutoEngage = useCallback(() => {
    // 1. Engage Hyperdrive (Stars Streak)
    setPhase('WARP')

    // 2. Trigger Singular Breach (Flash)
    setTimeout(() => {
      setPhase('BREACH')
    }, 1000)

    // 3. Enter Dashboard (Exit Landing Page)
    setTimeout(() => {
      onEnter()
    }, 2500)
  }, [onEnter])

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans text-white select-none">
      <WarpDriveBackground phase={phase} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-10 pointer-events-none"></div>

      {/* PHASE 0: SYSTEM INITIALIZATION */}
      {phase === 'INIT' && <SystemInitializer onComplete={handleInitComplete} />}

      {/* PHASE 1: STAR WARS CRAWL */}
      {phase === 'CRAWL' && <StarWarsIntro onComplete={handleAutoEngage} />}

      {/* PHASE 2 & 3: HYPERDRIVE & BREACH VISUALS */}
      {(phase === 'WARP' || phase === 'BREACH') && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className={`relative flex items-center justify-center transition-all duration-500 ${phase === 'BREACH' ? 'scale-[20] opacity-0' : 'scale-100 opacity-100'}`}
          >
            {/* Singularity Core */}
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_100px_white] animate-ping"></div>

            {/* Text Glitch Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[800px]">
              <h1 className="text-8xl font-black text-white italic tracking-tighter uppercase glitch-text drop-shadow-[0_0_20px_#8CD100]">
                X LAYER
              </h1>
            </div>
          </div>

          {/* Breach Flash */}
          {phase === 'BREACH' && (
            <div className="absolute inset-0 bg-white animate-[fadeOut_1s_ease-out_forwards]"></div>
          )}
        </div>
      )}

      <style>{`
        .glitch-text {
            animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        @keyframes glitch {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
