"use client";

import { motion } from "framer-motion";
import { Rocket, Eye, Users, Award, Shield, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const pillars = [
    {
      icon: Rocket,
      title: "Interactive Sandbox Learning",
      desc: "Learn programming concepts natively with our integrated in-browser IDE, playground, and structural lessons."
    },
    {
      icon: Eye,
      title: "AI-Powered Guidance",
      desc: "Get code mentoring, dynamic interview practice, resume audits, and direct project generation built on LLM architectures."
    },
    {
      icon: Users,
      title: "Active Developer Community",
      desc: "Solve challenges, join contests, share project designs, and compete with developers globally to build proficiency."
    }
  ];

  const values = [
    "Accessibility: Free or highly affordable world-class compiler tools for everyone.",
    "Real-World Context: Focus on building actual production repos rather than just theoretical tests.",
    "Data-Driven Growth: Monitor progress with XP levels, localized skill matrices, and developer dashboards."
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CodeVerse</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We are building the complete AI-powered developer ecosystem to guide developers from their first line of code to landing their dream engineering job.
            </p>
          </motion.div>

          {/* Core Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Rocket className="w-6 h-6 text-emerald-400" />
                Our Vision
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Traditional education platforms separate theory, compiler sandboxes, project construction, and career coaching into distinct siloes. Developers find themselves constantly context-switching between video hubs, local IDE configuration, coding challenge sites, and static guides.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                CodeVerse consolidates these operations. By embedding a high-fidelity Web IDE directly within our learning paths and powering them with specialized LLM Agents, we make learning completely cohesive, interactive, and fun.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold mb-4 text-emerald-300">Fast Facts</h3>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive sandboxes for 8+ programming languages</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3,500+ coding challenges compiled natively</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% remote team spread across 4 continents</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trusted by 100,000+ developers globally</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Pillars Section */}
          <div className="space-y-8 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">The Core Pillars</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">Our development roadmap focuses on three main capabilities to enhance code learning:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform duration-200">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-indigo-950/20 border border-indigo-500/10 rounded-3xl backdrop-blur-xl space-y-6"
          >
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Our Core Principles
            </h2>
            <div className="space-y-4">
              {values.map((val, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
