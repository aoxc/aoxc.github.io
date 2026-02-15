import React, { useState, useEffect } from 'react'
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
  Activity
} from 'lucide-react'
import { PageView, UserProfile } from '../types'
import { connectWallet, getNetworkStatus } from '../services/web3Service'
import { AOXCLogo } from './AOXCLogo'
import { GlobalSearch } from './GlobalSearch'
import { useLanguage } from '../contexts/LanguageContext'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  currentPage: PageView
  setPage: (page: PageView) => void
}

const GlassSidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  collapsed
}: {
  icon: any
  label: string
  active: boolean
  onClick: () => void
  collapsed: boolean
}) => (
  <button
    onClick={onClick}
    title={collapsed ? label : ''}
    className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-300 group relative overflow-hidden
      ${
        active
          ? 'bg-gradient-to-r from-xlayer-green/10 to-transparent text-white border-l-2 border-xlayer-green shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
          : 'hover:bg-white/5 text-gray-500 hover:text-white border-l-2 border-transparent'
      }
      ${collapsed ? 'justify-center w-full px-2' : 'w-full'}
    `}
  >
    {/* Active Background Glow */}
    {active && (
      <div className="absolute inset-0 bg-xlayer-green/5 blur-sm pointer-events-none"></div>
    )}

    <Icon
      className={`w-5 h-5 flex-shrink-0 transition-colors z-10 ${active ? 'text-xlayer-green drop-shadow-[0_0_8px_rgba(0,255,163,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`}
    />

    {/* Label transition */}
    <span
      className={`z-10 font-sans tracking-wide font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
    >
      {label}
    </span>

    {/* Active Dot for Collapsed Mode */}
    {active && collapsed && (
      <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-xlayer-green animate-pulse z-20" />
    )}
  </button>
)

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [network, setNetwork] = useState<{ name: string; block: number } | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Use Translation Hook
  const { t, language, setLanguage } = useLanguage()

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

  return (
    <div className="min-h-screen w-full bg-[#000000] text-gray-100 flex overflow-hidden relative selection:bg-xlayer-green selection:text-black">
      {/* Background Ambience (Subtle X Layer Vibe) */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0a1f16] to-transparent pointer-events-none opacity-40" />

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 bg-[#050505] shadow-[5px_0_20px_rgba(0,0,0,0.5)] z-50 transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        {/* Sidebar Header / Logo */}
        <div
          className={`p-4 flex flex-col justify-center border-b border-white/5 h-24 transition-all duration-300 ${isCollapsed ? 'items-center' : 'items-start'}`}
        >
          <div className="flex items-center gap-2">
            <AOXCLogo
              className={`transition-all duration-300 ${isCollapsed ? 'h-10 w-10' : 'h-20 w-auto'}`}
              collapsed={isCollapsed}
            />
          </div>
        </div>

        {/* Toggle Button */}
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

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden scrollbar-thin">
          <div className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_main_deck')}
              </p>
            )}
            <GlassSidebarItem
              icon={LayoutDashboard}
              label={t('nav_dashboard')}
              active={currentPage === PageView.DASHBOARD}
              onClick={() => setPage(PageView.DASHBOARD)}
              collapsed={isCollapsed}
            />
            <GlassSidebarItem
              icon={Vote}
              label={t('nav_governance')}
              active={currentPage === PageView.GOVERNANCE}
              onClick={() => setPage(PageView.GOVERNANCE)}
              collapsed={isCollapsed}
            />
            <GlassSidebarItem
              icon={Rocket}
              label={t('nav_missions')}
              active={currentPage === PageView.MISSIONS}
              onClick={() => setPage(PageView.MISSIONS)}
              collapsed={isCollapsed}
            />
          </div>

          <div className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_engineering')}
              </p>
            )}
            <GlassSidebarItem
              icon={Code2}
              label={t('nav_contracts')}
              active={currentPage === PageView.CONTRACTS}
              onClick={() => setPage(PageView.CONTRACTS)}
              collapsed={isCollapsed}
            />
          </div>

          <div className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_finance')}
              </p>
            )}
            <GlassSidebarItem
              icon={ArrowRightLeft}
              label={t('nav_swap')}
              active={currentPage === PageView.SWAP}
              onClick={() => setPage(PageView.SWAP)}
              collapsed={isCollapsed}
            />
            <GlassSidebarItem
              icon={Landmark}
              label={t('nav_treasury')}
              active={currentPage === PageView.TREASURY}
              onClick={() => setPage(PageView.TREASURY)}
              collapsed={isCollapsed}
            />
          </div>

          <div className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_system')}
              </p>
            )}
            <GlassSidebarItem
              icon={Activity}
              label={t('nav_telemetry')}
              active={currentPage === PageView.TELEMETRY}
              onClick={() => setPage(PageView.TELEMETRY)}
              collapsed={isCollapsed}
            />
          </div>

          <div className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_library')}
              </p>
            )}
            <GlassSidebarItem
              icon={BookOpen}
              label={t('nav_docs')}
              active={currentPage === PageView.DOCS}
              onClick={() => setPage(PageView.DOCS)}
              collapsed={isCollapsed}
            />
          </div>

          <div>
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 opacity-70">
                {t('nav_identity')}
              </p>
            )}
            <GlassSidebarItem
              icon={UserCircle}
              label={t('nav_profile')}
              active={currentPage === PageView.PROFILE}
              onClick={() => setPage(PageView.PROFILE)}
              collapsed={isCollapsed}
            />
          </div>
        </nav>

        {/* Network Status Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 overflow-hidden backdrop-blur-sm">
          <div
            className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'}`}
          >
            <div className="flex items-center gap-2" title="Network Status: OKX X Layer">
              <span className="w-2 h-2 rounded-full bg-xlayer-green animate-pulse shadow-[0_0_8px_#00FFA3]"></span>
              {!isCollapsed && (
                <span className="text-xs text-white font-medium tracking-wide">
                  {network ? network.name : '...'}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] text-gray-500 font-mono">#{network?.block}</span>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black pt-20 px-4 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <GlassSidebarItem
              collapsed={false}
              icon={LayoutDashboard}
              label={t('nav_dashboard')}
              active={currentPage === PageView.DASHBOARD}
              onClick={() => {
                setPage(PageView.DASHBOARD)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={Activity}
              label={t('nav_telemetry')}
              active={currentPage === PageView.TELEMETRY}
              onClick={() => {
                setPage(PageView.TELEMETRY)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={BookOpen}
              label={t('nav_docs')}
              active={currentPage === PageView.DOCS}
              onClick={() => {
                setPage(PageView.DOCS)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={Code2}
              label={t('nav_contracts')}
              active={currentPage === PageView.CONTRACTS}
              onClick={() => {
                setPage(PageView.CONTRACTS)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={Vote}
              label={t('nav_governance')}
              active={currentPage === PageView.GOVERNANCE}
              onClick={() => {
                setPage(PageView.GOVERNANCE)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={ArrowRightLeft}
              label={t('nav_swap')}
              active={currentPage === PageView.SWAP}
              onClick={() => {
                setPage(PageView.SWAP)
                setIsMobileMenuOpen(false)
              }}
            />
            <GlassSidebarItem
              collapsed={false}
              icon={UserCircle}
              label={t('nav_profile')}
              active={currentPage === PageView.PROFILE}
              onClick={() => {
                setPage(PageView.PROFILE)
                setIsMobileMenuOpen(false)
              }}
            />
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'tr' : 'en')
              }}
              className="w-full py-3 bg-white/5 rounded-full text-center text-sm font-bold flex items-center justify-center gap-2 mb-4"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'TÜRKÇE' : 'ENGLISH'}
            </button>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-xlayer-green text-black hover:bg-xlayer-green/90 font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              {t('connect_wallet')}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 min-h-screen relative overflow-y-auto pt-20 lg:pt-0 transition-all duration-300 flex flex-col
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
        `}
      >
        {/* Top Header (Desktop) - Updated with Global Search */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 sticky top-0 z-30 bg-[#000000]/80 backdrop-blur-md border-b border-white/5 h-24 shadow-sm shadow-black/40">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <GlobalSearch setPage={setPage} />
          </div>

          <div className="flex items-center gap-4 pl-8">
            {/* Stats Ticker */}
            <div className="hidden xl:flex items-center gap-4 px-4 py-2 rounded-full border border-white/10 bg-[#0A0A0A] mr-4 shadow-inner shadow-black/50">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-xlayer-green" />
                <span className="text-xs text-gray-400">
                  Gas: <span className="text-white font-mono">0.001 OKB</span>
                </span>
              </div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  AOXC: <span className="text-xlayer-green font-mono font-bold">$1.24</span>
                </span>
              </div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-bold font-mono text-gray-300 hover:text-white"
              title="Switch Language"
            >
              {language.toUpperCase()}
            </button>

            {user ? (
              <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-full hover:border-xlayer-green/50 transition-colors cursor-pointer group shadow-lg">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-white">{user.balance}</div>
                  <div className="text-[10px] text-gray-400 tracking-wider font-medium group-hover:text-xlayer-green transition-colors">
                    {user.role}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black p-[1px] border border-white/20">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    <UserCircle className="text-white w-full h-full p-1" />
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-xlayer-green text-black hover:bg-xlayer-green/90 font-bold py-2.5 px-6 rounded-full transition-all shadow-[0_0_15px_rgba(0,255,163,0.2)] flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                {isConnecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>{t('connecting')}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>{t('connect_wallet')}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Content Wrapper with improved margins/padding for mobile */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
