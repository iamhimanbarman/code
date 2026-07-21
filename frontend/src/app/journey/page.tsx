"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Code, Map, Target, Trophy, Zap, ChevronRight, Star,
  Terminal, Layers, Database, Globe, Cpu, GitBranch, Lock, CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LEARNING_PATHS = [
  {
    id: "frontend",
    title: "Frontend Development",
    desc: "HTML, CSS, JavaScript, React, Next.js — from zero to production apps",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/10",
    topics: 42,
    hours: 120,
    level: "Beginner → Advanced",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    desc: "Node.js, Express, NestJS, databases, APIs, authentication & deployment",
    icon: Database,
    color: "from-emerald-500 to-green-500",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
    topics: 38,
    hours: 110,
    level: "Beginner → Advanced",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    desc: "Arrays, Trees, Graphs, DP, Greedy — crack coding interviews",
    icon: Layers,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
    topics: 56,
    hours: 200,
    level: "Beginner → Expert",
  },
  {
    id: "fullstack",
    title: "Full-Stack Mastery",
    desc: "End-to-end app development: design, build, deploy, and scale",
    icon: Terminal,
    color: "from-purple-500 to-pink-500",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/10",
    topics: 64,
    hours: 180,
    level: "Intermediate → Expert",
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    desc: "Docker, Kubernetes, CI/CD, AWS, monitoring, and infrastructure",
    icon: Cpu,
    color: "from-rose-500 to-red-500",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/10",
    topics: 30,
    hours: 80,
    level: "Intermediate → Advanced",
  },
  {
    id: "system-design",
    title: "System Design",
    desc: "Scalable architectures, load balancing, caching, message queues",
    icon: GitBranch,
    color: "from-indigo-500 to-violet-500",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/10",
    topics: 24,
    hours: 60,
    level: "Advanced → Expert",
  },
];

const LANGUAGES_DOCS = [
  { name: "JavaScript", icon: "🟨", problems: 850, slug: "javascript" },
  { name: "Python", icon: "🐍", problems: 720, slug: "python" },
  { name: "Java", icon: "☕", problems: 680, slug: "java" },
  { name: "C++", icon: "⚙️", problems: 640, slug: "cpp" },
  { name: "TypeScript", icon: "🔷", problems: 520, slug: "typescript" },
  { name: "Go", icon: "🐹", problems: 340, slug: "go" },
  { name: "Rust", icon: "🦀", problems: 280, slug: "rust" },
  { name: "SQL", icon: "🗃️", problems: 190, slug: "sql" },
];

const STATS = [
  { label: "Learning Paths", value: "6", icon: Map },
  { label: "Topics Covered", value: "254", icon: BookOpen },
  { label: "Practice Problems", value: "3,549", icon: Code },
  { label: "Hours of Content", value: "750+", icon: Zap },
];

export default function JourneyPage() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Hero Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Star className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">Your Learning Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Learn to Code,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                A to Z
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Structured roadmaps, in-depth documentation, real-world projects, and 3,500+ practice problems.
              Track your progress and become a complete developer.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 backdrop-blur-xl text-center hover:border-white/10 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Learning Paths / Roadmaps */}
          <section className="mb-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Learning Roadmaps
                </h2>
                <p className="text-slate-400 max-w-xl">
                  Choose a path and follow a structured curriculum with hands-on projects, quizzes, and progress tracking.
                </p>
              </div>
              <Link
                href="/journey/roadmaps"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View all roadmaps <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LEARNING_PATHS.map((path, i) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <Link href={`/journey/roadmaps/${path.id}`}>
                    <div className={`group bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg ${path.glow} h-full`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <path.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-5 leading-relaxed">{path.desc}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> {path.topics} topics
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" /> {path.hours}h
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">{path.level}</span>
                          <div className="flex items-center gap-1 text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Start learning <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="md:hidden mt-6 text-center">
              <Link
                href="/journey/roadmaps"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400"
              >
                View all roadmaps <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Documentation & Language Guides */}
          <section className="mb-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Documentation & Guides
                </h2>
                <p className="text-slate-400 max-w-xl">
                  Comprehensive language references, tutorials, and best practices — everything you need in one place.
                </p>
              </div>
              <Link
                href="/journey/docs"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Browse all docs <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LANGUAGES_DOCS.map((lang, i) => (
                <motion.div
                  key={lang.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <Link href={`/journey/docs/${lang.slug}`}>
                    <div className="group bg-slate-900/50 border border-white/5 rounded-xl p-5 backdrop-blur-xl hover:border-white/10 transition-all cursor-pointer text-center">
                      <span className="text-3xl mb-3 block">{lang.icon}</span>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                        {lang.name}
                      </h4>
                      <p className="text-xs text-slate-500">{lang.problems} problems</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Practice Tracks */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Practice Tracks
            </h2>
            <p className="text-slate-400 max-w-xl mb-10">
              Curated sets of problems organized by topic. Complete a track to earn badges and XP.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "Blind 75", desc: "The essential 75 problems for coding interviews", count: 75, diff: "Mixed", color: "from-amber-500 to-orange-600" },
                { title: "LeetCode Top 100", desc: "Most frequently asked problems at top companies", count: 100, diff: "Mixed", color: "from-rose-500 to-pink-600" },
                { title: "Dynamic Programming Mastery", desc: "From basic memoization to complex state machines", count: 48, diff: "Medium–Hard", color: "from-indigo-500 to-purple-600" },
                { title: "Graph Algorithms Deep Dive", desc: "BFS, DFS, shortest paths, topological sort, MST", count: 35, diff: "Medium–Hard", color: "from-cyan-500 to-teal-600" },
                { title: "Arrays & Hashing Fundamentals", desc: "Master the most common data structure patterns", count: 40, diff: "Easy–Medium", color: "from-emerald-500 to-green-600" },
                { title: "Binary Search Patterns", desc: "Standard, rotated, answer-on-value binary search", count: 22, diff: "Easy–Hard", color: "from-violet-500 to-fuchsia-600" },
              ].map((track, i) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <Link href="/journey/tracks">
                    <div className="group bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center shadow-lg`}>
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-lg border border-white/5">
                          {track.count} problems
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4">{track.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{track.diff}</span>
                        {/* Progress bar placeholder */}
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${track.color} rounded-full`} style={{ width: "0%" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 tracking-tight text-center">
              How Your Journey Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Pick a Path", desc: "Choose a learning roadmap that matches your goals and skill level.", icon: Map },
                { step: "02", title: "Learn & Practice", desc: "Study concepts with docs, then apply knowledge through practice problems.", icon: BookOpen },
                { step: "03", title: "Track Progress", desc: "Monitor your completion rate, streaks, and XP as you advance.", icon: Trophy },
                { step: "04", title: "Level Up", desc: "Earn badges, unlock advanced content, and become interview-ready.", icon: Zap },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                    <s.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-xs font-bold text-indigo-500 tracking-wider uppercase mb-2 block">Step {s.step}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-12 text-center backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Join thousands of developers building real skills through structured learning and deliberate practice.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="btn btn--primary">
                Get Started Free
              </Link>
              <Link
                href="/journey/roadmaps"
                className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Browse Roadmaps
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
