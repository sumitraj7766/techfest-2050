import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Zap, Award, Compass, Heart } from 'lucide-react';

interface GrandFinaleProps {
  onTriggerExplosion: () => void;
  isSyncing: boolean;
}

export default function GrandFinale({ onTriggerExplosion, isSyncing }: GrandFinaleProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto py-16 px-6 text-center space-y-12">
      
      {/* Decorative vertical lines representing city skyline indicators */}
      <div className="absolute top-0 inset-x-0 flex justify-between h-40 opacity-10 pointer-events-none px-20">
        <div className="w-[1px] bg-cyan-400 h-full" />
        <div className="w-[1px] bg-purple-400 h-2/3" />
        <div className="w-[1px] bg-pink-400 h-1/2" />
        <div className="w-[1px] bg-orange-400 h-3/4" />
        <div className="w-[1px] bg-purple-400 h-full" />
      </div>

      <div className="space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs rounded-full uppercase tracking-widest cursor-pointer select-none"
          onClick={onTriggerExplosion}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>INITIALIZE GRAND WARP SYSTEM</span>
        </motion.div>

        {/* Giant glowing Techfest logo and Portal message */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase"
          >
            TECHFEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-500 animate-pulse">2050</span>
          </motion.h1>
          <p className="text-xs sm:text-sm tracking-[0.25em] font-mono text-cyan-400 uppercase font-black">
            The Gateway To The Future
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Our neural connections are locked, the quantum core is fully balanced, and the dimensional gateways are open. Experience the high-fidelity culmination of modern human technology.
        </motion.p>
      </div>

      {/* Futuristic central trigger button that explodes everything */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        <button
          onClick={onTriggerExplosion}
          disabled={isSyncing}
          className="relative px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:brightness-110 active:scale-95 text-white font-mono text-xs font-black rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto cursor-pointer"
        >
          <Zap className="w-4 h-4 text-white animate-pulse" />
          <span>COLLAPSE CODES & FIRE SUPERNOVA EXPLOSION</span>
        </button>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
          *WARNING: Spends millions of kinetic 3D WebGL point vectors instantly
        </span>
      </motion.div>

      {/* Structural layout representing cybernetic city coordinate limits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/5 font-mono text-[10px] text-slate-500 relative z-10">
        <div className="space-y-1">
          <span className="text-slate-600 uppercase block font-medium">TERMINAL NODE</span>
          <span className="text-slate-300">CORE_REACTOR_STABLE</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-600 uppercase block font-medium">COGNITIVE LATENCY</span>
          <span className="text-slate-300">0.02ms CHANNELS</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-600 uppercase block font-medium">SECURITY GRID</span>
          <span className="text-slate-300">SHA-256 SYMMETRY</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-600 uppercase block font-medium">WEBGL RENDER</span>
          <span className="text-slate-300">60 FPS SECURE STREAM</span>
        </div>
      </div>

    </div>
  );
}
