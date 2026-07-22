"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Calendar, Heart, Globe, Award, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CareersPage() {
  const benefits = [
    {
      icon: Globe,
      title: "100% Distributed Team",
      desc: "Work from anywhere in the world. We focus on impact, trust, and output rather than time cards."
    },
    {
      icon: Heart,
      title: "Health & Wellbeing",
      desc: "Comprehensive health insurance, digital fitness allowances, and flexible vacation schedules."
    },
    {
      icon: Award,
      title: "Education Budget",
      desc: "Annual budget for developer courses, hardware setup, technical books, and global conferences."
    }
  ];

  const jobs = [
    {
      title: "Senior Full-Stack Engineer",
      dept: "Engineering",
      location: "Remote (Global)",
      salary: "$120k - $160k",
      type: "Full-Time",
      desc: "Help scale our interactive compilation sandbox, real-time code parsing pipelines, and Next.js layout."
    },
    {
      title: "AI Research Engineer",
      dept: "Artificial Intelligence",
      location: "Remote (US/EU Timezones)",
      salary: "$140k - $180k",
      type: "Full-Time",
      desc: "Design and implement custom LLM agents, coding tutors, and automated mock-interview evaluators."
    },
    {
      title: "Senior Product Designer",
      dept: "Product Design",
      location: "Remote (Global)",
      salary: "$100k - $130k",
      type: "Full-Time",
      desc: "Own UI/UX. Build clean glassmorphism interfaces, smooth Framer Motion micro-interactions, and dark dashboards."
    },
    {
      title: "Developer Relations Manager",
      dept: "Marketing & Growth",
      location: "Remote (Global)",
      salary: "$90k - $110k",
      type: "Full-Time",
      desc: "Build community, advocate for open source, write engineering blogs, and run virtual hackathons."
    }
  ];

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10 text-white font-sans">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Team</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Help us shape the future of software engineering education. Build tools that empower millions of developers worldwide.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Why CodeVerse?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((b, idx) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl space-y-4 hover:border-white/10 transition-all hover:-translate-y-0.5 duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{b.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="space-y-8 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  Open Positions
                </h2>
                <p className="text-slate-400 text-xs mt-1">Filter by department or location. Join us today.</p>
              </div>
              <div className="text-xs bg-slate-900 border border-white/10 px-3.5 py-1.5 rounded-xl font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                4 Active Openings
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.3 }}
                  className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex flex-col md:flex-row justify-between gap-6 group"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{job.dept}</span>
                      <span className="text-[10px] bg-slate-950 border border-white/5 text-slate-400 px-2 py-0.5 rounded-full">{job.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{job.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{job.desc}</p>
                  </div>
                  <div className="flex flex-col justify-between items-start md:items-end gap-4 shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="space-y-1 md:text-right text-xs text-slate-400 font-mono">
                      <div className="flex items-center md:justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center md:justify-end gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Redirecting to application pipeline for ${job.title}...`)}
                      className="w-full md:w-auto px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-500/10"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hiring CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-purple-950/20 border border-purple-500/10 rounded-3xl backdrop-blur-xl text-center space-y-4"
          >
            <h2 className="text-xl font-bold">Don&apos;t see the right role?</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              We are always looking for passionate builders, educators, and design thinkers. Send us an open application explaining how you can help.
            </p>
            <button
              onClick={() => alert("Open application pipeline is being initialized. Send resume to hiring@codeverse.com")}
              className="px-6 py-2.5 bg-slate-900 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs font-bold transition-all"
            >
              Submit Open Application
            </button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
