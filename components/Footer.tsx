import React from 'react'
import { Twitter, Github, Youtube, Globe } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6 border-t border-xlayer-green/20 bg-gradient-to-t from-xlayer-green/10 via-[#050802] to-[#020202] backdrop-blur-xl relative z-10 shadow-[0_-10px_30px_rgba(140,209,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright & Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-xlayer-green animate-pulse shadow-[0_0_8px_#8CD100]"></div>
          <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
            AOXCDAO SYSTEMS © 2024 • RUNNING ON OKX X LAYER
          </span>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 group-hover:text-xlayer-green transition-colors" />
            <span className="text-[10px] font-bold hidden sm:inline group-hover:text-xlayer-green transition-colors">
              DAO
            </span>
          </a>
          <a
            href="https://x.com/AOXCDAO"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <Twitter className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold hidden sm:inline">X / TWITTER</span>
          </a>
          <a
            href="https://www.youtube.com/@AOXCDAO"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <Youtube className="w-3.5 h-3.5 group-hover:text-red-500 transition-colors" />
            <span className="text-[10px] font-bold hidden sm:inline group-hover:text-red-500 transition-colors">
              YOUTUBE
            </span>
          </a>
          <a
            href="https://github.com/aoxc/AOXCDAO"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold hidden sm:inline">GITHUB</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
