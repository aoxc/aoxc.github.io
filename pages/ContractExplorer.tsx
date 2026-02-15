import React, { useState, useEffect } from 'react'
import {
  Folder,
  FileCode,
  ChevronRight,
  ChevronDown,
  Code2,
  Play,
  Book,
  ShieldCheck,
  AlertTriangle,
  Beaker,
  CheckCircle2,
  Construction,
  Terminal,
  Copy,
  Bug,
  GitPullRequest,
  Zap,
  Network,
  Share2,
  Cpu,
  Layers,
  Search,
  Activity,
  TestTube,
  Anchor,
  Vote,
  Rocket,
  Medal,
  Coins,
  BarChart3,
  Lock
} from 'lucide-react'
import { CONTRACT_TREE } from '../constants'
import { ContractFile, ContractFolder, ContractStatus } from '../types'
import { useLanguage } from '../contexts/LanguageContext'

// --- TYPES & HELPERS ---

interface FileTreeNodeProps {
  node: ContractFolder | ContractFile
  level?: number
  selectedFile: ContractFile | null
  onSelect: (file: ContractFile) => void
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, level = 0, selectedFile, onSelect }) => {
  const [isOpen, setIsOpen] = useState(level < 2)

  if (node.type === 'file') {
    const file = node as ContractFile
    const isSelected = selectedFile?.name === file.name

    let StatusIcon = Construction
    let statusColor = 'text-gray-500'

    switch (file.status) {
      case ContractStatus.MAINNET:
        StatusIcon = ShieldCheck
        statusColor = 'text-xlayer-green'
        break
      case ContractStatus.AUDIT:
        StatusIcon = AlertTriangle
        statusColor = 'text-yellow-500'
        break
      case ContractStatus.TESTNET:
        StatusIcon = Beaker
        statusColor = 'text-blue-400'
        break
      case ContractStatus.DEV:
        StatusIcon = Code2
        statusColor = 'text-orange-400'
        break
      case ContractStatus.DESIGN:
        StatusIcon = Construction
        statusColor = 'text-gray-500'
        break
    }

    return (
      <div
        onClick={() => onSelect(file)}
        className={`
          flex items-center gap-2 py-2 px-3 cursor-pointer rounded-r-full border-l-2 transition-all text-sm group font-mono
          ${
            isSelected
              ? 'bg-white/5 text-white border-xlayer-green'
              : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
          }
        `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-xlayer-green' : 'text-gray-500'}`} />
        <span className="flex-1 truncate text-xs tracking-tight">{file.name}</span>
        <StatusIcon className={`w-3 h-3 ${statusColor} opacity-50 group-hover:opacity-100`} />
      </div>
    )
  }

  const folder = node as ContractFolder
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-2 px-2 cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors text-xs font-bold select-none uppercase tracking-wider"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <Folder className="w-3.5 h-3.5 text-blue-500/80" />
        <span className="truncate">{folder.name}</span>
      </div>
      {isOpen && (
        <div className="border-l border-white/5 ml-3">
          {folder.children.map((child, idx) => (
            <FileTreeNode
              key={idx}
              node={child}
              level={level + 1}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- SUB-COMPONENT: DEPENDENCY VISUALIZER ---
const DependencyVisualizer = ({ fileName }: { fileName: string }) => {
  return (
    <div className="bg-[#080808] border border-white/10 rounded-xl p-4 mb-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2 opacity-30">
        <Network className="w-12 h-12 text-blue-500" />
      </div>
      <h4 className="text-[10px] text-gray-500 font-bold uppercase mb-4 flex items-center gap-2">
        <Activity className="w-3 h-3 text-blue-500" /> Contract Dependency Map
      </h4>

      <div className="flex items-center justify-center gap-4 relative z-10">
        {/* Simulated Nodes */}
        <div className="flex flex-col items-center gap-1 opacity-50">
          <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center bg-[#111]">
            <Layers className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-[8px] text-gray-600">Proxy</span>
        </div>

        <div className="h-[1px] w-8 bg-gray-700"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full border border-xlayer-green flex items-center justify-center bg-xlayer-green/10 shadow-[0_0_15px_rgba(140,209,0,0.3)] animate-pulse">
            <Code2 className="w-5 h-5 text-xlayer-green" />
          </div>
          <span className="text-[9px] text-white font-bold">{fileName.replace('.sol', '')}</span>
        </div>

        <div className="h-[1px] w-8 bg-gray-700 relative">
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-y-1/2 animate-[ping_2s_linear_infinite]"></div>
        </div>

        <div className="flex flex-col items-center gap-1 opacity-80">
          <div className="w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center bg-[#111]">
            <Cpu className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-[8px] text-blue-400">Logic</span>
        </div>
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: LIFECYCLE TRACKER ---
const LifecycleTracker = () => {
  const steps = [
    {
      id: 1,
      label: 'SIMULATION',
      icon: TestTube,
      status: 'DONE',
      color: 'text-green-400',
      bar: 'bg-green-500'
    },
    {
      id: 2,
      label: '7-SHIP ALIGN',
      icon: Anchor,
      status: 'DONE',
      color: 'text-purple-400',
      bar: 'bg-purple-500'
    },
    {
      id: 3,
      label: 'COUNCIL VOTE',
      icon: Vote,
      status: 'ACTIVE',
      color: 'text-blue-400',
      bar: 'bg-blue-500 animate-pulse'
    },
    {
      id: 4,
      label: 'OFFICIAL AUDIT',
      icon: ShieldCheck,
      status: 'WAITING',
      color: 'text-gray-500',
      bar: 'bg-gray-800'
    },
    {
      id: 5,
      label: 'DEPLOYMENT',
      icon: Rocket,
      status: 'LOCKED',
      color: 'text-gray-600',
      bar: 'bg-gray-800'
    }
  ]

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <GitPullRequest className="w-3 h-3 text-xlayer-green" /> Deployment Pipeline
        </h4>
        <span className="text-[9px] text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/30">
          STAGE 3/5
        </span>
      </div>

      <div className="relative flex flex-col gap-4 pl-2">
        {/* Vertical Line */}
        <div className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-gray-800"></div>

        {steps.map((step, idx) => (
          <div key={step.id} className="relative z-10 flex items-center gap-3 group">
            <div
              className={`w-8 h-8 rounded-full border-2 bg-[#0a0a0a] flex items-center justify-center shrink-0 
                            ${
                              step.status === 'DONE'
                                ? 'border-green-500 text-green-500'
                                : step.status === 'ACTIVE'
                                  ? 'border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                  : 'border-gray-700 text-gray-700'
                            }
                        `}
            >
              <step.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-bold ${step.color}`}>{step.label}</span>
                {step.status === 'DONE' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                {step.status === 'ACTIVE' && (
                  <span className="text-[8px] text-blue-400 animate-pulse">IN PROGRESS...</span>
                )}
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${step.status === 'DONE' ? 'w-full bg-green-500' : step.status === 'ACTIVE' ? 'w-[60%] bg-blue-500' : 'w-0'}`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: REWARD CALCULATOR ---
const RewardCalculator = () => {
  return (
    <div className="bg-[#0a0a0a] border border-yellow-500/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Medal className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-bold text-white uppercase">Projected Reward</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-bold text-yellow-500">
          GOLD TIER
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
          <div className="flex items-center gap-2">
            <Coins className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">Total Bounty</span>
          </div>
          <span className="text-sm font-mono font-bold text-white">50,000 AOXC</span>
        </div>

        <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">Advance (20%)</span>
          </div>
          <span className="text-sm font-mono font-bold text-green-400">10,000 AOXC</span>
        </div>

        <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">Royalty Share</span>
          </div>
          <span className="text-sm font-mono font-bold text-purple-400">1.5%</span>
        </div>

        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
          <Lock className="w-3 h-3 text-gray-600" />
          <span className="text-[9px] text-gray-500">Vesting Period: 30 Days Post-Deploy</span>
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black rounded text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20">
        <GitPullRequest className="w-3 h-3" />
        IMPROVE CODE (BOOST REWARD)
      </button>
    </div>
  )
}

export const ContractExplorer: React.FC = () => {
  const { t } = useLanguage()
  const [selectedFile, setSelectedFile] = useState<ContractFile | null>(
    (CONTRACT_TREE[0].children[2] as ContractFolder).children[0] as ContractFile
  ) // Default select
  const [activeTab, setActiveTab] = useState<'code' | 'interact' | 'docs'>('code')

  const getStatusBadge = (status: ContractStatus) => {
    const config = {
      [ContractStatus.MAINNET]: {
        color: 'bg-xlayer-green/10 text-xlayer-green border-xlayer-green/30',
        label: t('status_mainnet'),
        icon: ShieldCheck
      },
      [ContractStatus.AUDIT]: {
        color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
        label: t('status_audit'),
        icon: AlertTriangle
      },
      [ContractStatus.TESTNET]: {
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        label: t('status_testnet'),
        icon: Beaker
      },
      [ContractStatus.DEV]: {
        color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        label: t('status_dev'),
        icon: Code2
      },
      [ContractStatus.DESIGN]: {
        color: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
        label: t('status_design'),
        icon: Construction
      }
    }
    const c = config[status]
    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider ${c.color}`}
      >
        <c.icon className="w-3 h-3" />
        {c.label}
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-4 animate-in fade-in duration-500">
      {/* LEFT: FILE TREE (Explorer) */}
      <div className="w-full lg:w-64 bg-[#050505] border border-white/10 rounded-xl flex flex-col overflow-hidden shrink-0 shadow-xl">
        <div className="p-3 border-b border-white/5 bg-[#080808] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
            <Layers className="w-4 h-4 text-xlayer-green" />
            <span>REPOSITORY</span>
          </div>
          <span className="text-[9px] text-gray-600 font-mono">v4.2.0</span>
        </div>

        {/* Search Bar */}
        <div className="px-2 py-2 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-2 top-2 w-3 h-3 text-gray-600" />
            <input
              type="text"
              placeholder="Search Files..."
              className="w-full bg-[#111] rounded text-[10px] text-gray-300 pl-7 py-1.5 border border-white/5 focus:border-xlayer-green/50 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {CONTRACT_TREE.map((node, idx) => (
            <FileTreeNode
              key={idx}
              node={node}
              selectedFile={selectedFile}
              onSelect={setSelectedFile}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: THE FORGE (Editor & Interaction) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* CENTER: CODE EDITOR */}
        <div className="flex-1 bg-[#050505] border border-white/10 rounded-xl flex flex-col overflow-hidden relative shadow-2xl">
          {selectedFile ? (
            <>
              {/* Editor Header */}
              <div className="h-12 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <FileCode className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white font-mono tracking-tight">
                    {selectedFile.name}
                  </span>
                  {selectedFile.deployedAddress && (
                    <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-[#151515] rounded border border-white/5 text-[9px] font-mono text-gray-400">
                      <div className="w-1.5 h-1.5 bg-xlayer-green rounded-full animate-pulse"></div>
                      <span>{selectedFile.deployedAddress}</span>
                      <Copy className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-white ml-1" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(selectedFile.status)}</div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#080808] border-b border-white/5">
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Code2 className="w-3 h-3" /> Source
                  </button>
                  <button
                    onClick={() => setActiveTab('interact')}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 ${activeTab === 'interact' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Play className="w-3 h-3" /> Interact
                  </button>
                  <button
                    onClick={() => setActiveTab('docs')}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 ${activeTab === 'docs' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Book className="w-3 h-3" /> Docs
                  </button>
                </div>
                <div className="text-[10px] text-gray-600 font-mono">Solidity 0.8.20</div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden relative bg-[#0c0c0c]">
                {/* CODE TAB */}
                {activeTab === 'code' && (
                  <div className="absolute inset-0 overflow-auto scrollbar-thin">
                    <div className="min-h-full font-mono text-xs leading-6 p-4">
                      {selectedFile.content.split('\n').map((line, i) => {
                        // Identify key lines for Audit Badges
                        const isFunction = line.trim().startsWith('function')
                        const isContract = line.trim().startsWith('contract')
                        const hasRisk = line.includes('call') || line.includes('delegatecall')

                        return (
                          <div
                            key={i}
                            className="group flex hover:bg-white/5 -mx-4 px-4 transition-colors relative"
                          >
                            {/* Line Number */}
                            <span className="text-gray-700 select-none w-8 text-right pr-4 flex-shrink-0">
                              {i + 1}
                            </span>

                            {/* Code Content */}
                            <span className="whitespace-pre-wrap text-gray-300 flex-1">
                              {line
                                .replace('contract', '§contract§')
                                .replace('function', '§function§')
                                .replace('import', '§import§')
                                .replace('pragma', '§pragma§')
                                .replace('address', '§address§')
                                .replace('uint256', '§uint256§')
                                .replace('returns', '§returns§')
                                .replace('external', '§external§')
                                .replace('public', '§public§')
                                .split('§')
                                .map((part, idx) => {
                                  if (['contract', 'function', 'import', 'pragma'].includes(part))
                                    return (
                                      <span key={idx} className="text-pink-500 font-bold">
                                        {part}
                                      </span>
                                    )
                                  if (['address', 'uint256', 'bytes32', 'bool'].includes(part))
                                    return (
                                      <span key={idx} className="text-cyan-400">
                                        {part}
                                      </span>
                                    )
                                  if (['returns', 'external', 'public', 'view'].includes(part))
                                    return (
                                      <span key={idx} className="text-blue-400">
                                        {part}
                                      </span>
                                    )
                                  return part
                                })}
                            </span>

                            {/* Hover Actions (The Forge) */}
                            {(isFunction || isContract) && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur rounded px-2 py-0.5 border border-white/10 shadow-xl z-10">
                                {/* Audit Badge */}
                                <div className="flex items-center gap-1 text-[9px] font-bold text-green-400 border-r border-white/20 pr-2 mr-1">
                                  <ShieldCheck className="w-3 h-3" /> AUDITED
                                </div>

                                <button
                                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                                  title="Propose Change"
                                >
                                  <GitPullRequest className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-red-400 transition-colors"
                                  title="Report Bug"
                                >
                                  <Bug className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* INTERACT TAB */}
                {activeTab === 'interact' && (
                  <div className="p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                      <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-2">
                        Read Contract
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase text-gray-500 font-bold">
                            Admin Role
                          </label>
                          <div className="flex gap-2 mt-1">
                            <input
                              disabled
                              value="0x71C...9A23"
                              className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-gray-400"
                            />
                            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs rounded text-white border border-white/10">
                              Query
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                      <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Write Contract
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase text-gray-500 font-bold">
                            executeOp (admin only)
                          </label>
                          <div className="mt-1">
                            <button className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded transition-colors shadow-lg shadow-orange-900/20">
                              Send Transaction
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOCS TAB */}
                {activeTab === 'docs' && (
                  <div className="p-8 prose prose-invert prose-sm max-w-none font-mono">
                    <h1>{selectedFile.name}</h1>
                    <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg mb-4">
                      <p className="m-0 text-xs text-blue-200">
                        This contract is a core component of the AOXCDAO Governance layer. It is
                        verified on X Layer Mainnet.
                      </p>
                    </div>
                    <h3>Methods</h3>
                    <ul>
                      <li>
                        <code>executeOp()</code>: Restricted to ADMIN_ROLE. Triggers DAO logic.
                      </li>
                      <li>
                        <code>grantRole()</code>: Standard AccessControl method.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
              <Code2 className="w-12 h-12 mb-2 opacity-50" />
              <p className="text-xs">Select a file to open The Forge</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: PRO ACTIVE WIDGETS */}
        <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto scrollbar-thin pr-1">
          {/* Dependency Map */}
          {selectedFile && <DependencyVisualizer fileName={selectedFile.name} />}

          {/* LIFECYCLE TRACKER (NEW) */}
          <LifecycleTracker />

          {/* REWARD CALCULATOR (NEW) */}
          <RewardCalculator />
        </div>
      </div>
    </div>
  )
}
