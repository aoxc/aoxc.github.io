import React from 'react';
import { FLEET_MODULES } from '../constants';
import * as Icons from 'lucide-react';
import { FleetCommandWidget } from '../components/FleetCommandWidget';
import { FlagshipWidget } from '../components/FlagshipWidget';
import { ShipModuleCard } from '../components/ShipModuleCard'; 
import { SystemTerminal } from '../components/SystemTerminal'; // Re-imported
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. SECTION: ANDROMEDA FLAGSHIP (AMİRAL GEMİSİ) */}
          <div className="lg:col-span-2">
            <FlagshipWidget />
          </div>
          
          {/* 2. SECTION: SYSTEM TERMINAL (REAL CHAIN DATA) */}
          <div className="lg:col-span-1 h-full min-h-[350px]">
            <SystemTerminal />
          </div>
      </div>

      {/* 3. SECTION: STATS & OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TVL Card - Primary X Layer Green */}
        <div className="bg-gradient-to-br from-[#121212] to-black border border-xlayer-green/30 p-6 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,255,163,0.1)] transition-all">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-xlayer-green to-transparent opacity-50"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-xlayer-green/10 rounded-full blur-3xl group-hover:bg-xlayer-green/20 transition-all duration-500"></div>
          
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{t('tvl_label')}</h3>
          <div className="text-4xl font-display font-bold text-white tracking-tight">$42,509,120</div>
          <div className="mt-3 text-xs text-xlayer-green flex items-center gap-1 font-medium">
            <Icons.TrendingUp className="w-3 h-3" />
            <span>+2.4% (24s)</span>
          </div>
        </div>

        {/* Circulating */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{t('circulating_label')}</h3>
          <div className="text-4xl font-display font-bold text-white tracking-tight">12,400,000</div>
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
             <Icons.CheckCircle2 className="w-3 h-3 text-xlayer-green" />
             {t('verified')} (MintController)
          </div>
        </div>

        {/* Governance */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{t('governance_label')}</h3>
          <div className="text-4xl font-display font-bold text-white tracking-tight">3</div>
          <div className="mt-3 text-xs text-gray-500">{t('last_update')}</div>
        </div>
      </div>

      {/* 4. SECTION: COMMAND CHAIN (Subordinate Captains) */}
      <FleetCommandWidget />

      {/* 5. SECTION: FLEET GRID (Sub-Modules) */}
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Icons.LayoutGrid className="text-xlayer-green" />
          {t('fleet_modules_title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {FLEET_MODULES.filter(s => s.id !== 'andromeda').map((ship) => (
             <ShipModuleCard key={ship.id} ship={ship} />
          ))}
        </div>
      </div>
    </div>
  );
};
