import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HOLO_CARDS } from '../data';
import { Sparkles, Calendar, MapPin, Radio, Compass } from 'lucide-react';

export default function EventUniverse() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-6 space-y-8">
      
      {/* Title section */}
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-[11px] font-mono tracking-wider uppercase mb-3">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> Holographic Projections
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white uppercase leading-tight">
          FLOATING EVENT UNIVERSE
        </h2>
        <p className="text-slate-400 mt-2 text-sm max-w-lg">
          Hover over these hovering hologram pods to engage core telemetry filters. Designed with dynamic spatial elevation and structural light emitters.
        </p>
      </div>

      {/* Grid of floating hologram cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {HOLO_CARDS.map((card, idx) => {
          const isHovered = hoveredCardId === card.id;
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredCardId(card.id)}
              onHoverEnd={() => setHoveredCardId(null)}
              className="relative p-5 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-white/10 flex flex-col justify-between min-h-[280px]"
              style={{
                // Floating bounce offsets
                transform: `scale(${isHovered ? 1.05 : 1})`,
                boxShadow: isHovered 
                  ? `0 15px 35px -5px ${card.glow}20, 0 0 15px 0px ${card.glow}25` 
                  : 'none',
                borderColor: isHovered ? card.glow : undefined
              }}
            >
              {/* Animated hover neon light bar on the top edge */}
              <div 
                className="absolute top-0 left-6 right-6 h-[2px] transition-all duration-300" 
                style={{ 
                  backgroundColor: card.glow, 
                  opacity: isHovered ? 1 : 0.2,
                  boxShadow: `0 0 8px ${card.glow}`
                }} 
              />

              {/* Card headers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase"
                    style={{
                      borderColor: `${card.glow}30`,
                      color: card.glow,
                      backgroundColor: `${card.glow}10`
                    }}
                  >
                    {card.category}
                  </span>
                  
                  {/* Glowing core indicator */}
                  <div 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: card.glow }}
                  />
                </div>

                <h3 className="text-sm font-extrabold text-white leading-snug tracking-wide uppercase group-hover:text-pink-300 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card footers with schedule parameters */}
              <div className="pt-4 border-t border-white/5 space-y-2 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{card.date}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{card.venue}</span>
                </div>

                <div 
                  className="flex items-center gap-1 pt-1 text-[9px] font-semibold tracking-wider font-mono uppercase"
                  style={{ color: card.glow }}
                >
                  <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{card.relevance}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </div>
  );
}
