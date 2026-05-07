import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gamesData from '../data/games.json';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, RotateCcw, Share2, Info } from 'lucide-react';

export const Play: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = gamesData.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!game) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-white mb-4 uppercase italic">Game Not Found</h2>
        <Link to="/" className="text-arcade-accent hover:underline uppercase tracking-widest text-sm">Return Home</Link>
      </div>
    );
  }

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-container');
    if (!document.fullscreenElement) {
      elem?.requestFullscreen().catch(err => {
        alert(`Error escaping into full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors group">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Return to Portal</span>
        </Link>
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
            #{game.category}
          </span>
        </div>
      </div>

      <div className="relative space-y-6">
        {/* Game Container */}
        <div 
          id="game-container"
          className="relative aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl shadow-red-500/10"
        >
          <iframe 
            key={iframeKey}
            src={game.url} 
            className="w-full h-full border-none"
            title={game.title}
            allowFullScreen
            allow="autoplay; gamepad; fullscreen"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">{game.title}</h1>
              <p className="text-slate-500 text-sm mt-1 max-w-xl leading-relaxed">{game.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleRefresh}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
              title="Restart Node"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleFullscreen}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-600 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-red-600/30 hover:bg-red-500 hover:scale-[1.02] transition-all active:scale-95"
            >
              <Maximize2 className="w-4 h-4" />
              Maximize
            </button>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <section className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-6">
            <div className="flex items-center gap-3 text-red-400">
              <Info className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest font-mono">Game Protocol .02</h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              {game.title} is an executive {game.category.toLowerCase()} module optimized for standard browser protocols. Our servers have verified this game for cross-browser performance and input responsiveness. Unblocked at school, work, and public networks.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-slate-800 rounded-xl text-[10px] font-bold text-slate-500 uppercase">Input: Keyboard</div>
              <div className="px-4 py-2 bg-slate-800 rounded-xl text-[10px] font-bold text-slate-500 uppercase">Status: Verified</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-6">
          <div className="flex items-center gap-3 text-rose-400">
            <Share2 className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest font-mono">Transmission</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full py-4 px-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500/20 transition-all text-left">
              Discord Relay
            </button>
            <button className="w-full py-4 px-6 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-700 transition-all text-left">
              Share Frequency
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
