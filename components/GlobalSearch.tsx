import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, Box, FileText, User, X, ArrowRightLeft } from 'lucide-react';
import { FLEET_MODULES, MOCK_PROPOSALS } from '../constants';
import { PageView } from '../types';

interface SearchResult {
  id: string | number;
  title: string;
  subtitle: string;
  type: 'MODULE' | 'PROPOSAL' | 'USER';
  page: PageView;
  status?: string;
}

interface GlobalSearchProps {
  setPage: (page: PageView) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ setPage }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock Users for search
  const MOCK_USERS = [
    { name: 'Admiral Shepard', rank: 'ADMIRAL', address: '0x71...9A23' },
    { name: 'Cpt. Reynolds', rank: 'CAPTAIN', address: '0x88...BB11' }
  ];

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search Modules
    FLEET_MODULES.forEach(m => {
      if (m.name.toLowerCase().includes(lowerQuery) || m.role.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          id: m.id,
          title: m.name,
          subtitle: m.role,
          type: 'MODULE',
          page: PageView.DASHBOARD,
          status: m.status
        });
      }
    });

    // Search Proposals
    MOCK_PROPOSALS.forEach(p => {
      if (p.title.toLowerCase().includes(lowerQuery) || p.id.toString().includes(lowerQuery)) {
        newResults.push({
          id: p.id,
          title: p.title,
          subtitle: `ID: ${p.id} • ${p.status}`,
          type: 'PROPOSAL',
          page: PageView.GOVERNANCE,
          status: p.status
        });
      }
    });

    // Search Users
    MOCK_USERS.forEach(u => {
      if (u.name.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          id: u.address,
          title: u.name,
          subtitle: u.rank,
          type: 'USER',
          page: PageView.PROFILE
        });
      }
    });

    setResults(newResults);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setPage(result.page);
    setQuery('');
    setIsOpen(false);
    // You could also add logic to scroll to specific items here
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'MODULE': return <Box className="w-4 h-4 text-cyan-400" />;
      case 'PROPOSAL': return <FileText className="w-4 h-4 text-xlayer-magenta" />;
      case 'USER': return <User className="w-4 h-4 text-xlayer-green" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
     switch(type) {
      case 'MODULE': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'PROPOSAL': return 'bg-xlayer-magenta/10 text-xlayer-magenta border-xlayer-magenta/20';
      case 'USER': return 'bg-xlayer-green/10 text-xlayer-green border-xlayer-green/20';
      default: return 'bg-gray-500/10';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={containerRef}>
      {/* Search Input Bar */}
      <div className={`relative group transition-all duration-300 ${isOpen ? 'scale-105' : ''}`}>
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-xlayer-green via-cyan-500 to-xlayer-magenta rounded-xl opacity-20 group-hover:opacity-60 blur transition duration-500 ${isOpen ? 'opacity-80' : ''}`}></div>
        
        <div className="relative flex items-center bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="pl-4 text-gray-400">
            <Search className={`w-5 h-5 transition-colors ${isOpen ? 'text-xlayer-green' : ''}`} />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            placeholder="Sistemde ara (Komutlar, Varlıklar, Personel)..."
            className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-4 outline-none font-sans text-sm tracking-wide"
          />

          <div className="pr-4 flex items-center gap-2">
            {query && (
              <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
              <Command className="w-3 h-3" /> K
            </div>
          </div>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-4 w-full bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header Status Line */}
            <div className="h-1 w-full bg-gradient-to-r from-xlayer-green via-cyan-500 to-xlayer-magenta"></div>
            
            {results.length > 0 ? (
                <div className="py-2">
                    <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Arama Sonuçları</span>
                        <span className="text-xlayer-green">{results.length} Eşleşme</span>
                    </div>
                    {results.map((result, idx) => (
                        <button
                            key={`${result.type}-${result.id}`}
                            onClick={() => handleSelect(result)}
                            className="w-full px-4 py-3 flex items-center gap-4 hover:bg-white/5 border-l-2 border-transparent hover:border-xlayer-green transition-all group"
                        >
                            <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                                {getIcon(result.type)}
                            </div>
                            <div className="text-left flex-1">
                                <div className="text-white font-medium text-sm group-hover:text-xlayer-green transition-colors flex items-center gap-2">
                                    {result.title}
                                    {result.status && (
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${result.status === 'Active' ? 'border-green-500/30 text-green-400' : 'border-gray-500/30 text-gray-400'}`}>
                                            {result.status}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 font-mono mt-0.5">{result.subtitle}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>
            ) : query ? (
                <div className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-3">
                        <Search className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm">Veri akışında sonuç bulunamadı.</p>
                </div>
            ) : (
                <div className="p-4">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Hızlı Erişim</div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => { setPage(PageView.SWAP); setIsOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-xlayer-green/30 transition-all text-left">
                            <div className="w-8 h-8 rounded-full bg-xlayer-green/20 flex items-center justify-center text-xlayer-green"><ArrowRightLeft size={16} /></div>
                            <div>
                                <div className="text-xs font-bold text-white">Hızlı Takas</div>
                                <div className="text-[10px] text-gray-500">USDC to AOXC</div>
                            </div>
                        </button>
                         <button onClick={() => { setPage(PageView.GOVERNANCE); setIsOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-xlayer-magenta/30 transition-all text-left">
                            <div className="w-8 h-8 rounded-full bg-xlayer-magenta/20 flex items-center justify-center text-xlayer-magenta"><FileText size={16} /></div>
                            <div>
                                <div className="text-xs font-bold text-white">Son Oylamalar</div>
                                <div className="text-[10px] text-gray-500">3 Aktif Teklif</div>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};