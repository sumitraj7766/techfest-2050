import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeCanvas from './components/ThreeCanvas';
import Header from './components/Header';
import ExhibitsSection from './components/ExhibitsSection';
import ConsoleDashboard from './components/ConsoleDashboard';
import TimelineSection from './components/TimelineSection';
import RegisterForm from './components/RegisterForm';
import LoadingScreen from './components/LoadingScreen';
import RobotGuide from './components/RobotGuide';
import EventUniverse from './components/EventUniverse';
import AchievementCounter from './components/AchievementCounter';
import GrandFinale from './components/GrandFinale';
import { SimulatorConfig } from './types';
import { ChevronDown, Sparkles, Activity, Layers, Compass, HelpCircle, Sliders, Zap } from 'lucide-react';

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeExhibitId, setActiveExhibitId] = useState('ai-neural');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Galaxy Planet Focus selection states
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);

  // WebGL parameter options
  const [config, setConfig] = useState<SimulatorConfig>({
    speed: 1.2,
    particleSize: 0.032,
    explodeForce: 0.45,
    gridOpacity: 0.25,
    colorTheme: 'space',
    noiseLevel: 1.8,
  });

  const [triggerExplosion, setTriggerExplosion] = useState(false);

  // Layout refs for Programmatic Snapping Section Scroll
  const secHeroRef = useRef<HTMLDivElement>(null);
  const secExhibitsRef = useRef<HTMLDivElement>(null);
  const secConsoleRef = useRef<HTMLDivElement>(null);
  const secTimelineRef = useRef<HTMLDivElement>(null);

  // Scroll listener to update focal index and progression
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      
      const maxScroll = document.documentElement.scrollHeight - height || 1;
      const progress = scrollY / maxScroll;
      setScrollProgress(progress);

      // Identify closest discrete section
      const threshold = 0.45; // scroll overlap trigger boundary
      let currentIdx = 0;
      
      if (secTimelineRef.current && scrollY >= secTimelineRef.current.offsetTop - height * threshold) {
        currentIdx = 3;
      } else if (secConsoleRef.current && scrollY >= secConsoleRef.current.offsetTop - height * threshold) {
        currentIdx = 2;
      } else if (secExhibitsRef.current && scrollY >= secExhibitsRef.current.offsetTop - height * threshold) {
        currentIdx = 1;
      } else {
        currentIdx = 0;
      }

      setActiveSection(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const refs = [secHeroRef, secExhibitsRef, secConsoleRef, secTimelineRef];
    const targetRef = refs[index];
    if (targetRef && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(index);
    }
  };

  const executeBurstForce = () => {
    setIsSyncing(true);
    setTriggerExplosion(true);
  };

  const handleExplosionComplete = () => {
    setTriggerExplosion(false);
    setIsSyncing(false);
  };

  return (
    <div id="nexus-app-root" className="relative w-full min-h-screen text-slate-100 bg-[#020205] overflow-x-hidden font-sans select-noneSelection-bg-purple-900 selection-text-white">
      
      {/* 1. FUTURISTIC MATRIX LOADING BOOT ENTRY */}
      <AnimatePresence>
        {isAppLoading && (
          <LoadingScreen onEnter={() => setIsAppLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND IMMERSIVE WEBGL PORTAL STAGE */}
      <div id="webgl-canvas-viewport" className="fixed inset-0 w-full h-full z-0 pointer-events-none md:pointer-events-auto overflow-hidden">
        {/* Fallback ambient backdrop gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-[#04040a] to-[#010103] opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
        
        {/* Full Interactive Core Canvas */}
        <ThreeCanvas
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          activeExhibitId={activeExhibitId}
          config={config}
          triggerExplosion={triggerExplosion}
          onExplosionComplete={handleExplosionComplete}
          selectedPlanetId={selectedPlanetId}
          onPlanetSelect={(id) => setSelectedPlanetId(id)}
          hoveredPlanetId={hoveredPlanetId}
          onPlanetHover={(id) => setHoveredPlanetId(id)}
        />
      </div>

      {/* 3. NAVIGATION HEADER */}
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        triggerGlobalPulse={executeBurstForce}
        isSyncing={isSyncing}
      />

      {/* 4. FLOATING PROGRESS SIDEBAR INDICATOR (DESKTOP) */}
      <div id="desktop-progress-rail" className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40 bg-slate-950/45 p-3 rounded-full border border-white/5 backdrop-blur-sm">
        {[
          { label: 'Portal Core - Alpha', desc: 'System entrance' },
          { label: 'Galaxy Hub - Beta', desc: 'Futuristic 3D Planets' },
          { label: 'Simulator Console - Gamma', desc: 'Vector controller arrays' },
          { label: 'Ledger Registry - Delta', desc: 'VIP Event booking node' }
        ].map((sec, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className="group relative flex items-center justify-center w-3 h-3 outline-none cursor-pointer"
              title={sec.label}
              id={`rail-dot-btn-${idx}`}
            >
              {/* Tooltip descriptions */}
              <div className="absolute right-7 py-1 px-2.5 rounded bg-slate-950/95 border border-white/10 text-[9px] uppercase whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5 transition-all text-slate-300 font-mono">
                {sec.label}
              </div>

              {/* Indicator Dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-3 h-3 bg-purple-400 ring-4 ring-purple-500/20 shadow-[0_0_10px_#a855f7]' 
                    : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 5. INTERACTIVE VIRTUAL ROBOT GUIDE AVA */}
      {!isAppLoading && <RobotGuide activeSection={activeSection} />}

      {/* 6. MAIN CONTENT PAGES */}
      <main id="portal-scroller-main" className="relative z-10 w-full">
        
        {/* SECTION 0: LANDING PORTAL (ALPHA DIMENSION) */}
        <section
          id="section-hero"
          ref={secHeroRef}
          className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6"
        >
          {/* Outer systemic detail borders */}
          <div className="absolute top-28 left-6 md:left-20 text-[9px] font-mono text-slate-500 select-none space-y-1">
            <div>PORTAL_ID: NX-PORTAL-001</div>
            <div>STATUS: ONLINE // RENDER CORE ACTIVE</div>
          </div>

          <div className="absolute top-28 right-6 md:right-20 text-[9px] font-mono text-slate-500 text-right select-none space-y-1">
            <div>LATTICE_DYNAMICS: SYNCHRONIZED</div>
            <div>ENGINE: THREE.JS INTERACTIVE</div>
          </div>

          {/* Heading Content Block */}
          <div id="hero-middle-body" className="max-w-4xl mx-auto text-center my-auto pt-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/15 border border-purple-500/35 text-purple-400 font-mono text-xs rounded-full mb-6 uppercase tracking-widest cursor-pointer select-none hover:bg-purple-500/25 active:scale-95 transition-all"
              onClick={executeBurstForce}
              id="hologram-pulse-badge"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Tap to Dispatch Kinetic Shockwave</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-none font-sans"
              id="hero-main-title"
            >
              TECHFEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-450 via-pink-400 to-cyan-405">2050</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8 font-sans"
              id="hero-pitch-paragraph"
            >
              Enter an immersive futuristic experience that feels like stepping through a physical portal to the future of technology, powered by neural galaxies and quantum configurations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              id="hero-call-to-actions"
            >
              <button
                onClick={() => scrollToSection(1)}
                className="w-full sm:w-auto px-7 py-3 bg-purple-600 hover:bg-purple-550 active:scale-95 text-white font-semibold text-xs font-mono rounded-xl border border-purple-400/20 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="enter-exhibit-btn"
              >
                <span>ENTER THE GALAXY</span>
                <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              </button>

              <button
                onClick={executeBurstForce}
                disabled={isSyncing}
                className="w-full sm:w-auto px-7 py-3 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-300 hover:text-purple-400 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                id="shock-pulse-btn"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span>IMPULSE ENERGY BURST</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Telemetry & Scroll indicators */}
          <div id="hero-bottom-columns" className="flex items-end justify-between max-w-7xl mx-auto w-full pt-8 relative z-20">
            {/* Quick Live stats telemetry */}
            <div className="hidden sm:flex flex-col gap-1.5 text-left font-mono text-[9px] text-slate-500 select-none">
              <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-purple-400 shrink-0" /> PORTAL ENERGY STATE: UNLOCKED</span>
              <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> PARTICLE DENSITY: 1,400 COEFFICIENTS</span>
            </div>

            {/* Centered Scroll Suggestor */}
            <div 
              onClick={() => scrollToSection(1)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group mx-auto text-slate-500 hover:text-purple-400 transition-colors"
              id="scroll-suggestion-indicator"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase">
                SCROLL INTO PORTAL
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
            </div>

            {/* License Stamp */}
            <div className="hidden sm:block text-right font-mono text-[9px] text-slate-500 select-none">
              NEXUS LICENSE // COGNITIVE CORE v1.0
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE GALAXY HUB (BETA DIMENSION) */}
        <section
          id="section-exhibits"
          ref={secExhibitsRef}
          className="relative min-h-screen w-full flex items-center bg-slate-950/15 border-y border-white/5 py-12"
        >
          <ExhibitsSection
            activeExhibitId={activeExhibitId}
            setActiveExhibitId={setActiveExhibitId}
            selectedPlanetId={selectedPlanetId}
            setSelectedPlanetId={setSelectedPlanetId}
            hoveredPlanetId={hoveredPlanetId}
          />
        </section>

        {/* EXTRA IMMERSIVE COMPONENT: FLOATING EXPERIENCE UNIVERSE CARDS */}
        <section className="relative w-full py-10 bg-[#04040a]/40 border-b border-white/5">
          <EventUniverse />
        </section>

        {/* SECTION 2: SIMULATOR CONSOLE & SANDBOX (GAMMA DIMENSION) */}
        <section
          id="section-console"
          ref={secConsoleRef}
          className="relative min-h-screen w-full flex items-center py-12"
        >
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 mb-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[11px] font-mono tracking-wider uppercase mb-3">
                <Sliders className="w-3.5 h-3.5" /> Simulation Core Console
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white uppercase">
                Interactive Core Reactor Simulator
              </h2>
              <p className="text-slate-400 mt-2 text-sm max-w-xl">
                Tune the parameters of the central energy core in real-time. Speed, particles sizing, color palettes, and kinetic noise ripple bounds can be calibrated instantly.
              </p>
            </div>

            <ConsoleDashboard
              config={config}
              setConfig={setConfig}
              onBurstTrigger={executeBurstForce}
            />
          </div>
        </section>

        {/* EXTRA IMMERSIVE STATISTIC COUNTERS GRAPH */}
        <section className="relative w-full py-6 bg-slate-950/10">
          <AchievementCounter />
        </section>

        {/* SECTION 3: EVENTS SCHEDULE & VIP REGISTER (DELTA DIMENSION) */}
        <section
          id="section-timeline-register"
          ref={secTimelineRef}
          className="relative min-h-screen w-full flex flex-col justify-center bg-[#030308]/50 border-t border-white/5 py-16"
        >
          <div id="timeline-container-mesh" className="w-full">
            <TimelineSection />
          </div>

          <div id="register-container-mesh" className="w-full mt-10 border-t border-white/5 pt-10">
            <RegisterForm />
          </div>
        </section>

        {/* EXTRA EPIC GRAND FINALE BLOCK */}
        <section className="relative w-full py-16 border-t border-white/10 bg-gradient-to-b from-[#020205] to-[#04040d]">
          <GrandFinale onTriggerExplosion={executeBurstForce} isSyncing={isSyncing} />
        </section>

      </main>

      {/* 7. FUTURE ECOSYSTEM FOOTER */}
      <footer id="nexus-portal-footer" className="relative z-10 w-full bg-[#020205] border-t border-white/10 px-6 py-12 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-bold tracking-widest text-white uppercase">
              TECHFEST: THE FUTURE PORTAL
            </h4>
            <p className="text-xs text-slate-500 font-mono">
              Designed as a fully virtual, interactive 3D WebGL projection gateway. Preserving all human telemetry.
            </p>
          </div>

          {/* Quick legal stats and instructions */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-550 text-slate-400">
            <span className="hover:text-purple-400 cursor-help flex items-center gap-1.5" onClick={() => setIsPromptOpen(true)}>
              <HelpCircle className="w-3.5 h-3.5" /> Matrix Controls Info
            </span>
            <span>STANDALONE CLIENT CONTEXT</span>
            <span>© 2050 TECHFEST. All digital vectors secure.</span>
          </div>
        </div>
      </footer>

      {/* Instructions Overlay Modal */}
      <AnimatePresence>
        {isPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-2 uppercase font-mono">
                HOLOGRAPHIC NAVIGATION MANUAL
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300 font-mono list-disc list-inside">
                <li><strong className="text-purple-400">Orbit Parallax:</strong> Drag or hover your pointer coordinates to tilt the viewport and view central nodes in real 3D.</li>
                <li><strong className="text-purple-400">Planetary Focus:</strong> Select any planetary item to dynamically transition the WebGL cameras closely.</li>
                <li><strong className="text-purple-400">Sandbox Modulation:</strong> Fine-tune physics metrics (Speed, Size, Ripple theme) asynchronously using the parameters console.</li>
                <li><strong className="text-purple-400">Shockwave Supernova:</strong> Fire the manual trigger supernova button to distribute particle coordinates in speed vectors.</li>
              </ul>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsPromptOpen(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl font-mono transition-all cursor-pointer"
                >
                  SYSTEMS NOMINAL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
