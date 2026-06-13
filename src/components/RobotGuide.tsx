import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Bot, Cpu, Sparkles, X, ChevronRight } from 'lucide-react';

interface RobotGuideProps {
  activeSection: number;
}

export default function RobotGuide({ activeSection }: RobotGuideProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [typedMessage, setTypedMessage] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const botRef = useRef<HTMLDivElement>(null);

  const tips: Record<number, string> = {
    0: "Greetings, pioneer! I am A.V.A, your neural companion. Try clicking the pulse badge below or tap 'IMPULSE ENERGY BURST' to dispatch a beautiful kinetic shockwave from the WebGL center core!",
    1: "You have entered the Gateway Galaxy. Select any planet in the tab or click directly on the 3D glowing meshes orbiting the scene to zoom the camera and analyze detailed edge metrics.",
    2: "This is our Simulation Console! You have slider controls to change wave Speed, Particle Size, or Ripple force. Toggle color ranges to customize your visual experience.",
    3: "This is the Timeline Matrix. Secure your VIP access pass below! Simply complete the terminal registration form to generate your personal holographic 3D ticket pass."
  };

  // Typist effect when section advances
  useEffect(() => {
    let rawText = tips[activeSection] || "Exploring outer dimension sectors...";
    setTypedMessage('');
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(prev => prev + rawText.charAt(i));
      i++;
      if (i >= rawText.length) {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeSection]);

  // Subtle cursor translation follow parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const factor = 15; // subtle constraint factor
      const tx = (e.clientX - window.innerWidth / 2) / factor;
      const ty = (e.clientY - window.innerHeight / 2) / factor;
      setMousePos({ x: tx * 0.15, y: ty * 0.15 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-auto"
      ref={botRef}
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
      }}
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-slate-950/90 border border-purple-500/35 p-4 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.2)] backdrop-blur-md relative"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex gap-3">
              {/* Bot holographic avatar sphere */}
              <div className="relative shrink-0 select-none">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                {/* Orbital particles rings */}
                <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-2 border border-dashed border-purple-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>

              {/* Speech bubble contents */}
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center gap-1.5 font-mono text-[9px]">
                  <span className="text-purple-400 font-bold uppercase tracking-widest">A.V.A COGNITIVE ASSISTANT</span>
                  <span className="px-1 bg-emerald-500/10 text-emerald-400 rounded">LIVE STREAM</span>
                </div>

                <p className="text-[11px] font-mono text-slate-200 leading-relaxed min-h-[48px]">
                  {typedMessage}
                </p>

                <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-slate-500">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>SECTOR STATE: ALPHA-{activeSection}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimize trigger button layout helper */
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-slate-950/90 border border-purple-500/50 flex items-center justify-center text-purple-400 hover:text-purple-300 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
