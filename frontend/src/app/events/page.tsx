"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, ExternalLink, ArrowLeft, Clock, Video, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "CodeVerse Summer Hackathon 2026",
    type: "Hackathon",
    date: "August 14 - 17, 2026",
    time: "4:00 PM UTC",
    location: "Virtual (Discord & CodeVerse IDE)",
    registered: 3410,
    desc: "Collaborate with developers worldwide. Build a functional web application using our custom LLM Agents and sandbox compilation pipelines in 72 hours. $15,000 cash prizes.",
    icon: Trophy,
    color: "from-amber-500/20 to-yellow-500/20 text-yellow-400 border-yellow-500/10"
  },
  {
    id: 2,
    title: "AI Developer Assistant Architecture Workshop",
    type: "Workshop",
    date: "August 28, 2026",
    time: "6:00 PM UTC",
    location: "Live Stream / Zoom webinar",
    registered: 1890,
    desc: "Join our core engineers for a technical walkthrough on orchestrating stateful agents, writing secure Docker wrappers, and fine-tuning compilers for real-time runs.",
    icon: Video,
    color: "from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-emerald-500/10"
  },
  {
    id: 3,
    title: "Weekly Competitive Algorithms Tournament #12",
    type: "Tournament",
    date: "September 02, 2026",
    time: "3:00 PM UTC",
    location: "CodeVerse Challenge Sandbox",
    registered: 890,
    desc: "Solve 4 complex data structures problems in 90 minutes. Top 10 users earn localized profile XP badges and priority placement in recruitment pools.",
    icon: Trophy,
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/10"
  }
];

const PAST_EVENTS = [
  {
    id: 4,
    title: "Getting Hired as a Software Engineer: AI Resume Audits & AMA",
    type: "Live AMA",
    date: "July 10, 2026",
    location: "YouTube Archive / Discord",
    attendees: 2100,
    desc: "An interactive Q&A session exploring resume structure templates, standard mock technical interviews, and automated evaluation tools."
  },
  {
    id: 5,
    title: "V8 Engine Internals & JavaScript Closures Masterclass",
    type: "Masterclass",
    date: "June 25, 2026",
    location: "Workshop Archive",
    attendees: 1450,
    desc: "Deep dive into JS runtime structures, garbage collection triggers, double-pointer references, and writing high-throughput functions."
  }
];

export default function EventsPage() {
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(new Set());

  const handleToggleJoin = (eventId: number) => {
    setJoinedEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
        alert("You have left the event schedule.");
      } else {
        next.add(eventId);
        alert("You have registered successfully! Event details and calendar links will be sent to your email.");
      }
      return next;
    });
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10 text-white font-sans">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
          
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Events</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Join live workshops, compete in hackathons, and challenge other engineers in code tournaments.
            </p>
          </motion.div>

          {/* Upcoming Events */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold border-b border-white/5 pb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-emerald-400" /> Upcoming Schedules
            </h2>

            <div className="space-y-6">
              {UPCOMING_EVENTS.map((ev, idx) => {
                const Icon = ev.icon;
                const isJoined = joinedEvents.has(ev.id);
                return (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-white/10 hover:shadow-lg transition-all flex flex-col lg:flex-row gap-6 justify-between group"
                  >
                    <div className="space-y-4 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${ev.color}`}>
                          {ev.type}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {ev.registered.toLocaleString()} Registered
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {ev.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                        {ev.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400 font-mono pt-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span>{ev.date} @ {ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col justify-end lg:justify-center items-center shrink-0 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                      <button
                        onClick={() => handleToggleJoin(ev.id)}
                        className={`w-full lg:w-40 py-3 rounded-xl text-xs font-bold transition-all ${
                          isJoined
                            ? "bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300"
                            : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10"
                        }`}
                      >
                        {isJoined ? "Leave Event" : "Register / Join"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Past Events */}
          <div className="space-y-8 pt-8">
            <h2 className="text-2xl font-bold border-b border-white/5 pb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-slate-400" /> Past Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PAST_EVENTS.map((ev, idx) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.2 }}
                  className="bg-slate-900/20 border border-white/5 p-6 rounded-2xl space-y-4 hover:border-white/10 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                        {ev.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{ev.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-1">{ev.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">{ev.desc}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                    <span>👥 {ev.attendees.toLocaleString()} Attendees</span>
                    <button
                      onClick={() => alert(`Opening archive stream for: '${ev.title}'`)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      Watch Stream <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
