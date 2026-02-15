import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Book,
  ChevronRight,
  Hash,
  Play,
  Info,
  AlertOctagon,
  Terminal,
  ImageIcon,
  Search,
  Cpu,
  Layers,
  ShieldCheck,
  Code2,
  FileText,
  Database,
  Share2,
  CheckCircle2
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { FLEET_MODULES } from '../constants'
import { Language } from '../translations'

// --- TYPES ---

type DocType = 'GENERAL' | 'TECHNICAL' | 'LORE'

interface DocSection {
  id: string
  title: string
  type: DocType
  content: React.ReactNode
}

interface DocCategory {
  title: string
  items: DocSection[]
}

// --- COMPONENTS: NEURAL GLOSSARY ---
const NeuralTerm = ({ term, def }: { term: string; def: string }) => (
  <span className="relative group cursor-help inline-block border-b border-dashed border-xlayer-green/50 text-xlayer-green hover:text-white transition-colors">
    {term}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 border border-xlayer-green/30 rounded text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md shadow-[0_0_15px_rgba(140,209,0,0.2)]">
      <span className="block font-bold text-xlayer-green uppercase mb-1 border-b border-white/10 pb-1">
        DATABASE: {term}
      </span>
      {def}
    </span>
  </span>
)

// --- COMPONENTS: HOLOGRAPHIC CODE BLOCK ---
const HoloCode = ({ title, code }: { title: string; code: string }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-xlayer-green/20 bg-[#080a0f] relative group">
    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-xlayer-green" />
        <span className="text-xs font-mono font-bold text-gray-400">{title}</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto relative">
      <pre className="font-mono text-xs text-gray-300 leading-relaxed">
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell text-right pr-4 text-gray-700 select-none w-6">
                {i + 1}
              </span>
              <span className="table-cell whitespace-pre-wrap">
                {line
                  .replace('contract', '§contract§')
                  .replace('function', '§function§')
                  .replace('address', '§address§')
                  .split('§')
                  .map((part, idx) => {
                    if (part === 'contract' || part === 'function')
                      return (
                        <span key={idx} className="text-purple-400 font-bold">
                          {part}
                        </span>
                      )
                    if (part === 'address')
                      return (
                        <span key={idx} className="text-blue-400">
                          {part}
                        </span>
                      )
                    return part
                  })}
              </span>
            </div>
          ))}
        </code>
      </pre>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
    </div>
  </div>
)

