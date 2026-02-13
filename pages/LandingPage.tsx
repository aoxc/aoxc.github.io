import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ArrowRightLeft, 
  Network, 
  Eye, 
  ShieldAlert, 
  Box, 
  Scale, 
  ChevronRight,
  Construction,
  Activity,
  Globe,
  AlertTriangle,
  LucideIcon
} from 'lucide-react';
import { AOXCLogo } from '../components/AOXCLogo';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onEnter: () => void;
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: Construction Node (The Ships)
// ----------------------------------------------------------------------
const ConstructionNode: React.FC<{
  name: string;
  role: string;
  statusLabel: string;
  icon: LucideIcon;
  position: 'left' | 'right';
  delay: number;
}> = ({ name, role, statusLabel, icon: Icon, position, delay }) => {
  
  const isLeft = position === 'left';

  return (
    <div 
      className={`group relative flex items-center gap-6 w-full max-w-md ${isLeft ? 'flex-row' : 'flex-row-reverse text-right'} animate-in fade-in slide-in-from-bottom-4 duration-1000`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 1. The Holographic Icon/Node */}
      <div className="relative flex-shrink-0">
         {/* Spinning Ring */}
         <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin-slow"></div>
         {/* Inner Glow */}
         <div className="absolute inset-2 bg-cyan-900/20 rounded-full blur-md"></div>
         
         {/* Icon Container */}
         <div className="w-16 h-16 bg-[#050505]/80 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center justify-center relative z-10 group-hover:border-yellow-500 transition-colors duration-500">
            <Icon className="w-6 h-6 text-cyan-400 group-hover:text-yellow-400 transition-colors" />
         </div>

         {/* Connection Line to Center (Visual Only) */}
         <div className={`absolute top-1/2 ${isLeft ? '-right-24' : '-left-24'} w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent hidden xl:block`}>
             <div className="absolute top-0 left-0 w-full h-full bg-cyan-400/50 animate-pulse"></div>
         </div>
      </div>

      {/* 2. Info & Stats */}
      <div className="flex-1 min-w-0">
         <div className="flex flex-col gap-1">
            <h3 className="text-xl font-display font-bold text-white tracking-wider flex items-center gap-2">
               {isLeft ? '' : <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>}
               {name}
               {!isLeft ? '' : <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>}
            </h3>
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-mono">{role}</p>
         </div>

         {/* Construction Bar - FIXED AT 50% */}
         <div className="mt-3 relative">
            <div className="flex justify-between text-[9px] font-mono text-gray-400 mb-1">
               <span>{statusLabel}</span>
               <span className="text-yellow-500 blink">50%</span>
            </div>
            <div className="w-full h-2 bg-[#111] border border-white/10 rounded-full overflow-hidden relative">
               {/* 50% Fill */}
               <div className="h-full w-1/2 bg-yellow-600 relative overflow-hidden">
                   {/* Striped Warning Texture */}
                   <div className="absolute inset-0 bg-construction-stripes opacity-50"></div>
                   {/* Shine Animation */}
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [bootSequence, setBootSequence] = useState(0);
  const { t, language, setLanguage } = useLanguage();

  // Boot sequence effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBootSequence(prev => prev < 100 ? prev + 1 : 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden relative flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* === BACKGROUND LAYERS === */}
      {/* 1. Grid Blueprint */}
      <div className="absolute inset-0 bg-blueprint-grid bg-[length:40px_40px] opacity-10 pointer-events-none"></div>
      
      {/* 2. Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] pointer-events-none"></div>
      
      {/* 3. Random Particles (Stars/Dust) */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-pulse delay-700"></div>
      </div>


      {/* === HEADER === */}
      <header className="relative z-20 w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 relative z-10">
            <Construction className="w-5 h-5 text-yellow-500" />
            <span className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest hidden sm:inline">
               {t('landing_construction_zone')}
            </span>
            <span className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest sm:hidden">
               RESTRICTED AREA
            </span>
          </div>
          
          {/* CENTER LOGO (Transparent) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden md:block">
            <AOXCLogo className="h-12 w-auto" /> 
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <button 
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition-all text-yellow-500/80 hover:text-yellow-400"
            >
                <Globe className="w-3 h-3" />
                {language.toUpperCase()}
            </button>
            <div className="text-[10px] font-mono text-gray-500 hidden md:block">
                {t('landing_secure_protocol')}
            </div>
          </div>
      </header>


      {/* === MAIN BLUEPRINT AREA === */}
      <main className="flex-1 relative z-10 flex flex-col xl:flex-row items-center justify-center p-6 xl:p-0 gap-12 xl:gap-0">
          
          {/* LEFT FLANK (Support Ships) */}
          <div className="flex-1 flex flex-col gap-10 items-end xl:pr-12 w-full xl:w-auto order-2 xl:order-1">
              <ConstructionNode name="AQUILA" role={t('role_liquidity')} statusLabel={t('landing_assembly_status')} icon={ArrowRightLeft} position="left" delay={200} />
              <ConstructionNode name="CENTAURUS" role={t('role_warp')} statusLabel={t('landing_assembly_status')} icon={Network} position="left" delay={400} />
              <ConstructionNode name="PEGASUS" role={t('role_oracle')} statusLabel={t('landing_assembly_status')} icon={Eye} position="left" delay={600} />
          </div>


          {/* CENTER: ANDROMEDA REACTOR (Flagship Core) */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex-shrink-0 flex items-center justify-center order-1 xl:order-2 my-8 xl:my-0">
              
              {/* Outer Rotating Text Ring */}
              <div className="absolute inset-0 animate-spin-slow opacity-30">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path id="curve" d="M 50 50 m -45 0 a 45 45 0 1 1 90 0 a 45 45 0 1 1 -90 0" fill="transparent" />
                    <text>
                        <textPath href="#curve" className="text-[4px] font-mono fill-cyan-400 uppercase tracking-[2px]">
                           {t('landing_andromeda_core')}
                        </textPath>
                    </text>
                 </svg>
              </div>

              {/* Middle Dashed Ring (Reverse Spin) */}
              <div className="absolute inset-8 border border-dashed border-cyan-500/40 rounded-full animate-spin-reverse-slow"></div>
              
              {/* Core Glow */}
              <div className="absolute inset-20 bg-cyan-500/10 rounded-full blur-[50px] animate-pulse"></div>

              {/* CENTERPIECE */}
              <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-4">
                      <Cpu className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1} />
                      <div className="absolute -top-4 -right-4 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter text-center">
                     ANDROMEDA
                  </h1>
                  <div className="px-3 py-1 mt-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                     {t('landing_construction_percent')}
                  </div>
              </div>

              {/* Connection Nodes (Decorations) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-cyan-500/50"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-cyan-500/50"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-1 bg-cyan-500/50"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-1 bg-cyan-500/50"></div>
          </div>


          {/* RIGHT FLANK (Support Ships) */}
          <div className="flex-1 flex flex-col gap-10 items-start xl:pl-12 w-full xl:w-auto order-3">
              <ConstructionNode name="QUASAR" role={t('role_defense')} statusLabel={t('landing_assembly_status')} icon={ShieldAlert} position="right" delay={800} />
              <ConstructionNode name="VIRGO" role={t('role_fabricator')} statusLabel={t('landing_assembly_status')} icon={Box} position="right" delay={1000} />
              <ConstructionNode name="SOMBRERO" role={t('role_policy')} statusLabel={t('landing_assembly_status')} icon={Scale} position="right" delay={1200} />
          </div>

      </main>


      {/* === FOOTER / ENTER CONSOLE === */}
      <footer className="relative z-20 w-full bg-[#050505] border-t border-white/10 p-6 md:p-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* System Status Log (Left Side) */}
            <div className="w-full md:w-1/2 font-mono text-[10px] space-y-2 text-gray-500 hidden md:block">
               <div className="flex items-center gap-2 text-gray-400">
                  <Activity className="w-3 h-3 text-cyan-500" />
                  <span>{t('landing_system_diagnostic')}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  <div className="flex justify-between"><span>{">"} {t('landing_hull')}</span><span className="text-yellow-500">50%</span></div>
                  <div className="flex justify-between"><span>{">"} {t('landing_reactor')}</span><span className="text-yellow-500">50%</span></div>
                  <div className="flex justify-between"><span>{">"} {t('landing_warp')}</span><span className="text-yellow-500">50%</span></div>
                  <div className="flex justify-between"><span>{">"} {t('landing_life')}</span><span className="text-yellow-500">50%</span></div>
               </div>
               <div className="w-full h-1 bg-gray-900 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[50%] animate-pulse"></div>
               </div>
            </div>

            {/* ENTER BUTTON & WARNING AREA (Right Side) */}
            <div className="w-full md:w-auto flex flex-col md:items-end gap-3">
               
               {/* NEW SWEET WARNING MESSAGE */}
               <div className="flex items-center gap-3 px-3 py-2 bg-yellow-900/10 border border-yellow-500/20 rounded-lg animate-pulse w-full md:w-auto">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{t('landing_sim_active')}</span>
                        <span className="text-[9px] text-yellow-200/60 font-mono">{t('landing_sim_warning')}</span>
                    </div>
               </div>

               <button 
                  onClick={onEnter}
                  disabled={bootSequence < 100}
                  className="group relative w-full md:w-72 h-14 bg-white/5 hover:bg-cyan-500/10 border border-white/20 hover:border-cyan-400 text-white overflow-hidden transition-all duration-300"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
               >
                  {/* Button Content */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 z-10">
                      <div className="flex flex-col items-start">
                         <span className="font-display font-bold text-lg tracking-widest group-hover:text-cyan-400 transition-colors">
                            {t('landing_initialize')}
                         </span>
                         <span className="text-[8px] font-mono text-gray-500 group-hover:text-cyan-300">
                            {t('landing_enter')}
                         </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Loading Bar Background */}
                  <div 
                     className="absolute bottom-0 left-0 h-1 bg-cyan-500 transition-all duration-100 ease-linear"
                     style={{ width: `${bootSequence}%` }}
                  ></div>
               </button>
            </div>

          </div>
      </footer>

      {/* Decorative Overlay Lines */}
      <div className="absolute top-0 left-8 h-full w-[1px] bg-white/5 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-8 h-full w-[1px] bg-white/5 pointer-events-none hidden md:block"></div>

    </div>
  );
};
