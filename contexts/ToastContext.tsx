import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle2, AlertTriangle, Info, ShieldAlert } from 'lucide-react'

type ToastType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING' | 'TX'

interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
  hash?: string
}

interface ToastContextType {
  addToast: (type: ToastType, title: string, message: string, hash?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, title: string, message: string, hash?: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, type, title, message, hash }])

    // Auto-dismiss
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-80 md:w-96 p-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 relative overflow-hidden group
              ${toast.type === 'SUCCESS' ? 'bg-green-950/80 border-green-500/50 text-green-100' : ''}
              ${toast.type === 'ERROR' ? 'bg-red-950/80 border-red-500/50 text-red-100' : ''}
              ${toast.type === 'WARNING' ? 'bg-yellow-950/80 border-yellow-500/50 text-yellow-100' : ''}
              ${toast.type === 'INFO' ? 'bg-blue-950/80 border-blue-500/50 text-blue-100' : ''}
              ${toast.type === 'TX' ? 'bg-[#050505]/90 border-xlayer-green/50 text-xlayer-green' : ''}
            `}
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-50"></div>

            <div className="flex items-start gap-3 relative z-10">
              <div className={`p-2 rounded-full bg-black/20 border border-white/10 shrink-0`}>
                {toast.type === 'SUCCESS' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'ERROR' && <ShieldAlert className="w-5 h-5" />}
                {toast.type === 'WARNING' && <AlertTriangle className="w-5 h-5" />}
                {toast.type === 'INFO' && <Info className="w-5 h-5" />}
                {toast.type === 'TX' && (
                  <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-sm uppercase tracking-wide mb-0.5">
                  {toast.title}
                </h4>
                <p className="text-xs opacity-90 font-mono leading-relaxed break-words">
                  {toast.message}
                </p>
                {toast.hash && (
                  <div className="mt-2 text-[10px] font-mono bg-black/30 px-2 py-1 rounded border border-white/10 truncate">
                    HASH: {toast.hash}
                  </div>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
