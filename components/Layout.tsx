import React, { useState, useEffect, useRef } from 'react'
import {
  LayoutDashboard,
  Vote,
  ArrowRightLeft,
  Landmark,
  UserCircle,
  Menu,
  X,
  Rocket,
  Zap,
  ChevronLeft,
  ChevronRight,
  Globe,
  Code2,
  BookOpen,
  Activity,
  Eye,
  Network,
  ShieldAlert,
  Brain,
  Hammer,
  ChevronDown,
  Power,
  WifiOff,
  Lock,
  Scan,
  ShoppingBag,
  Wrench
} from 'lucide-react'
import { PageView, UserProfile } from '../types'
import { connectWallet, getNetworkStatus } from '../services/web3Service'
import { AOXCLogo } from './AOXCLogo'
import { GlobalSearch } from './GlobalSearch'
import { useLanguage } from '../contexts/LanguageContext'
import { useSimulation } from '../contexts/SimulationContext'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  currentPage: PageView
  setPage: (page: PageView) => void
}

const UltimateWalletButton = ({
  user,
  balances,
  isConnecting,
  onConnect,
  onDisconnect
}: {
  user: UserProfile | null
  balances: any
  isConnecting: boolean
  onConnect: () => void
  onDisconnect: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) {
    return (
      <button
        onClick={onConnect}
        disabled={isConnecting}
        className="group relative h-12 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <div className="absolute inset-0 bg-[#0f0505] z-0"></div>
        <div className="absolute inset-0 border-2 border-red-500/30 rounded-xl z-10 animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-red-900/10 z-0 animate-[pulse_2s_ease-in-out_infinite]"></div>
        <div className="relative z-20 flex items-center gap-3">
          {isConnecting ? (
            <>
              <Scan className="w-5 h-5 text-red-400 animate-spin" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase animate-pulse">
                  CONNECTING...
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="p-1.5 rounded-lg border border-red-500/50 bg-red-950/30">
                <WifiOff className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-black text-red-500 tracking-widest uppercase">
                  SYSTEM OFFLINE
                </span>
                <span className="text-[9px] text-red-400/60 font-mono">
                  {'>> INITIALIZE UPLINK'}
                </span>
              </div>
            </>
          )}
        </div>
      </button>
    )
  }

  const displayBalance =
    balances && balances.AOXC
      ? balances.AOXC.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : '0.00'

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative h-12 pl-2 pr-6 rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'ring-2 ring-xlayer-green' : 'hover:ring-1 hover:ring-xlayer-green/50'}`}
      >
        <div className="absolute inset-0 bg-[#050a02] z-0"></div>
        <div className="relative z-20 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-black border border-xlayer-green/50 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-xlayer-green" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-white font-mono">
              {user.address.substring(0, 6)}...
            </span>
            <span className="text-[10px] text-xlayer-green font-bold">{displayBalance} AOXC</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-64 bg-[#050505] border border-xlayer-green/30 rounded-xl z-50 p-2">
          <button
            onClick={onDisconnect}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-white/5 rounded-lg text-xs font-bold flex items-center gap-2"
          >
            <Power className="w-4 h-4" /> DISCONNECT
          </button>
        </div>
      )}
    </div>
  )
}

const GlassSidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  collapsed,
  status = 'active',
  locked = false
}: {
  icon: any
  label: string
  active: boolean
  onClick: () => void
  collapsed: boolean
  status?: 'active' | 'busy' | 'offline'
  locked?: boolean
}) => {
  const getStatusColor = () => {
    if (locked) return 'bg-gray-700'
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'busy':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <button
      onClick={locked ? undefined : onClick}
      title={collapsed ? label : ''}
      className={`flex items-center gap-3 px-4 py-2.5 mb-1.5 rounded-lg transition-all duration-300 group relative overflow-hidden
          ${
            active
              ? 'bg-gradient-to-r from-xlayer-green/10 to-transparent text-white border-l-2 border-xlayer-green'
              : 'hover:bg-white/5 text-gray-500 hover:text-white border-l-2 border-transparent'
          }
          ${collapsed ? 'justify-center w-full px-2' : 'w-full'}
          ${locked ? 'opacity-50 cursor-not-allowed grayscale' : ''}
        `}
    >
      <div className="relative">
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors z-10 ${active ? 'text-xlayer-green' : 'text-gray-500 group-hover:text-gray-300'}`}
        />
        {!locked && !collapsed && (
          <div
            className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full ${getStatusColor()} animate-pulse border border-[#050505]`}
          ></div>
        )}
      </div>
      <div
        className={`flex items-center justify-between flex-1 overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
      >
        <span className="z-10 font-sans tracking-wide font-medium text-[11px] whitespace-nowrap">
          {label}
        </span>
        {locked ? <Lock className="w-3 h-3 text-gray-600" /> : null}
      </div>
    </button>
  )
}

const NeuralLinkDialectSelector = () => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', label: 'ENGLISH', flag: '🇺🇸' },
    { code: 'tr', label: 'TÜRKÇE', flag: '🇹🇷' },
    { code: 'zh', label: 'CHINESE', flag: '🇨🇳' },
    { code: 'ru', label: 'RUSSIAN', flag: '🇷🇺' },
    { code: 'es', label: 'ESPAÑOL', flag: '🇪🇸' },
    { code: 'fr', label: 'FRANÇAIS', flag: '🇫🇷' },
    { code: 'de', label: 'DEUTSCH', flag: '🇩🇪' }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded bg-black/40 border transition-all duration-300 group
                    ${isOpen ? 'border-xlayer-green text-xlayer-green' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'}
                `}
      >
        <Globe className="w-3 h-3" />
        <span className="text-[10px] font-bold font-mono tracking-widest">
          {language.toUpperCase()}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-[#050505] border border-xlayer-green/30 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-xlayer-green/10 px-3 py-2 border-b border-xlayer-green/20">
            <span className="text-[9px] font-bold text-xlayer-green uppercase tracking-widest block">
              Neural Link Dialect
            </span>
          </div>
          <div className="p-2 grid grid-cols-2 gap-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any)
                  setIsOpen(false)
                }}
                className={`text-left px-3 py-2 text-[10px] font-bold font-mono transition-all flex items-center gap-2 rounded hover:bg-white/5
                                    ${language === lang.code ? 'text-xlayer-green bg-white/5' : 'text-gray-500'}
                                `}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [network, setNetwork] = useState<{ name: string; block: number } | null>(null)

  const { t } = useLanguage()
  const { balances } = useSimulation()

  useEffect(() => {
    getNetworkStatus().then(setNetwork)
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const userData = await connectWallet()
      setUser(userData)
    } catch (e) {
      console.error(e)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => setUser(null)

  const NavItems = ({ collapsed }: { collapsed: boolean }) => {
    const onItemClick = (page: PageView) => {
      setPage(page)
      setIsMobileMenuOpen(false)
    }

    const SectionHeader = ({ label }: { label: string }) =>
      !collapsed ? (
        <p className="px-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-6 mb-2 opacity-70 border-b border-white/5 pb-1 mx-2">
          {label}
        </p>
      ) : (
        <div className="my-4 h-[1px] bg-white/10 mx-4"></div>
      )

    return (
      <div className="flex flex-col gap-0.5">
        <SectionHeader label={t('nav_main_deck')} />
        <GlassSidebarItem
          icon={LayoutDashboard}
          label={t('nav_dashboard')}
          active={currentPage === PageView.DASHBOARD}
          onClick={() => onItemClick(PageView.DASHBOARD)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Vote}
          label={t('nav_governance')}
          active={currentPage === PageView.GOVERNANCE}
          onClick={() => onItemClick(PageView.GOVERNANCE)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Rocket}
          label={t('nav_missions')}
          active={currentPage === PageView.MISSIONS}
          onClick={() => onItemClick(PageView.MISSIONS)}
          collapsed={collapsed}
        />

        <SectionHeader label={t('nav_engineering')} />
        <GlassSidebarItem
          icon={Hammer}
          label={t('nav_virgo')}
          active={currentPage === PageView.VIRGO}
          onClick={() => onItemClick(PageView.VIRGO)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Eye}
          label={t('nav_oracle')}
          active={currentPage === PageView.ORACLE}
          onClick={() => onItemClick(PageView.ORACLE)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Wrench}
          label={t('nav_fleet_eng')}
          active={currentPage === PageView.FLEET_ENGINEERING}
          onClick={() => onItemClick(PageView.FLEET_ENGINEERING)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Code2}
          label={t('nav_contracts')}
          active={currentPage === PageView.CONTRACTS}
          onClick={() => onItemClick(PageView.CONTRACTS)}
          collapsed={collapsed}
        />

        <SectionHeader label={t('nav_finance')} />
        <GlassSidebarItem
          icon={ArrowRightLeft}
          label={t('nav_swap')}
          active={currentPage === PageView.SWAP}
          onClick={() => onItemClick(PageView.SWAP)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Network}
          label={t('nav_bridge')}
          active={currentPage === PageView.BRIDGE}
          onClick={() => onItemClick(PageView.BRIDGE)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Landmark}
          label={t('nav_treasury')}
          active={currentPage === PageView.TREASURY}
          onClick={() => onItemClick(PageView.TREASURY)}
          collapsed={collapsed}
        />

        <SectionHeader label={t('nav_bazaar')} />
        <GlassSidebarItem
          icon={ShoppingBag}
          label={t('nav_market')}
          active={currentPage === PageView.MARKET}
          onClick={() => onItemClick(PageView.MARKET)}
          collapsed={collapsed}
        />

        <SectionHeader label={t('nav_system')} />
        <GlassSidebarItem
          icon={ShieldAlert}
          label={t('nav_security')}
          active={currentPage === PageView.SECURITY}
          onClick={() => onItemClick(PageView.SECURITY)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Brain}
          label={t('nav_sentinel')}
          active={currentPage === PageView.SENTINEL}
          onClick={() => onItemClick(PageView.SENTINEL)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={Activity}
          label={t('nav_telemetry')}
          active={currentPage === PageView.TELEMETRY}
          onClick={() => onItemClick(PageView.TELEMETRY)}
          collapsed={collapsed}
        />

        <SectionHeader label={t('nav_identity')} />
        <GlassSidebarItem
          icon={BookOpen}
          label={t('nav_docs')}
          active={currentPage === PageView.DOCS}
          onClick={() => onItemClick(PageView.DOCS)}
          collapsed={collapsed}
        />
        <GlassSidebarItem
          icon={UserCircle}
          label={t('nav_profile')}
          active={currentPage === PageView.PROFILE}
          onClick={() => onItemClick(PageView.PROFILE)}
          collapsed={collapsed}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] text-gray-100 flex overflow-hidden relative selection:bg-xlayer-green selection:text-black">
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0a1f16] to-transparent pointer-events-none opacity-40" />

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 bg-[#050505] shadow-[5px_0_20px_rgba(0,0,0,0.5)] z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        <div
          className={`p-4 flex flex-col justify-center border-b border-white/5 h-24 transition-all duration-300 ${isCollapsed ? 'items-center' : 'items-start'}`}
        >
          <div className="flex items-center gap-2">
            <AOXCLogo
              className={`transition-all duration-300 ${isCollapsed ? 'h-10 w-10' : 'h-12 w-auto'}`}
              collapsed={isCollapsed}
            />
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-28 bg-[#121212] border border-white/10 text-gray-400 hover:text-white rounded-full p-1 shadow-lg hover:scale-110 transition-all z-50 group"
        >
          {isCollapsed ? (
            <ChevronRight size={14} className="group-hover:text-xlayer-green" />
          ) : (
            <ChevronLeft size={14} className="group-hover:text-xlayer-green" />
          )}
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden scrollbar-thin">
          <NavItems collapsed={isCollapsed} />
        </nav>

        {/* --- FIXED: X LAYER CONNECTION STATUS FOOTER --- */}
        <div
          className={`p-3 border-t border-white/5 bg-black/40 backdrop-blur-sm transition-all duration-300 ${isCollapsed ? 'flex justify-center' : 'block'}`}
        >
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-xlayer-green animate-pulse shadow-[0_0_8px_#8CD100]"></div>
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-xlayer-green/50 animate-ping"></div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  CONNECTED
                </span>
                <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                  X LAYER MAINNET{' '}
                  <span className="text-xlayer-green">#{network?.block || '12.4M'}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-black/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-50 shadow-lg shadow-black/50">
        <div className="flex items-center gap-2">
          <AOXCLogo className="h-8 w-auto" />
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black pt-20 px-4 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <NavItems collapsed={false} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen relative overflow-y-auto pt-20 lg:pt-0 transition-all duration-300 flex flex-col ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}
      >
        <header className="hidden lg:flex items-center justify-between px-8 py-6 sticky top-0 z-30 bg-[#000000]/80 backdrop-blur-md border-b border-white/5 h-24 shadow-sm shadow-black/40">
          <div className="flex-1 max-w-xl">
            <GlobalSearch setPage={setPage} />
          </div>
          <div className="flex items-center gap-4 pl-8">
            <NeuralLinkDialectSelector />
            <UltimateWalletButton
              user={user}
              balances={balances}
              isConnecting={isConnecting}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
        <Footer />
      </main>
    </div>
  )
}
