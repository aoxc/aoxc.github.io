import React, { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export const CookieConsent = () => {
  const { t } = useLanguage()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if user has already accepted protocols
    const consensus = localStorage.getItem('aoxc_protocol_consensus')
    // Also check if we are NOT on the landing page (which has its own consent flow)
    const onLanding =
      !localStorage.getItem('aoxc_show_landing') ||
      JSON.parse(localStorage.getItem('aoxc_show_landing') || 'true')

    if (!consensus && !onLanding) {
      // Small delay for animation entrance
      setTimeout(() => setShow(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('aoxc_protocol_consensus', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4 md:p-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-x border-yellow-500/30 rounded-t-2xl shadow-[0_-10px_40px_rgba(234,179,8,0.1)] overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
        {/* Warning Stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 animate-[shimmer_3s_infinite]"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
          {/* Icon Block */}
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center relative">
              <ShieldAlert className="w-6 h-6 text-yellow-500 animate-pulse" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500"></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-2 font-display">
              <AlertTriangle className="w-4 h-4" />
              {t('cookie_title')}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{t('cookie_msg')}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleAccept}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-wide text-xs rounded transition-all shadow-[0_0_15px_rgba(234,179,8,0.4)] active:scale-95 whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('cookie_accept')}
            </button>
          </div>
        </div>

        {/* Decorative footer line */}
        <div className="flex justify-between px-6 py-1 bg-black/60 text-[8px] text-gray-600 font-mono uppercase">
          <span>SECURE_CONNECTION: TLS 1.3</span>
          <span>DATA_PERSISTENCE: LOCAL_ONLY</span>
        </div>
      </div>
    </div>
  )
}
