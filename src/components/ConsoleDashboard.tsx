import React, { useState } from 'react';
import { SimulatorConfig } from '../types';
import { Sliders, RefreshCw, Zap, Disc, Code, Cpu } from 'lucide-react';
import { SYSTEM_LOGS } from '../data';

interface ConsoleDashboardProps {
  config: SimulatorConfig;
  setConfig: React.Dispatch<React.SetStateAction<SimulatorConfig>>;
  onBurstTrigger: () => void;
}

export default function ConsoleDashboard({ config, setConfig, onBurstTrigger }: ConsoleDashboardProps) {
  const [logs, setLogs] = useState<string[]>(SYSTEM_LOGS);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const formatted = `[${timestamp}] ${message}`;
    setLogs((prev) => [formatted, ...prev.slice(0, 8)]);
  };

  const handleSliderChange = (key: keyof SimulatorConfig, val: number | string) => {
    setConfig((prev) => ({
      ...prev,
      [key]: val
    }));
    addLog(`SYSTEM_PARAM_UPDATE: ${String(key).toUpperCase()} set to ${val}`);
  };

  const handleThemeChange = (theme: SimulatorConfig['colorTheme']) => {
    setConfig((prev) => ({
      ...prev,
      colorTheme: theme
    }));
    addLog(`CORE_MATRIX_COLOR: Switched to preset [${theme.toUpperCase()}]`);
  };

  const triggerShockwave = () => {
    onBurstTrigger();
    addLog(`FORCE_RESONATOR_TRIGGER: Particle dispersion spike launched!`);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Hardware Sliders Controls */}
        <div className="lg:col-span-7 bg-slate-950/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4.5 h-4.5 text-purple-400" />
                <h3 className="text-base font-semibold text-white tracking-wide">
                  WebGL Vector Controllers
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase tracking-wider animate-pulse">
                Simulation Active
              </span>
            </div>

            {/* Config sliders */}
            <div className="space-y-5">
              {/* SPEED */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Core Spin Rate / Velocity</span>
                  <span className="text-purple-400">{config.speed.toFixed(1)}x rad/s</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) => handleSliderChange('speed', parseFloat(e.target.value))}
                  className="w-full accent-purple-500 py-1 bg-slate-800"
                />
              </div>

              {/* SIZE */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Particle Focal Size</span>
                  <span className="text-purple-400">{config.particleSize.toFixed(3)} px</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.005"
                  value={config.particleSize}
                  onChange={(e) => handleSliderChange('particleSize', parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 py-1 bg-slate-800"
                />
              </div>

              {/* EXPLODE STRENGTH */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Impulse Explosion Strength</span>
                  <span className="text-purple-400">{config.explodeForce.toFixed(2)} N</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={config.explodeForce}
                  onChange={(e) => handleSliderChange('explodeForce', parseFloat(e.target.value))}
                  className="w-full accent-purple-500 py-1 bg-slate-800"
                />
              </div>

              {/* NOISE LEVEL (Wave distortion) */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Dimensional Wave Quantum Noise</span>
                  <span className="text-purple-400">{config.noiseLevel.toFixed(1)} Hz</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="6.0"
                  step="0.2"
                  value={config.noiseLevel}
                  onChange={(e) => handleSliderChange('noiseLevel', parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 py-1 bg-slate-800"
                />
              </div>
            </div>

            {/* Matrix Theme Choosers */}
            <div className="mt-8">
              <h4 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                Preset Color Gradients
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'cyber', label: 'Hyper Pink', class: 'from-purple-500 to-pink-500 border-purple-500/30' },
                  { id: 'emerald', label: 'Emerald Cyber', class: 'from-green-500 to-emerald-600 border-emerald-500/30' },
                  { id: 'quantum', label: 'Quantum Cyan', class: 'from-cyan-400 to-blue-500 border-cyan-500/30' },
                  { id: 'flare', label: 'Solar Flare', class: 'from-orange-500 to-yellow-500 border-orange-500/30' }
                ].map((them) => {
                  const active = config.colorTheme === them.id;
                  return (
                    <button
                      key={them.id}
                      onClick={() => handleThemeChange(them.id as SimulatorConfig['colorTheme'])}
                      className={`relative overflow-hidden p-2.5 border rounded-xl flex flex-col justify-start text-left bg-slate-950 hover:bg-slate-900 transition-all ${
                        active ? 'border-white/40 ring-1 ring-white/20' : 'border-white/5'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-semibold text-white/90">
                        {them.label}
                      </span>
                      <div className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${them.class} mt-2`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Core Shock Burst command */}
          <div className="pt-6 border-t border-white/5 mt-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="text-xs text-slate-400 max-w-sm">
              Pressing the trigger sends a temporary kinetic vector radial impulse to clear the field.
            </div>
            <button
              onClick={triggerShockwave}
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-medium text-xs font-mono rounded-xl border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>DISPERSE WEBGL SPHERE</span>
            </button>
          </div>
        </div>

        {/* Right Side: Hologram Telemetry Stream & Simulated Audio Waves */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Simulated Wave visualization */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-3 mb-4">
                <span className="flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> Live Frequency Monitor
                </span>
                <span>CH: 12-AXIS</span>
              </div>

              {/* Graphical equalizer bar representation */}
              <div className="h-24 flex items-end justify-between gap-[3px] bg-slate-950 border border-white/5 p-2 rounded-xl">
                {Array.from({ length: 28 }).map((_, i) => {
                  // Dynamically scale height based on sliders config to react!
                  const mod = (i * 7) % 11;
                  const factor = config.speed * 20 + config.noiseLevel * 8 + mod * 4;
                  const heightPercentage = Math.min(Math.max((Math.sin(i * 0.3) + 1.2) * factor, 8), 92);

                  return (
                    <div 
                      key={i} 
                      className="w-full rounded-t"
                      style={{
                        height: `${heightPercentage}%`,
                        backgroundColor: config.colorTheme === 'cyber' ? '#a855f7' :
                                         config.colorTheme === 'emerald' ? '#10b981' :
                                         config.colorTheme === 'quantum' ? '#06b6d4' : '#f97316',
                        opacity: 0.3 + (heightPercentage / 130)
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-500 mt-2 text-right">
              Ripples scaling dynamically at {(config.noiseLevel * 440 + 220).toFixed(0)} Hz audio equivalence
            </p>
          </div>

          {/* System Terminal Console Output logs */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3.5 text-xs font-mono text-slate-400">
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>Console Core Sync Logs</span>
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto font-mono text-[10px] text-slate-300">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-1.5 select-all hover:bg-white/5 py-0.5 rounded px-1">
                    <span className="text-purple-400/80">&gt;&gt;</span>
                    <span className={log.includes('PARAM_UPDATE') ? 'text-cyan-400' : log.includes('FORCE') ? 'text-orange-400 font-bold' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-3 border-t border-white/5 mt-4">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400 animate-spin" /> MEM_CACHE: 14.8M
              </span>
              <span>SYNC_PORT: 3000 (LOCAL)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
