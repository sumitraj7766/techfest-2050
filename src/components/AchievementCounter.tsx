import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Lightbulb, Code2, Globe, TrendingUp } from 'lucide-react';

interface CounterItemProps {
  label: string;
  target: number;
  suffix: string;
  icon: React.ReactNode;
  delay: number;
}

function CounterItem({ label, target, suffix, icon, delay }: CounterItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // ms
    const incrementTime = 16; // 60fps
    const step = target / (duration / incrementTime);
    
    // Stagger start delay
    const timer = setTimeout(() => {
      const counterInterval = setInterval(() => {
        start += step;
        if (start >= target) {
          clearInterval(counterInterval);
          setCount(target);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);
      return () => clearInterval(counterInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md text-center md:text-left space-y-4 group hover:border-purple-500/20 transition-all flex flex-col md:flex-row items-center gap-5"
    >
      <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-medium">
          {label}
        </span>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono">
          {count.toLocaleString()}{suffix}
        </h3>
      </div>
    </motion.div>
  );
}

export default function AchievementCounter() {
  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-6">
      
      {/* HUD border lines */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <CounterItem
          label="GLOBAL PARTICIPANTS"
          target={100000}
          suffix="+"
          icon={<Users className="w-6 h-6" />}
          delay={100}
        />
        <CounterItem
          label="INNOVATIONS SHOWN"
          target={500}
          suffix="+"
          icon={<Lightbulb className="w-6 h-6" />}
          delay={300}
        />
        <CounterItem
          label="CYBER PROJECT REPOS"
          target={1000}
          suffix="+"
          icon={<Code2 className="w-6 h-6" />}
          delay={500}
        />
        <CounterItem
          label="COUNTRIES PARTICIPATING"
          target={50}
          suffix="+"
          icon={<Globe className="w-6 h-6" />}
          delay={700}
        />
      </div>

    </div>
  );
}
