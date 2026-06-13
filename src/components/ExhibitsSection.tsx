import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXHIBITSSET, GALAXY_PLANETS } from '../data';
import { ExhibitItem, GalaxyPlanet } from '../types';
import { Cpu, Atom, ShieldAlert, Rocket, Info, ChevronRight, CpuIcon, Layers, Orbit, Sparkles, Database } from 'lucide-react';

interface ExhibitsSectionProps {
  activeExhibitId: string;
  setActiveExhibitId: (id: string) => void;
  selectedPlanetId: string | null;
  setSelectedPlanetId: (id: string | null) => void;
  hoveredPlanetId: string | null;
}

export default function ExhibitsSection({
  activeExhibitId,
  setActiveExhibitId,
  selectedPlanetId,
  setSelectedPlanetId,
  hoveredPlanetId
}: ExhibitsSectionProps) {
  const [activeTab, setActiveTab] = useState<'pillars' | 'galaxy'>('galaxy');
  const [selectedDetailedBlueprint, setSelectedDetailedBlueprint] = useState<ExhibitItem | null>(null);

  // Pick category icon safely
  const getExhibitIcon = (id: string, colorClass: string) => {
    switch (id) {
      case 'ai-neural':
        return <Cpu className={`w-5 h-5 ${colorClass}`} />;
      case 'quantum-core':
        return <Atom className={`w-5 h-5 ${colorClass}`} />;
      case 'robotics-swarm':
        return <ShieldAlert className={`w-5 h-5 ${colorClass}`} />;
      case 'space-matter':
        return <Rocket className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Info className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  // Find active hovered or selected planet details to show in overlay HUD
  const focusPlanetId = hoveredPlanetId || selectedPlanetId;
  const currentFocusedPlanet = GALAXY_PLANETS.find(p => p.id === focusPlanetId);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-6">
      
      {/* SECTION TITLE & TABS OVERVIEW */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[11px] font-mono tracking-wider uppercase mb-3">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Techfest Universe Hub
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white leading-tight">
            THE GATEWAY GALAXY
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Explore 3D stellar clusters and virtual interactive systems. Select tabs below to shift between geometric planetary meshes and raw specification nodes.
          </p>
        </div>

        {/* Tab Controllers in futuristic segment design */}
        <div className="inline-flex p-1 bg-slate-900 border border-white/10 rounded-xl max-w-sm mx-auto md:mx-0">
          <button
            onClick={() => setActiveTab('galaxy')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'galaxy' 
                ? 'bg-purple-600/90 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>3D GALAXY PLANETS</span>
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pillars' 
                ? 'bg-purple-600/90 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CORE BLUEPRINTS</span>
          </button>
        </div>
      </div>

      {/* RENDER TAB 1: 3D TECHNOLOGY GALAXY (7 PLANETS INTEGRATION) */}
      <AnimatePresence mode="wait">
        {activeTab === 'galaxy' && (
          <motion.div
            key="galaxy-tab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
          >
            {/* Left list of 7 planets with live hover highlights */}
            <div className="lg:col-span-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                7 INTERACTIVE PLANETARY SYSTEM SECTORS
              </span>

              {GALAXY_PLANETS.map((planet) => {
                const isSelected = selectedPlanetId === planet.id;
                const isHovered = hoveredPlanetId === planet.id;
                return (
                  <div
                    key={planet.id}
                    onClick={() => setSelectedPlanetId(isSelected ? null : planet.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : isHovered
                        ? 'border-white/20 bg-slate-900/60'
                        : 'border-white/5 bg-slate-950/20 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: planet.color, boxShadow: `0 0 10px ${planet.color}` }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          {planet.name}
                        </h4>
                        <span className="text-[9px] font-mono text-slate-400">
                          {planet.marketStats}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isSelected ? (
                        <span className="text-[9px] font-mono text-cyan-400 animate-pulse uppercase tracking-wider">
                          CAM FOCUS
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Interactive telemetry and spec detail HUD (Tesla + Vision Pro inspired design) */}
            <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden min-h-[400px]">
              
              {/* Outer corner cyber aesthetics decor */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/20 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500/20 rounded-bl-2xl pointer-events-none" />

              {currentFocusedPlanet ? (
                <div className="space-y-6">
                  {/* Planet Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center border border-white/20 text-xs font-mono font-bold"
                        style={{ color: currentFocusedPlanet.color, borderColor: currentFocusedPlanet.color }}
                      >
                        O
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 tracking-wider uppercase block">
                          SELECTED ORBITAL SYSTEM TELEMETRY
                        </span>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                          {currentFocusedPlanet.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono rounded">
                        {currentFocusedPlanet.marketStats}
                      </span>
                      <button 
                        onClick={() => setSelectedPlanetId(null)}
                        className="p-1 px-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] font-mono border border-white/10 rounded transition-all"
                      >
                        RESET FOCUS
                      </button>
                    </div>
                  </div>

                  {/* Summary & Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                        System Diagnostics
                      </h5>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {currentFocusedPlanet.description}
                      </p>
                      <div className="mt-4 p-3 bg-[#040409]/90 rounded-lg border border-purple-500/15 font-mono text-[10px] text-purple-300">
                        {currentFocusedPlanet.summary}
                      </div>
                    </div>

                    {/* Specifications nodes */}
                    <div>
                      <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2.5">
                        Technical Integrations
                      </h5>
                      <div className="space-y-2">
                        {currentFocusedPlanet.techSpecs.map((spec, index) => (
                          <div
                            key={index}
                            className="bg-slate-900/60 border border-white/5 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-mono text-slate-200"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual warning/hint banner */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
                    <span className="flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      COORDINATES: X[{currentFocusedPlanet.position3D[0]}], Y[{currentFocusedPlanet.position3D[1]}], Z[{currentFocusedPlanet.position3D[2]}]
                    </span>
                    <span className="text-emerald-400 animate-pulse font-bold">
                      &gt; WEBGL 3D CAMERA ATTACHED
                    </span>
                  </div>

                </div>
              ) : (
                <div className="my-auto text-center space-y-4 py-8">
                  <Orbit className="w-12 h-12 text-slate-600 mx-auto animate-spin" style={{ animationDuration: '10s' }} />
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Select a Planet to Focus Camera
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                      Click directly on any listed system, or click on the 3D glowing sphere mesh within the central background galaxy viewport to inspect realcheck specs!
                    </p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* RENDER TAB 2: ORIGINAL CYBERNETIC CORES */}
        {activeTab === 'pillars' && (
          <motion.div
            key="pillars-tab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {EXHIBITSSET.map((exhibit, idx) => {
              const isActive = activeExhibitId === exhibit.id;
              const borderStyle = isActive 
                ? `border-[${exhibit.color}]/40 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-slate-900/60` 
                : 'border-white/10 hover:border-white/20 bg-slate-950/40';

              return (
                <motion.div
                  key={exhibit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setActiveExhibitId(exhibit.id)}
                  className={`flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${borderStyle}`}
                  style={{
                    borderColor: isActive ? exhibit.color : undefined
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        {getExhibitIcon(exhibit.id, `text-[${exhibit.color}]`)}
                      </div>
                      <span 
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: `${exhibit.color}30`,
                          color: exhibit.color,
                          backgroundColor: `${exhibit.color}10`
                        }}
                      >
                        {exhibit.category}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white tracking-wide mb-1.5 leading-snug">
                      {exhibit.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {exhibit.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      MODEL SYSTEM
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDetailedBlueprint(exhibit);
                      }}
                      className="flex items-center gap-1.5 py-1 px-2.5 text-[11px] font-mono text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 rounded-lg transition-all"
                    >
                      Specs <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blueprints Spec Sheet Modal Overlay */}
      <AnimatePresence>
        {selectedDetailedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              style={{ borderTopColor: selectedDetailedBlueprint.color, borderTopWidth: '4px' }}
            >
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none block mb-1">
                    TECHNOLOGY COMPONENT SPECIFICATION
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedDetailedBlueprint.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDetailedBlueprint(null)}
                  className="p-1 px-2.5 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-lg text-xs font-mono transition-all"
                >
                  X
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-[11px] font-mono text-slate-400 tracking-wider mb-2 uppercase">
                    Description & Applications
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedDetailedBlueprint.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono text-slate-400 tracking-wider mb-2.5 uppercase">
                    Core Technical Properties
                  </h4>
                  <div className="space-y-1.5">
                    {selectedDetailedBlueprint.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 px-3 py-2 bg-slate-950/50 border border-white/5 rounded-xl"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: selectedDetailedBlueprint.color }} 
                        />
                        <span className="text-xs font-mono text-slate-200">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: selectedDetailedBlueprint.color }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: selectedDetailedBlueprint.color }}></span>
                    </span>
                    <span className="text-slate-400">Geometry projection:</span>
                  </div>
                  <span className="text-white uppercase font-bold tracking-wider">
                    {selectedDetailedBlueprint.geometryType}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-white/5 flex justify-end gap-3.5">
                <button
                  onClick={() => {
                    setActiveExhibitId(selectedDetailedBlueprint.id);
                    setSelectedDetailedBlueprint(null);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors"
                >
                  Project 3D Hologram
                </button>
                <button
                  onClick={() => setSelectedDetailedBlueprint(null)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-slate-300 rounded-xl text-xs transition-colors"
                >
                  Close BLUEPRINT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
