import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CornerDownLeft, RefreshCw, BookmarkCheck, Shield, Award } from 'lucide-react';

interface TicketData {
  name: string;
  college: string;
  trackId: string;
  email: string;
  ticketNo: string;
  date: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    trackId: 'Artificial Intelligence',
    email: '',
  });

  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Simple 3D card tilt coordinates for hover
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const tracks = [
    'Artificial Intelligence',
    'Quantum Computing',
    'Robotics & Automation',
    'Aerospace Science'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.college || !formData.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Create random hex suffix for futuristic coordinates ID
      const randomSuffix = Math.floor(0x1000 + Math.random() * 0x9000).toString(16).toUpperCase();
      const randomPrefix = Math.floor(100 + Math.random() * 899).toString();
      const generatedTicketNo = `NX-2026-${randomPrefix}-${randomSuffix}`;
      
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      setTicket({
        name: formData.name,
        college: formData.college,
        trackId: formData.trackId,
        email: formData.email,
        ticketNo: generatedTicketNo,
        date: formattedDate
      });

      setIsSubmitting(false);
    }, 1200);
  };

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ticketRef.current) return;
    const card = ticketRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert coordinate metrics to rotations range (-15 to 15 degrees)
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = (y - midY) / 10;
    const rotY = -(x - midX) / 14;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left column Description */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[11px] font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Portal Entrance Desk
          </div>
          <h2 className="text-3xl font-sans font-medium tracking-tight text-white">
            Secure Attendeeship
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Generate your verified biometric entry pass token for the NEXUS 2026 exhibits and panels. Your pass registers directly in local secure memory.
          </p>
          <div className="pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Biometric authorization encrypted (SHA-256)</span>
            </div>
          </div>
        </div>

        {/* Right column Interactive Form Card */}
        <div className="md:col-span-7 flex justify-center">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              {!ticket ? (
                // 1. STANDARD FORM SUBMISSION SHEET
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onSubmit={handleGenerateTicket}
                  className="p-6 bg-slate-950/60 backdrop-blur-md border border-white/5 rounded-2xl space-y-4 shadow-xl"
                >
                  <h3 className="text-base font-semibold text-white tracking-widest uppercase font-mono border-b border-white/5 pb-3">
                    REGISTRATION PROTOCOL
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        Attendee Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Dr. Arthur Dent"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-white/5 hover:border-white/15 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        University or Institution
                      </label>
                      <input
                        type="text"
                        name="college"
                        required
                        placeholder="e.g. Star Academy of Sciences"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-white/5 hover:border-white/15 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                          Dimensional Track Focus
                        </label>
                        <select
                          name="trackId"
                          value={formData.trackId}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-white/5 focus:border-purple-500 rounded-xl px-4.5 py-2.5 text-xs text-slate-300 outline-none transition-all cursor-pointer"
                        >
                          {tracks.map((t) => (
                            <option key={t} value={t} className="bg-slate-950">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                          Communications Grid (Email)
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. cosmic@dent.space"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-white/5 hover:border-white/15 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-500 active:scale-[0.99] disabled:bg-purple-900/40 text-white font-semibold font-mono text-xs rounded-xl border border-purple-400/20 shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>SYNCHRONIZING ATTENDEESHIP CACHE...</span>
                        </>
                      ) : (
                        <>
                          <span>BUILD ATTENDEE HOLOGRAPHIC PASS</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // 2. DETAILED 3D HOLOGRAPHIC attendee ticket
                <motion.div
                  key="ticket"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-6 w-full"
                >
                  {/* Dynamic 3D Perspective Card Container */}
                  <div
                    ref={ticketRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transition: rotateX === 0 ? 'transform 0.5s ease' : 'none',
                    }}
                    className="relative w-full aspect-[1.8/1] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 p-5 overflow-hidden flex flex-col justify-between shadow-[0_0_35px_rgba(168,85,247,0.25)] select-none pointer-events-auto"
                  >
                    {/* Background Neon Grid Matrix styling */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/50" />
                    
                    {/* Header bar within ticket */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-3 relative z-10">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-purple-400" />
                          <h4 className="text-[10px] font-mono font-bold tracking-widest text-purple-300">
                            NEXUS 2026 // VIP PASS
                          </h4>
                        </div>
                        <p className="text-[8px] font-mono text-slate-500 uppercase mt-0.5 tracking-tight">
                          Biometric Entry token
                        </p>
                      </div>
                      
                      {/* Ticket coordinate tag */}
                      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">
                        SECURE_CONNECT
                      </span>
                    </div>

                    {/* Central attendee specification details */}
                    <div className="grid grid-cols-12 gap-2 my-2 relative z-10 items-center">
                      <div className="col-span-8 space-y-1">
                        <div className="text-[9px] font-mono text-slate-500 uppercase">Attendee Name</div>
                        <div className="text-sm font-bold text-white tracking-wide font-sans leading-none truncate mb-1">
                          {ticket.name}
                        </div>
                        
                        <div className="text-[9px] font-mono text-slate-500 uppercase">Affiliated Body</div>
                        <div className="text-xs text-slate-300 font-sans leading-none truncate">
                          {ticket.college}
                        </div>
                      </div>

                      {/* Right bar section: Track information & scannable bars */}
                      <div className="col-span-4 border-l border-white/10 pl-3.5 space-y-2 text-right">
                        <div>
                          <div className="text-[9px] font-mono text-slate-500 uppercase leading-none">System Core Track</div>
                          <div className="text-[10px] font-bold text-white tracking-tight mt-1 truncate">
                            {ticket.trackId}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-mono text-slate-500 uppercase leading-none">Registered Date</div>
                          <div className="text-[10px] font-mono text-purple-300 mt-0.5">
                            {ticket.date}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer barcode and pass numbers */}
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between relative z-10">
                      <div>
                        <div className="text-[8px] font-mono text-slate-500 uppercase mb-0.5">Lattice Credentials</div>
                        <div className="text-xs font-mono text-white tracking-wider font-bold">
                          {ticket.ticketNo}
                        </div>
                      </div>

                      {/* Futuristic custom pseudo barcode generator */}
                      <div className="flex gap-[2px] h-6 items-end">
                        {[1.2, 0.4, 0.8, 1.5, 0.6, 1.2, 0.3, 1.7, 0.9, 0.4, 1.3, 0.5, 1.1, 0.3, 1.5, 0.6].map((hScalar, i) => (
                          <div
                            key={i}
                            className="w-[1.5px] rounded-t-sm"
                            style={{
                              height: `${hScalar * 14}px`,
                              backgroundColor: i % 3 === 0 ? '#10b981' : '#c084fc',
                              opacity: 0.75
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Overlay hologram light beam effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />
                  </div>

                  {/* Actions under generated Ticket */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      onClick={() => setTicket(null)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                      <span>RE-REGISTER ATTENDEE</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-purple-500/10"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                      <span>PRINT BIO-CREDENTIALS</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
