import React from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bento-bg">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        {children}
      </main>
      <footer className="h-16 border-t border-slate-800 flex items-center justify-between px-8 text-[10px] text-slate-500 shrink-0 bg-slate-950">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            ACTIVE NODES: <span className="text-emerald-400 font-mono">14/14 ONLINE</span>
          </span>
          <span className="flex items-center gap-2">
            LATENCY: <span className="text-emerald-400 font-mono">22MS</span>
          </span>
        </div>
        <div className="flex gap-6 uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">DMCA</a>
          <span className="text-slate-800">|</span>
          <span className="text-slate-600 tracking-normal font-normal normal-case">Nexus Arcade © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};