// --- COMPONENTS: INTERACTIVE FLEET MAP ---
const FleetSchematic = ({ onSelectShip }: { onSelectShip: (id: string) => void }) => {
  return (
    <div className="my-8 p-4 bg-[#050505] border border-white/10 rounded-xl relative overflow-hidden flex justify-center">
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"></div>

      <svg viewBox="0 0 400 200" className="w-full max-w-lg h-auto overflow-visible">
        <line
          x1="200"
          y1="50"
          x2="100"
          y2="150"
          stroke="#333"
          strokeWidth="2"
          strokeDasharray="5 5"
          className="animate-pulse"
        />
        <line
          x1="200"
          y1="50"
          x2="300"
          y2="150"
          stroke="#333"
          strokeWidth="2"
          strokeDasharray="5 5"
          className="animate-pulse"
        />

        <g
          onClick={() => onSelectShip('andromeda')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <circle cx="200" cy="50" r="30" fill="#050505" stroke="#f43f5e" strokeWidth="2" />
          <circle
            cx="200"
            cy="50"
            r="25"
            fill="#f43f5e"
            fillOpacity="0.1"
            className="animate-pulse"
          />
          <text x="200" y="54" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
            ANDROMEDA
          </text>
          <text x="200" y="90" textAnchor="middle" fontSize="6" fill="#666">
            GOVERNANCE
          </text>
        </g>

        <g
          onClick={() => onSelectShip('aquila')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <circle cx="100" cy="150" r="20" fill="#050505" stroke="#10b981" strokeWidth="2" />
          <text x="100" y="153" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
            AQUILA
          </text>
          <text x="100" y="180" textAnchor="middle" fontSize="5" fill="#666">
            LIQUIDITY
          </text>
        </g>

        <g
          onClick={() => onSelectShip('quasar')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <circle cx="300" cy="150" r="20" fill="#050505" stroke="#ef4444" strokeWidth="2" />
          <text x="300" y="153" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
            QUASAR
          </text>
          <text x="300" y="180" textAnchor="middle" fontSize="5" fill="#666">
            SECURITY
          </text>
        </g>

        <circle r="3" fill="white">
          <animateMotion dur="2s" repeatCount="indefinite" path="M200,50 L100,150" />
        </circle>
        <circle r="3" fill="white">
          <animateMotion dur="2s" repeatCount="indefinite" path="M200,50 L300,150" begin="1s" />
        </circle>
      </svg>
    </div>
  )
}

// --- DATA GENERATOR ---
const getSystemDocs = (lang: Language, setActiveDoc: (id: string) => void): DocCategory[] => {
  const isTr = lang === 'tr'

  return [
    {
      title: isTr ? 'VERİ ÇEKİRDEĞİ' : 'DATA CORE',
      items: [
        {
          id: 'intro',
          title: isTr ? 'AOXCDAO Nedir?' : 'What is AOXCDAO?',
          type: 'GENERAL',
          content: (
            <div className="space-y-6">
              <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-xlayer-green" />
                {isTr ? 'Sistem Protokolüne Hoş Geldiniz' : 'Welcome to System Protocol'}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isTr
                  ? "AOXCDAO, OKX X Layer ağı üzerinde çalışan, modüler gemi mimarisine sahip yeni nesil bir 'World-Ship' protokolüdür. Burası sadece bir DeFi platformu değil, yaşayan ve nefes alan bir sibernetik organizmadır."
                  : "AOXCDAO is a next-generation 'World-Ship' protocol operating on the OKX X Layer network, featuring a modular ship architecture. This is not just a DeFi platform, but a living, breathing cybernetic organism."}
              </p>

              <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg flex gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs text-blue-200">
                  {isTr ? (
                    <span>
                      İpucu: Metin içinde yeşil ile vurgulanan terimlerin üzerine gelerek{' '}
                      <NeuralTerm
                        term="Neural Glossary"
                        def="Sistem içi teknik terimler sözlüğü."
                      />{' '}
                      tanımlarını görebilirsiniz.
                    </span>
                  ) : (
                    <span>
                      Tip: Hover over green terms to reveal{' '}
                      <NeuralTerm
                        term="Neural Glossary"
                        def="In-system dictionary for technical terms."
                      />{' '}
                      definitions.
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">
                {isTr ? 'Operasyonel Filo Şeması' : 'Operational Fleet Schematic'}
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                {isTr
                  ? 'Detaylı veriye erişmek için aşağıdaki modüllere tıklayın:'
                  : 'Click on modules below to access detailed data:'}
              </p>
              <FleetSchematic onSelectShip={setActiveDoc} />
            </div>
          )
        },
        {
          id: 'tokenomics',
          title: isTr ? 'Token Ekonomisi' : 'Tokenomics',
          type: 'TECHNICAL',
          content: (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">AOXC Tokenomics</h1>
              <p className="text-gray-400 text-sm">
                <NeuralTerm term="AOXC" def="Andromeda Omni X-Layer Core Token" /> is the governance
                and utility fuel of the ecosystem.
              </p>
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-[#111] p-4 rounded border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase">Max Supply</div>
                  <div className="text-lg font-mono text-white">100,000,000</div>
                </div>
                <div className="bg-[#111] p-4 rounded border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase">Network</div>
                  <div className="text-lg font-mono text-white">OKX X Layer (L2)</div>
                </div>
              </div>
              <HoloCode
                title="AOXC.sol (ERC20)"
                code={`contract AOXC is ERC20, AccessControl {\n    constructor() ERC20("AOXC Governance", "AOXC") {\n        _mint(msg.sender, 100_000_000 * 10**18);\n    }\n}`}
              />
            </div>
          )
        }
      ]
    },
    {
      title: isTr ? 'FİLO MODÜLLERİ' : 'FLEET MODULES',
      items: FLEET_MODULES.map(ship => ({
        id: ship.id,
        title: ship.name,
        type: 'TECHNICAL',
        content: (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded bg-${ship.themeColor}-500/20 border border-${ship.themeColor}-500/50 flex items-center justify-center`}
              >
                <div
                  className={`w-3 h-3 bg-${ship.themeColor}-500 rounded-full animate-pulse`}
                ></div>
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white uppercase">
                  {ship.name}
                </h1>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  {ship.role}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#111] rounded-lg border-l-2 border-white/20">
              <p className="text-gray-300 text-sm leading-relaxed">{ship.description}</p>
            </div>

            <h3 className="text-lg font-bold text-white mt-8 flex items-center gap-2">
              <Database className="w-4 h-4 text-xlayer-green" />
              {isTr ? 'Teknik Özellikler' : 'Technical Specs'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-black border border-white/10 rounded">
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Contract</div>
                <div className="text-xs font-mono text-blue-400">{ship.contractRef}</div>
              </div>
              <div className="p-3 bg-black border border-white/10 rounded">
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Treasury Asset
                </div>
                <div className="text-xs font-mono text-white">{ship.treasury.asset}</div>
              </div>
            </div>

            <HoloCode
              title={`${ship.contractRef} Interface`}
              code={`interface I${ship.id.charAt(0).toUpperCase() + ship.id.slice(1)} {\n    function executeModuleOp(bytes calldata data) external returns (bool);\n    function getTreasuryBalance() external view returns (uint256);\n}`}
            />

            <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg flex gap-3 items-start">
              <AlertOctagon className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-yellow-500 uppercase mb-1">
                  {isTr ? 'GÜVENLİK PROTOKOLÜ' : 'SECURITY PROTOCOL'}
                </h4>
                <p className="text-[10px] text-yellow-200/70">
                  {isTr
                    ? "Bu modül sadece 'Andromeda Core' üzerinden gelen çoklu imza (Multisig) yetkilendirmesi ile işlem yapabilir."
                    : "This module can only execute operations via Multisig authorization from 'Andromeda Core'."}
                </p>
              </div>
            </div>
          </div>
        )
      }))
    }
  ]
}

// --- MAIN PAGE COMPONENT ---

export const Documentation: React.FC = () => {
  const { language } = useLanguage()
  const [activeDocId, setActiveDocId] = useState('intro')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const data = useMemo(() => getSystemDocs(language, setActiveDocId), [language])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }
  }

  let activeContent: DocSection | undefined
  data.forEach(cat => {
    const found = cat.items.find(i => i.id === activeDocId)
    if (found) activeContent = found
  })

  const filteredData = useMemo(() => {
    if (!searchQuery) return data
    return data
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.includes(searchQuery.toLowerCase())
        )
      }))
      .filter(cat => cat.items.length > 0)
  }, [data, searchQuery])

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black font-mono text-xlayer-green text-sm">
        <div className="flex flex-col gap-2 w-64">
          <div className="flex justify-between">
            <span>ACCESSING_ARCHIVE...</span>
            <span>[OK]</span>
          </div>
          <div className="flex justify-between">
            <span>DECRYPTING_LORE...</span>
            <span>[OK]</span>
          </div>
          <div className="flex justify-between">
            <span>ESTABLISHING_NEURAL_LINK...</span>
            <span className="animate-pulse">...</span>
          </div>
          <div className="w-full h-1 bg-gray-900 mt-2">
            <div className="h-full bg-xlayer-green animate-[width_1s_ease-out] w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full lg:w-72 shrink-0 bg-[#050505] border border-white/10 rounded-xl flex flex-col overflow-hidden h-full shadow-2xl">
        <div className="p-4 border-b border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 text-white font-bold mb-3 uppercase tracking-widest text-xs">
            <Book className="w-4 h-4 text-xlayer-green" />
            <span>System Index</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Protocol..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:border-xlayer-green/50 outline-none transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-6 scrollbar-thin">
          {filteredData.map((category, idx) => (
            <div key={idx}>
              <div className="px-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers className="w-3 h-3 opacity-50" />
                {category.title}
              </div>
              <div className="space-y-0.5">
                {category.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveDocId(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium rounded-lg transition-all flex items-center justify-between group
                                        ${
                                          activeDocId === item.id
                                            ? 'bg-xlayer-green/10 text-white border-l-2 border-xlayer-green'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                                        }
                                    `}
                  >
                    <div className="flex items-center gap-2">
                      {item.type === 'TECHNICAL' ? (
                        <Cpu className="w-3 h-3 opacity-70" />
                      ) : (
                        <FileText className="w-3 h-3 opacity-70" />
                      )}
                      {item.title}
                    </div>
                    {activeDocId === item.id && (
                      <ChevronRight className="w-3 h-3 text-xlayer-green" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-black border-t border-white/5 text-[9px] text-gray-500 font-mono flex justify-between">
          <span>V4.2.0-STABLE</span>
          <span className="text-xlayer-green flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-xlayer-green rounded-full animate-pulse"></div> ONLINE
          </span>
        </div>
      </div>

      <div className="flex-1 bg-[#050505] border border-white/10 rounded-xl h-full overflow-hidden flex flex-col relative group">
        <div className="absolute top-0 right-0 p-4 pointer-events-none z-0">
          <div className="w-32 h-32 bg-xlayer-green/5 rounded-full blur-[60px]"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0"></div>

        <div
          className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin relative z-10"
          ref={contentRef}
          onScroll={handleScroll}
        >
          {activeContent ? (
            <div
              className="max-w-3xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500"
              key={activeContent.id}
            >
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-8 font-mono uppercase tracking-wider border-b border-white/5 pb-4">
                <span className="text-xlayer-green">ROOT</span>
                <ChevronRight className="w-3 h-3" />
                <span>LIBRARY</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{activeContent.title}</span>
                <span className="ml-auto px-2 py-0.5 bg-white/5 rounded border border-white/10">
                  ID: #{activeContent.id.toUpperCase()}
                </span>
              </div>

              {activeContent.content}

              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center text-center opacity-50">
                <div className="text-[10px] font-mono text-gray-500 mb-2">{'>> END_OF_FILE'}</div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  {language === 'tr' ? 'BİLGİ MÜHÜRLENDİ' : 'INFORMATION SEALED'}
                </div>
                <div className="text-[9px] text-gray-600 mt-1">
                  Authorized by Andromeda High Council
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 font-mono text-xs">
              {'SELECT_FILE_TO_DECRYPT_'}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-white/5 px-6 py-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Book className="w-4 h-4" />
            <span className="hidden sm:inline">READING PROGRESS</span>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-xs mx-4">
            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-xlayer-green to-cyan-400 transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono text-white tabular-nums">
              {Math.round(readingProgress)}%
            </span>
          </div>
          {readingProgress >= 99 && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-500 animate-in fade-in zoom-in duration-300">
              <Share2 className="w-3 h-3" />
              <span>+5 XP</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
