import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEDULEET, TIMELINE_MILESTONES } from '../data';
import { TimelineEvent, TimelineMilestone } from '../types';
import { Calendar, User, Trophy, Ticket, CheckCircle, Sparkles, TrendingUp, Compass, Zap } from 'lucide-react';

export default function TimelineSection() {
  const [events, setEvents] = useState<TimelineEvent[]>(SCHEDULEET);
  const [filter, setFilter] = useState<string>('all');
  const [bookedIds, setBookedIds] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Innovation timeline states
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<string>('2026');

  // Find currently highlighted milestone
  const activeMilestone = TIMELINE_MILESTONES.find(m => m.year === selectedMilestoneYear) || TIMELINE_MILESTONES[0];

  const handleBookSeat = (eventId: string) => {
    if (bookedIds.includes(eventId)) return;

    setEvents((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id === eventId && evt.slotsLeft > 0) {
          return { ...evt, slotsLeft: evt.slotsLeft - 1 };
        }
        return evt;
      })
    );

    setBookedIds((prev) => [...prev, eventId]);
    const targetEvent = events.find((e) => e.id === eventId);
    if (targetEvent) {
      setSuccessMsg(`ACCESS CREDENTIALS SECURED: Registered for "${targetEvent.title}"!`);
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  const filteredEvents = events.filter((evt) => {
    if (filter === 'all') return true;
    return evt.type === filter;
  });

  const getCategoryColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'keynote':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'hackathon':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'workshop':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'exhibition':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-6 space-y-16">
      
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2026 -> 2050 INNOVATION TIMELINE BLOCK */}
      <div className="space-y-8">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[11px] font-mono tracking-wider uppercase mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> Chronological Roadmap
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white uppercase">
            THE CHRONO MATRIX (2026 → 2050)
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Click through our futuristic chronological milestone pathway to preview coming eras of computational expansion, quantum integration, and stellar cyber-civilizations.
          </p>
        </div>

        {/* Dynamic Horizontal timeline gauge map */}
        <div className="relative p-6 bg-slate-950/40 border border-white/5 rounded-2xl backdrop-blur-sm">
          {/* Main timeline linking cable track */}
          <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 -translate-y-1/2 opacity-30 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {TIMELINE_MILESTONES.map((ms, index) => {
              const isSelected = selectedMilestoneYear === ms.year;
              return (
                <div
                  key={ms.year}
                  onClick={() => setSelectedMilestoneYear(ms.year)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-center md:text-left relative group ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-purple-500/70 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'border-white/5 bg-slate-950/20 hover:border-white/10'
                  }`}
                >
                  {/* Dynamic dot locator */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-6 md:translate-x-0 hidden md:block">
                    <div 
                      className={`w-4 h-4 rounded-full border-2 border-slate-950 transition-all ${
                        isSelected ? 'bg-purple-400 scale-125' : 'bg-slate-700 group-hover:bg-slate-300'
                      }`}
                      style={{
                        backgroundColor: isSelected ? ms.color : undefined,
                        boxShadow: isSelected ? `0 0 10px ${ms.color}` : undefined
                      }}
                    />
                  </div>

                  <span 
                    className="text-xs font-mono font-black"
                    style={{ color: ms.color }}
                  >
                    YEAR {ms.year}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                    {ms.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {ms.description}
                  </p>
                  <span className="inline-block mt-3 text-[9px] font-mono tracking-widest text-[#a855f7] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                    {ms.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail expansion cards panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-950/60 p-6 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden">
          {/* Cyber accents design */}
          <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: activeMilestone.color }} />
          
          <div className="md:col-span-4 space-y-3 pl-4">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase block">
              CHOSEN TEMPORAL MATRIX NODE
            </span>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              ERA {activeMilestone.year}
            </h3>
            <span 
              className="px-2.5 py-0.5 rounded font-mono text-xs border inline-block"
              style={{
                borderColor: `${activeMilestone.color}40`,
                color: activeMilestone.color,
                backgroundColor: `${activeMilestone.color}10`
              }}
            >
              {activeMilestone.status}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pt-2">
              {activeMilestone.description}
            </p>
          </div>

          {/* Core insights panel list */}
          <div className="md:col-span-8 space-y-4">
            <h5 className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 leading-none">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Strategic Technology Forecast
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeMilestone.futureInsights.map((insight, id) => (
                <div
                  key={id}
                  className="bg-[#030308]/90 border border-white/5 p-3 rounded-xl flex items-start gap-2.5 hover:border-purple-500/20 transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
                  <span className="text-xs text-slate-200 font-mono leading-relaxed group-hover:text-white transition-colors">
                    {insight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EVENT SCHEDULE MATRIX */}
      <div className="space-y-8 pt-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[11px] font-mono tracking-wider uppercase mb-3">
              <Calendar className="w-3.5 h-3.5 animate-pulse" /> Live Event Ledger
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Ledger of Daily Live Operations
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-lg">
              Secure virtual seat keys for panel reviews, technical workshops, and high-value esports prize matrices.
            </p>
          </div>

          {/* Filter list */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {['all', 'keynote', 'hackathon', 'workshop', 'exhibition'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-purple-600 border border-purple-400/30 text-white shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger nodes */}
        <div className="space-y-4 max-w-5xl relative z-10">
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/20 rounded-2xl border border-white/5 text-slate-500 text-xs font-mono">
              No daily events matching category filters.
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isBooked = bookedIds.includes(evt.id);
              const isSoldOut = evt.slotsLeft <= 0;

              return (
                <motion.div
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 bg-slate-950/50 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between transition-all"
                >
                  {/* Left node parameters */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-purple-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-md">
                        {evt.time}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 border rounded uppercase ${getCategoryColor(evt.type)}`}>
                        {evt.type}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide leading-tight uppercase">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
                        {evt.subtitle}
                      </p>
                    </div>

                    {/* Speaker/Prize badges */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-xs text-slate-300 font-mono">
                      {evt.speaker && (
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <User className="w-3.5 h-3.5 text-purple-405 shrink-0" />
                          <span>Panel: <strong className="text-slate-300 font-normal">{evt.speaker}</strong></span>
                        </span>
                      )}

                      {evt.prize && (
                        <span className="flex items-center gap-1.5 text-yellow-500 animate-pulse">
                          <Trophy className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                          <span>Prize Pool: <strong className="text-yellow-400 font-bold">{evt.prize}</strong></span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right trigger panel */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end w-full md:w-auto gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                    <div className="text-right text-xs font-mono">
                      <div className="text-slate-500 text-[10px] uppercase">
                        Access Key Pool
                      </div>
                      {isSoldOut ? (
                        <span className="text-red-400 font-bold tracking-wider text-[11px] animate-pulse">
                          CAPACITY REACHED
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-black">
                          {evt.slotsLeft} SEATS FREE
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBookSeat(evt.id)}
                      disabled={isSoldOut || isBooked}
                      className={`px-5 py-2.5 font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all w-full md:w-40 cursor-pointer active:scale-95 ${
                        isBooked
                          ? 'bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 cursor-default'
                          : isSoldOut
                          ? 'bg-slate-900 border border-white/5 text-slate-600 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      }`}
                    >
                      {isBooked ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>RESERVED</span>
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4 text-slate-100 shrink-0" />
                          <span>BOOK PASS</span>
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
