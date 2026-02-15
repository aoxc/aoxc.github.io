import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Vote,
  Timer,
  Target,
  Zap,
  Shield,
  Globe,
  Database,
  Activity,
  Box,
  Scale,
  Flag,
  Check,
  X,
  Minus,
  Loader2
} from 'lucide-react'
import { MeritBadge, BadgeVariant } from './MeritBadge'
import { useSimulation } from '../contexts/SimulationContext'

// --- CAMPAIGN DATA ---
const CAMPAIGNS = [
  {
    id: 'andromeda',
    name: 'ANDROMEDA CORE',
    slogan: 'DÜZEN. OTORİTE. SONSUZLUK.',
    description:
      'Merkezi yönetimde kaos istemiyorsan, oyunu düzenin koruyucusuna ver. Galaksinin omurgası sağlam kalmalı. Yönetim tokenlarında %5 vergi indirimi vaadi.',
    color: 'rose',
    badgeVar: 'ANDROMEDA' as BadgeVariant,
    icon: Globe
  },
  {
    id: 'aquila',
    name: 'AQUILA LIQUIDITY',
    slogan: 'AKISKAN GÜÇ, SINIRSIZ ZENGİNLİK',
    description:
      'Daha derin havuzlar, sıfır kayma (slippage) ve maksimum getiri. Likidite sağlayıcıları için %20 ekstra APR desteği.',
    color: 'emerald',
    badgeVar: 'ANTARES' as BadgeVariant,
    icon: Activity
  },
  {
    id: 'pegasus',
    name: 'PEGASUS ORACLE',
    slogan: 'GELECEĞİ GÖREN GÖZ',
    description:
      'Veri, evrendeki en değerli madendir. Doğru fiyat, anlık veri ve yanılmayan bir kahin için Pegasus. Veri akışlarında 0 Gas ücreti.',
    color: 'amber',
    badgeVar: 'BELLATRIX' as BadgeVariant,
    icon: Database
  },
  {
    id: 'quasar',
    name: 'QUASAR SENTRY',
    slogan: 'GEÇİLMEZ KALKAN',
    description:
      "Siber korsanlara ve anomalilere karşı tek savunma hattınız. Güvenliğiniz için Quasar'a yetki verin. Bot koruması aktif.",
    color: 'cyan',
    badgeVar: 'VEGA' as BadgeVariant,
    icon: Shield
  }
]

// TIMER SET TO MARCH 28, 2026 (Before April 1st)
const TARGET_DATE = new Date('2026-03-28T12:00:00').getTime()

