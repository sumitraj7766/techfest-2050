import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Activity, Zap, Play } from 'lucide-react';

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const sysLogs = [
    'Initializing WebGL Context...',
    'Loading shaders: core_vertex.glsl, neon_bloom.frag',
    'Generating 3D Technology Galaxy Coordinates...',
    'Calibrating Quantum Core feedback loop...',
    'Establishing secure neural assistant (A.V.A.) tunnel...',
    'Syncing timeline checkpoints (2026 -> 2050)...',
    'Loading cyberpunk asset maps and HUD meshes...',
    'Matrix sync accomplished. Dimensional warp ready.'
  ];

  useEffect(() => {
    let currentIdx = 0;
    const logInterval = setInterval(() => {
      if (currentIdx < sysLogs.length) {
        setLogs(prev => [...prev, `[ONLINE] ${sysLogs[currentIdx]}`]);
        currentIdx++;
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoaded(true);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + delta, 100);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020206] overflow-hidden">
      {/* Background matrix style neon grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020206] via-transparent to-[#020206]" />
      
      {/* High-tech circular scanner backdrop */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-purple-500/5 animate-pulse max-w-full" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/5 animate-spin max-w-full" style={{ animationDuration: '30s' }} />

      <div className="relative max-w-2xl w-full px-6 flex flex-col justify-between h-[85vh] z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-purple-500/10 pb-4 font-mono text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>SYS_VERSION: CORE-4.9.2</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> SECURE LATTICE</span>
            <span>PORT: 3000 // INGRESS</span>
          </div>
        </div>

        {/* Center Loading progress indicator */}
        <div className="my-auto text-center space-y-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs rounded uppercase tracking-wider"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>SYSTEM INITIALIZATION</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight font-sans">
              TECHFEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">2050</span>
            </h1>
            <p className="text-xs tracking-widest font-semibold font-mono text-cyan-400 uppercase">
              THE FUTURE PORTAL
            </p>
          </div>

          {/* Loader bar and percents */}
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex justify-between font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                {loaded ? 'LINK ESTABLISHED' : 'DOWNLINK PROCESS...'}
              </span>
              <span className="text-purple-400 font-bold">{percent}%</span>
            </div>

            <div className="h-2 w-full bg-slate-900 border border-white/5 rounded-full overflow-hidden p-[2px]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Real-time system diagnostics logging list */}
          <div className="h-32 max-w-lg mx-auto bg-[#040409]/90 border border-purple-500/15 rounded-lg p-3 font-mono text-[9px] text-left text-slate-400 overflow-y-auto space-y-1 scrollbar-thin">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-purple-500">[{10 + index}]</span>
                <span>{log}</span>
              </div>
            ))}
            {percent < 100 && (
              <div className="animate-pulse text-cyan-400">
                &gt; LOADING SYSTEM BLOCKS...
              </div>
            )}
          </div>
        </div>

        {/* Enter Action with AnimatePresence */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence>
            {loaded && (
              <motion.button
                id="enter-portal-button"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={onEnter}
                className="group px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:brightness-110 text-white font-mono text-xs font-bold rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 cursor-pointer border border-white/20 active:scale-95"
              >
                <span>INITIATE QUANTUM PORTAL</span>
                <Play className="w-4 h-4 text-white fill-white group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom system security stamp */}
        <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 font-mono text-[9px] text-slate-600">
          <span>SECURE PROTOCOL // ECC-256</span>
          <span className="text-right">TAP GATEWAY FOR THE NEXT DIMENSION</span>
        </div>

      </div>
    </div>
  );
}
