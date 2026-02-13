import React, { useState } from 'react';
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
  Copy
} from 'lucide-react';
import { CONTRACT_TREE } from '../constants';
import { ContractFile, ContractFolder, ContractStatus } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FileTreeNodeProps {
  node: ContractFolder | ContractFile;
  level?: number;
  selectedFile: ContractFile | null;
  onSelect: (file: ContractFile) => void;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, level = 0, selectedFile, onSelect }) => {
  const [isOpen, setIsOpen] = useState(level < 2); // Auto open top levels

  if (node.type === 'file') {
    const file = node as ContractFile;
    const isSelected = selectedFile?.name === file.name;
    
    let StatusIcon = Construction;
    let statusColor = 'text-gray-500';

    switch(file.status) {
      case ContractStatus.MAINNET: StatusIcon = ShieldCheck; statusColor = 'text-xlayer-green'; break;
      case ContractStatus.AUDIT: StatusIcon = AlertTriangle; statusColor = 'text-yellow-500'; break;
      case ContractStatus.TESTNET: StatusIcon = Beaker; statusColor = 'text-blue-400'; break;
      case ContractStatus.DEV: StatusIcon = Code2; statusColor = 'text-orange-400'; break;
      case ContractStatus.DESIGN: StatusIcon = Construction; statusColor = 'text-gray-500'; break;
    }

    return (
      <div 
        onClick={() => onSelect(file)}
        className={`
          flex items-center gap-2 py-1.5 px-2 cursor-pointer rounded-md transition-all text-sm group
          ${isSelected ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
        `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <FileCode className={`w-4 h-4 ${isSelected ? 'text-xlayer-green' : 'text-gray-500'}`} />
        <span className="flex-1 truncate font-mono text-xs">{file.name}</span>
        <StatusIcon className={`w-3 h-3 ${statusColor} opacity-70 group-hover:opacity-100`} />
      </div>
    );
  }

  const folder = node as ContractFolder;
  return (
    <div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 px-2 cursor-pointer text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors text-sm font-bold select-none"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {isOpen ? <ChevronDown className="w-3 h-3 text-gray-500" /> : <ChevronRight className="w-3 h-3 text-gray-500" />}
        <Folder className="w-4 h-4 text-blue-400/80" />
        <span className="truncate">{folder.name}</span>
      </div>
      {isOpen && (
        <div>
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
  );
};

export const ContractExplorer: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<ContractFile | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'interact' | 'docs'>('code');

  const getStatusBadge = (status: ContractStatus) => {
    const config = {
      [ContractStatus.MAINNET]: { color: 'bg-xlayer-green/20 text-xlayer-green border-xlayer-green/30', label: t('status_mainnet'), icon: ShieldCheck },
      [ContractStatus.AUDIT]: { color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30', label: t('status_audit'), icon: AlertTriangle },
      [ContractStatus.TESTNET]: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: t('status_testnet'), icon: Beaker },
      [ContractStatus.DEV]: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: t('status_dev'), icon: Code2 },
      [ContractStatus.DESIGN]: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: t('status_design'), icon: Construction },
    };
    const c = config[status];
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${c.color}`}>
        <c.icon className="w-3 h-3" />
        {c.label}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">
      {/* LEFT: File Explorer */}
      <div className="w-full lg:w-72 bg-[#050505] border border-white/10 rounded-xl flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-white/5 bg-[#0a0a0a]">
           <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Project Root</div>
           <div className="font-mono text-sm text-white flex items-center gap-2">
              <Terminal className="w-3 h-3 text-xlayer-green" />
              ~/AOXCDAO/src
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
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

      {/* RIGHT: Editor & Interaction */}
      <div className="flex-1 bg-[#050505] border border-white/10 rounded-xl flex flex-col overflow-hidden relative">
        {selectedFile ? (
          <>
            {/* Header */}
            <div className="h-16 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-6">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileCode className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-white font-bold font-mono text-sm">{selectedFile.name}</h2>
                        <span className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400 font-mono">{selectedFile.version}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">{selectedFile.description}</div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  {selectedFile.deployedAddress && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] rounded border border-white/5">
                        <div className="w-1.5 h-1.5 bg-xlayer-green rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono text-gray-400">{selectedFile.deployedAddress}</span>
                        <Copy className="w-3 h-3 text-gray-600 cursor-pointer hover:text-white" />
                    </div>
                  )}
                  {getStatusBadge(selectedFile.status)}
               </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 border-b border-white/5 bg-[#050505]">
               <button 
                onClick={() => setActiveTab('code')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'border-xlayer-green text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 <Code2 className="w-3 h-3" /> {t('source_code')}
               </button>
               <button 
                onClick={() => setActiveTab('interact')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'interact' ? 'border-xlayer-green text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 <Play className="w-3 h-3" /> {t('interact')}
               </button>
               <button 
                onClick={() => setActiveTab('docs')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'docs' ? 'border-xlayer-green text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 <Book className="w-3 h-3" /> {t('documentation')}
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-[#080808]">
                {/* CODE VIEW */}
                {activeTab === 'code' && (
                    <div className="absolute inset-0 overflow-auto p-4 font-mono text-xs leading-relaxed text-gray-300 scrollbar-thin">
                        <pre>
                            <code>
                                {selectedFile.content.split('\n').map((line, i) => (
                                    <div key={i} className="table-row">
                                        <span className="table-cell text-right pr-4 text-gray-700 select-none w-8">{i + 1}</span>
                                        <span className="table-cell whitespace-pre-wrap">
                                            {/* Simple Syntax Highlighting Simulation */}
                                            {line.replace('contract', '§contract§')
                                                 .replace('function', '§function§')
                                                 .replace('import', '§import§')
                                                 .replace('pragma', '§pragma§')
                                                 .replace('address', '§address§')
                                                 .replace('uint256', '§uint256§')
                                                 .split('§').map((part, idx) => {
                                                    if (['contract', 'function', 'import', 'pragma'].includes(part)) return <span key={idx} className="text-pink-500">{part}</span>;
                                                    if (['address', 'uint256', 'bytes32', 'bool'].includes(part)) return <span key={idx} className="text-cyan-400">{part}</span>;
                                                    return part;
                                                 })
                                            }
                                        </span>
                                    </div>
                                ))}
                            </code>
                        </pre>
                    </div>
                )}

                {/* INTERACT VIEW */}
                {activeTab === 'interact' && (
                    <div className="p-8 max-w-2xl mx-auto">
                        <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                            <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-2">Read Contract</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold">Admin Role</label>
                                    <div className="flex gap-2 mt-1">
                                        <input disabled value="0x71C...9A23" className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-gray-400" />
                                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs rounded text-white border border-white/10">Query</button>
                                    </div>
                                </div>
                                 <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold">Total Supply</label>
                                    <div className="flex gap-2 mt-1">
                                        <input disabled value="100,000,000" className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-gray-400" />
                                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs rounded text-white border border-white/10">Query</button>
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
                                    <label className="text-[10px] uppercase text-gray-500 font-bold">executeOp (admin only)</label>
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

                 {/* DOCS VIEW */}
                 {activeTab === 'docs' && (
                    <div className="p-8 prose prose-invert prose-sm max-w-none">
                        <h1>{selectedFile.name} Documentation</h1>
                        <p>
                            Bu modül <strong>AOXCDAO</strong> ekosisteminin kritik bir parçasıdır. 
                            {selectedFile.status === ContractStatus.MAINNET ? 
                                " Şu anda X Layer ana ağında aktiftir ve denetlenmiştir." : 
                                " Şu anda geliştirme veya test aşamasındadır."}
                        </p>
                        <h3>Fonksiyonlar</h3>
                        <ul>
                            <li><code>executeOp()</code>: Sadece yönetici rolüne sahip cüzdanlar tarafından tetiklenebilir.</li>
                            <li><code>grantRole()</code>: AccessControl kütüphanesinden miras alınmıştır.</li>
                        </ul>
                        <h3>Güvenlik Notları</h3>
                        <p>
                            ReentrancyGuard kullanılarak "re-entrancy" saldırılarına karşı korunmuştur. 
                            Tüm kritik fonksiyonlar <code>onlyRole</code> değiştiricisi ile korunmaktadır.
                        </p>
                        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <h4 className="text-blue-400 m-0 mb-2">Geliştirici Notu</h4>
                            <p className="m-0 text-gray-400 text-xs">
                                Bu sözleşmenin son denetimi CertiK tarafından yapılmıştır. Rapor hash: <code>QmX...yZ</code>
                            </p>
                        </div>
                    </div>
                )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
             <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Code2 className="w-10 h-10 opacity-50" />
             </div>
             <p className="text-sm">Görüntülemek için soldaki ağaçtan bir dosya seçin.</p>
             <p className="text-xs text-gray-700 mt-2">~/AOXCDAO/src</p>
          </div>
        )}
      </div>
    </div>
  );
};
