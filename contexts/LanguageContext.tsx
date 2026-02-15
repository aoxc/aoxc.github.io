import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { translations, Language } from '../translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof (typeof translations)['en']) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  // --- AUTO-DETECT LOGIC ---
  useEffect(() => {
    // 1. Check Local Storage first (Manual Override)
    const savedLang = localStorage.getItem('aoxc_language') as Language

    if (savedLang && ['en', 'tr', 'zh', 'ru'].includes(savedLang)) {
      setLanguage(savedLang)
    } else {
      // 2. Check Browser Language
      const browserLang = navigator.language.split('-')[0] // e.g. "tr-TR" -> "tr"

      if (browserLang === 'tr') setLanguage('tr')
      else if (browserLang === 'zh') setLanguage('zh')
      else if (browserLang === 'ru') setLanguage('ru')
      else setLanguage('en') // Default fallback
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('aoxc_language', lang)
  }

  const t = (key: keyof (typeof translations)['en']) => {
    // @ts-ignore
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
