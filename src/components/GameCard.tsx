import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play as PlayIcon } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
}

export const GameCard: React.FC<GameCardProps & { className?: string }> = ({ id, title, thumbnail, category, description, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-slate-700 flex flex-col h-full ${className || ''}`}
    >
      <Link to={`/play/${id}`} className="flex flex-col h-full">
        <div className="aspect-video overflow-hidden relative shrink-0">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Play Now
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 py-0.5 border border-slate-800 rounded">
              #{category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          <div className="mt-auto pt-6 flex justify-end">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
              →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
