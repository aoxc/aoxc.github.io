import React from 'react';
import { Twitter, Github, MessageCircle, Send, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6 border-t border-white/5 bg-[#020202] relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright & Brand */}
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-xlayer-green animate-pulse"></div>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                AOXCDAO SYSTEMS © 2024 • RUNNING ON OKX X LAYER
            </span>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
            <a href="#" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <Globe className="w-3.5 h-3.5 group-hover:text-xlayer-green" />
                <span className="text-[10px] font-bold hidden sm:inline">DAO</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <Twitter className="w-3.5 h-3.5 group-hover:text-blue-400" />
                <span className="text-[10px] font-bold hidden sm:inline">X / TWITTER</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <MessageCircle className="w-3.5 h-3.5 group-hover:text-indigo-400" />
                <span className="text-[10px] font-bold hidden sm:inline">DISCORD</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5 group-hover:text-white" />
                <span className="text-[10px] font-bold hidden sm:inline">GITHUB</span>
            </a>
        </div>
      </div>
    </footer>
  );
};