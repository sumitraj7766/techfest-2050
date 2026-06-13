import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Clock, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
  triggerGlobalPulse: () => void;
  isSyncing: boolean;
}

export default function Header({ activeSection, scrollToSection, triggerGlobalPulse, isSyncing }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live system telemetry desk logic - UTC Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { label: 'Portal', index: 0 },
    { label: 'Exhibits', index: 1 },
    { label: 'Simulator Console', index: 2 },
    { label: 'Events Schedule', index: 3 }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-md border-b border-white/5 px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Futuristic Brand Logo */}
        <div 
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 border border-purple-500/30 rounded-lg overflow-hidden bg-slate-950">
            <Cpu className="w-4.5 h-4.5 text-purple-400 group-hover:rotate-90 transition-transform duration-500" />
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-widest text-white uppercase font-sans">
              NEXUS <span className="text-purple-400 font-mono text-xs">2026</span>
            </h1>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight leading-none">TECHFEST PORTAL</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full">
          {menuItems.map((item) => {
            const isActive = activeSection === item.index;
            return (
              <button
                key={item.index}
                onClick={() => scrollToSection(item.index)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'text-white bg-purple-500/20 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.25)]' 
                    : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Telemetry Column */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-400 border-l border-white/10 pl-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{currentTime || 'Syncing...'}</span>
          </div>
          
          <button 
            onClick={triggerGlobalPulse}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-white/10 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 text-slate-300 hover:text-purple-400 rounded-md transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-purple-400' : ''}`} />
            <span>BURST INPUT</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex p-1 text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[57px] left-0 w-full bg-slate-950/95 border-b border-white/10 py-5 px-6 md:hidden flex flex-col gap-3.5 transition-all">
          {menuItems.map((item) => (
            <button
              key={item.index}
              onClick={() => {
                scrollToSection(item.index);
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 px-3.5 rounded-lg border transition-all ${
                activeSection === item.index
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-1" />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 py-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {currentTime || '00:00:00'}
            </span>
            <button
              onClick={() => {
                triggerGlobalPulse();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border border-purple-500/30 text-purple-400 rounded-md bg-purple-500/5"
            >
              Pulse Energy Core
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
