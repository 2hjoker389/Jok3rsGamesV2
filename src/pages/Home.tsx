import React, { useState } from 'react';
import gamesData from '../data/games.json';
import { GameCard } from '../components/GameCard';
import { motion } from 'motion/react';
import { Gamepad2, Flame, Trophy, Clock, Search } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', ...new Set(gamesData.map(g => g.category))];
  
  const filteredGames = gamesData.filter(g => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Search and Filters Bento Section */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-gradient-to-br from-red-600 via-orange-600 to-amber-700 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group border border-white/10 shadow-2xl shadow-red-500/20">
          <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30 uppercase tracking-widest">
            Arcade Portal v2.0
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase">
              𝕁𝕠𝕜𝕖𝕣𝕤<span className="text-amber-200">𝔾𝕒𝕞𝕖𝕤</span> 𝕍𝟚
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
              Premium unblocked gaming experience. Discover {gamesData.length}+ hand-picked titles.
            </p>
            
            <div className="relative max-w-md">
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/20 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-red-100 focus:outline-none focus:bg-black/30 transition-all backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-100" />
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-red-500/30 transition-colors">
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
            <Trophy className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Leaderboards</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Connect and compete with global players.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Global Ranking</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">→</div>
          </div>
        </div>
      </section>

      {/* Category Selectors Bento */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center justify-center gap-3 p-5 rounded-3xl border transition-all group ${
              selectedCategory === cat
                ? 'bg-red-600 border-red-500 shadow-lg shadow-red-500/20'
                : 'bg-stone-900 border-stone-800 hover:bg-stone-800 hover:border-stone-700'
            }`}
          >
            <span className={`text-xl group-hover:scale-125 transition-transform ${selectedCategory === cat ? 'text-white' : 'grayscale group-hover:grayscale-0'}`}>
              {cat === 'All' ? '🎮' : cat === 'Puzzle' ? '🧩' : cat === 'Arcade' ? '👾' : cat === 'Racing' ? '🏎️' : '🔥'}
            </span>
            <span className={`font-bold text-xs uppercase tracking-widest ${selectedCategory === cat ? 'text-white' : 'text-slate-400'}`}>
              {cat}
            </span>
          </button>
        ))}
      </section>

      {/* Main Games Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <Flame className="w-6 h-6 text-orange-500" />
            Active Nodes
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Manifest Synced</span>
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          {filteredGames.map((game, index) => {
            const isHero = index === 0 && searchQuery === '' && selectedCategory === 'All';
            return (
              <motion.div 
                key={game.id} 
                variants={item}
                className={isHero ? "lg:col-span-2 lg:row-span-2" : "flex flex-col h-full"}
              >
                <GameCard {...game} />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      
      {/* Meta Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div className="col-span-1 md:col-span-2 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex items-center gap-8 group hover:border-slate-700 transition-colors overflow-hidden relative">
          <div className="w-24 h-24 bg-rose-500 rounded-3xl shrink-0 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-rose-500/20 rotate-3 group-hover:rotate-6 transition-transform">
            XP
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded uppercase tracking-widest">Achievement System</span>
              <h3 className="text-2xl font-bold text-white">Unlock Rewards</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Earn experience points for every minute played. Level up your profile and unlock exclusive neon themes.
            </p>
          </div>
          <button className="ml-auto bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105">
            Join Now
          </button>
          <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -z-0" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-4 hover:border-slate-700 transition-colors">
          <Clock className="w-10 h-10 text-emerald-400" />
          <h3 className="font-bold text-white uppercase tracking-widest text-sm">Low Latency</h3>
          <p className="text-xs text-slate-500 leading-relaxed uppercase font-mono tracking-tighter text-center">
            Nodes: <span className="text-emerald-400">14/14</span><br/>
            Ping: <span className="text-emerald-400">22ms</span>
          </p>
        </div>
      </section>
    </div>
  );
};