export const ElectionCampaignBanner: React.FC = () => {
  const { executeTransaction, blockNumber, balances } = useSimulation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [showVoteOptions, setShowVoteOptions] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  // Countdown Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = TARGET_DATE - now
      if (distance < 0) {
        clearInterval(interval)
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto Slide
  useEffect(() => {
    if (showVoteOptions || isVoting) return
    const timer = setInterval(() => nextSlide(), 8000)
    return () => clearInterval(timer)
  }, [currentIndex, showVoteOptions, isVoting])

  const nextSlide = () => {
    setShowVoteOptions(false)
    setCurrentIndex(prev => (prev + 1) % CAMPAIGNS.length)
  }

  const prevSlide = () => {
    setShowVoteOptions(false)
    setCurrentIndex(prev => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length)
  }

  const current = CAMPAIGNS[currentIndex]

  const getColor = (color: string) => {
    const map: Record<string, string> = {
      cyan: 'text-cyan-400 border-cyan-500 bg-cyan-500',
      emerald: 'text-emerald-400 border-emerald-500 bg-emerald-500',
      amber: 'text-amber-400 border-amber-500 bg-amber-500',
      rose: 'text-rose-500 border-rose-600 bg-rose-600'
    }
    return map[color] || map.cyan
  }

  const theme = getColor(current.color)
  const themeBg = theme.replace('text-', '').replace('border-', '').replace('bg-', '')

  const handleVoteAction = async (type: 'yes' | 'no' | 'abstain') => {
    // Check Balance for Gas
    if (balances.AOXC < 0.1) {
      alert('Yetersiz Bakiye! Oy kullanmak için en az 0.1 AOXC gereklidir.')
      return
    }

    setIsVoting(true)
    try {
      // Simulate blockchain transaction with Context
      const hash = await executeTransaction(
        'VOTE',
        `Campaign Vote: ${current.name} [${type.toUpperCase()}]`,
        { token: 'AOXC', amount: 0.1 } // Deduct 0.1 AOXC as "Gas/Vote Cost"
      )

      alert(
        `OYUNUZ ZİNCİRE İŞLENDİ.\nHash: ${hash}\nTercih: ${type.toUpperCase()}\nAday: ${current.name}\n-0.1 AOXC Ücret Tahsil Edildi.`
      )
      setShowVoteOptions(false)
    } catch (error: any) {
      alert(`HATA: İşlem başarısız. ${error.message || 'Yetersiz Gas veya ağ hatası.'}`)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div
      className={`relative w-full h-[320px] md:h-[280px] rounded-3xl overflow-hidden border transition-colors duration-1000 ${theme.split(' ')[1]} group bg-[#020202] shadow-[0_0_50px_rgba(0,0,0,0.6)]`}
    >
      {/* BACKGROUND LAYERS */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-black via-[#0a0a0a] to-black z-0`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000 bg-${themeBg} -translate-y-1/2 translate-x-1/4`}
      ></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        {/* LEFT: INFO */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative">
          <div
            className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-left-4 duration-700"
            key={`tag-${currentIndex}`}
          >
            <div
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border bg-black/40 backdrop-blur-md ${theme.split(' ')[0]} ${theme.split(' ')[1]}`}
            >
              ELECTION CYCLE: 2026-Q1
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
              <Timer className="w-3 h-3" />
              <span>CLOSING: 28.03.2026</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-mono">
              <Zap className="w-3 h-3" />
              <span>LIVE (BLOCK #{blockNumber})</span>
            </div>
          </div>

          <div
            className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            key={`title-${currentIndex}`}
          >
            <h1 className="text-3xl md:text-5xl font-display font-black text-white italic tracking-tighter drop-shadow-lg leading-none mb-1 flex items-center gap-3">
              {current.name}
              {current.id === 'andromeda' && (
                <Flag className="w-6 h-6 text-rose-500 fill-rose-500/20" />
              )}
            </h1>
            <p
              className={`text-sm md:text-base font-bold uppercase tracking-widest ${theme.split(' ')[0]}`}
            >
              "{current.slogan}"
            </p>
          </div>

          <p
            className="text-gray-400 text-xs md:text-sm max-w-lg mb-6 leading-relaxed hidden md:block animate-in fade-in duration-1000 delay-200"
            key={`desc-${currentIndex}`}
          >
            {current.description}
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-4 mt-auto">
            {['Days', 'Hrs', 'Min', 'Sec'].map((label, i) => {
              const val = Object.values(timeLeft)[i]
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="text-xl md:text-2xl font-mono font-bold text-white leading-none">
                      {val < 0 ? 0 : val}
                    </div>
                    <div className="text-[8px] text-gray-500 uppercase tracking-widest">
                      {label}
                    </div>
                  </div>
                  {i < 3 && <div className="text-gray-600 font-mono text-xl mb-3">:</div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT: VISUAL & VOTE */}
        <div className="w-full md:w-[400px] relative p-6 flex flex-col items-center justify-center border-l border-white/5 bg-gradient-to-b from-transparent to-black/30">
          <div
            className="relative mb-6 transform hover:scale-105 transition-transform duration-500"
            key={`badge-${currentIndex}`}
          >
            <MeritBadge
              variant={current.badgeVar}
              tier="CAPTAIN"
              className="w-32 h-32 md:w-40 md:h-40 relative z-10"
              showGlow={true}
            />
            <div
              className={`absolute -bottom-2 -right-2 p-3 rounded-full bg-[#111] border border-white/10 ${theme.split(' ')[0]} shadow-xl z-20`}
            >
              <current.icon className="w-6 h-6" />
            </div>
          </div>

          <div className="w-full max-w-[280px] relative z-10 min-h-[60px] flex items-end justify-center">
            {isVoting ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 cursor-wait"
              >
                <Loader2 className="w-4 h-4 animate-spin" />X LAYER ONAYI...
              </button>
            ) : !showVoteOptions ? (
              <button
                onClick={() => setShowVoteOptions(true)}
                className={`group relative w-full py-3 rounded-lg font-bold text-sm uppercase tracking-widest border transition-all hover:scale-[1.02] flex items-center justify-center gap-2 overflow-hidden
                                ${theme.split(' ')[0]} ${theme.split(' ')[1]} bg-${themeBg}/10 hover:bg-${themeBg}/20 animate-pulse
                            `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Vote className="w-4 h-4" />
                  OY KULLAN (0.1 AOXC)
                </span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ) : (
              <div className="w-full grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button
                  onClick={() => handleVoteAction('yes')}
                  className="flex flex-col items-center justify-center py-2 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 rounded-lg transition-all active:scale-95"
                >
                  <Check className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">EVET</span>
                </button>
                <button
                  onClick={() => handleVoteAction('no')}
                  className="flex flex-col items-center justify-center py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg transition-all active:scale-95"
                >
                  <X className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">HAYIR</span>
                </button>
                <button
                  onClick={() => handleVoteAction('abstain')}
                  className="flex flex-col items-center justify-center py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all active:scale-95"
                >
                  <Minus className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">ÇEKİMSER</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all z-20 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all z-20 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
