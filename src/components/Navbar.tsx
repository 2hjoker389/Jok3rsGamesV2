import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Gamepad2, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="JV2 Logo" 
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
            onError={(e) => {
              // Fallback if image isn't found
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling as HTMLElement;
              if (next) next.style.display = 'block';
            }}
          />
          <span className="text-xl font-bold tracking-tight text-white uppercase hidden group-hover:block transition-all">
            𝕁𝕠𝕜𝕖𝕣𝕤<span className="text-red-500">𝔾𝕒𝕞𝕖𝕤</span> 𝕍𝟚
          </span>
          <span className="text-xl font-bold tracking-tight text-white uppercase sm:block hidden">
            𝕁𝕠𝕜𝕖𝕣𝕤<span className="text-red-500">𝔾𝕒𝕞𝕖𝕤</span> 𝕍𝟚
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Games</Link>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Trending</a>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Categories</a>
        </div>

        <div className="flex items-center gap-4">
          <motion.div 
            initial={false}
            animate={{ width: isSearchOpen ? 240 : 40 }}
            className="relative h-10 flex items-center bg-slate-800 rounded-full border border-slate-700 overflow-hidden"
          >
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            {isSearchOpen && (
              <input 
                autoFocus
                type="text" 
                placeholder="Search games..." 
                className="w-full pl-10 pr-4 bg-transparent text-sm focus:outline-none text-slate-200 placeholder:text-slate-500"
              />
            )}
          </motion.div>
          
          <button className="md:hidden text-slate-400 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
