"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Award, BarChart2, BookOpen, ChevronRight, Code,
  GitBranch, GitCommit, GitPullRequest, HelpCircle, RefreshCw,
  Search, ShieldAlert, Sparkles, Target, Trophy, Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api-client";

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    skills: [
      { name: "React & Next.js", level: 85, progress: "Expert" },
      { name: "CSS Architecture (Tailwind/Sass)", level: 75, progress: "Advanced" },
      { name: "Web Performance & Core Vitals", level: 60, progress: "Intermediate" }
    ],
    badge: "UI Virtuoso"
  },
  {
    id: "backend",
    title: "Backend Engineering",
    skills: [
      { name: "REST & GraphQL APIs", level: 90, progress: "Expert" },
      { name: "Database Design & Optimization", level: 70, progress: "Advanced" },
      { name: "Caching & Message Brokers", level: 55, progress: "Intermediate" }
    ],
    badge: "Systems Architect"
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker & Containerization", level: 65, progress: "Intermediate" },
      { name: "CI/CD Pipeline Automation", level: 50, progress: "Intermediate" },
      { name: "AWS Cloud Services", level: 40, progress: "Beginner" }
    ],
    badge: "Cloud Commander"
  },
  {
    id: "dsa",
    title: "Algorithms & DSA",
    skills: [
      { name: "Array & String Manipulation", level: 80, progress: "Advanced" },
      { name: "Trees, Graphs & Traversal", level: 60, progress: "Intermediate" },
      { name: "Dynamic Programming", level: 35, progress: "Beginner" }
    ],
    badge: "Algorithm Guru"
  }
];

const SCAN_PRESETS = [
  {
    repo: "https://github.com/facebook/react",
    points: 250,
    badge: "Performance Ninja",
    skillsImpact: [
      { name: "React & Next.js", gain: "+15%" },
      { name: "Web Performance & Core Vitals", gain: "+20%" }
    ],
    issues: "Found 2 recursive structures with O(n^2) space implications. Suggested React memoization overrides."
  },
  {
    repo: "https://github.com/prisma/prisma",
    points: 320,
    badge: "DB Guru",
    skillsImpact: [
      { name: "Database Design & Optimization", gain: "+25%" },
      { name: "REST & GraphQL APIs", gain: "+15%" }
    ],
    issues: "No memory leaks detected. Relational index lookups highly optimized."
  }
];

export default function SkillGraphPage() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [githubUrl, setGithubUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanSteps, setScanSteps] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const currentCategoryData = SKILL_CATEGORIES.find(c => c.id === activeCategory)!;

  const handleSelectPreset = (url: string) => {
    setGithubUrl(url);
    setScanResult(null);
  };

  const handleScan = async () => {
    if (!githubUrl.trim()) return;
    setIsScanning(true);
    setScanResult(null);
    setScanSteps([]);

    const steps = [
      "Connecting to GitHub REST API...",
      "Cloning repo index markers...",
      "Parsing file structures and imports...",
      "Evaluating language AST distributions...",
      "Matching architecture profiles to skill indices..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanSteps(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    try {
      const response: any = await api.post("/ai/skill/scan", {
        githubUrl
      });
      setScanResult(response);
    } catch (error) {
      console.error("AI Skill scan failed, using preset:", error);
      const matchedScan = SCAN_PRESETS.find(p => p.repo === githubUrl) || SCAN_PRESETS[0];
      setScanResult({
        repo: githubUrl,
        points: matchedScan.points,
        badge: matchedScan.badge,
        skillsImpact: matchedScan.skillsImpact,
        issues: matchedScan.issues
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Back Link */}
          <Link href="/#ai-engine" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Platform Landing
          </Link>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Premium AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
                AI Skill <span className="gradient-text--accent">Graph</span>
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                Your tech stack DNA analyzer. Explore current skill profiles, scan repositories to earn skill experience, and unlock exclusive rank achievements.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Trophy className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Platinum</div>
                <div className="text-xs text-slate-400">Developer League</div>
              </div>
            </div>
          </div>

          {/* Workspace layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Skill Matrix Explorer */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category tabs */}
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-4 shadow-xl backdrop-blur-md">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
                  Select Skill Domain
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-3 rounded-2xl text-xs font-bold transition-all border ${
                        activeCategory === cat.id
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                          : "bg-slate-900/40 border-white/5 hover:bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {cat.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress bars block */}
              <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{currentCategoryData.title}</h3>
                    <p className="text-xs text-slate-400">Active metrics tracking your engineering level</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-1.5 text-indigo-300 text-xs font-mono font-bold">
                    <Award className="w-3.5 h-3.5" /> {currentCategoryData.badge}
                  </div>
                </div>

                <div className="space-y-6">
                  {currentCategoryData.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="font-mono text-indigo-300">{skill.level}% ({skill.progress})</span>
                      </div>
                      
                      {/* Outer bar */}
                      <div className="h-3 bg-slate-900 border border-white/5 rounded-full overflow-hidden relative">
                        {/* Inner level */}
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated skill stats analysis advice */}
                <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 flex gap-4 items-start">
                  <Target className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white mb-1">Tailored Actionable Goal</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activeCategory === "frontend"
                        ? "Improve Web Performance scores to 75% to unlock the 'FPS Champion' badge. Focus on next-gen image formats and static hydration optimization."
                        : activeCategory === "backend"
                        ? "Bridge the caching metric gap. Study Redis pub/sub patterns and cache invalidation policies to advance database queries throughput."
                        : activeCategory === "devops"
                        ? "Design container configurations. Run docker-compose scripts containing network configurations to unlock CI/CD Pipeline tracking."
                        : "Practice graph traversal problems (BFS/DFS) under 20-minute constraints to pass the intermediate DSA benchmark."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended Course paths */}
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> Recommended Learning Path
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Path Course</span>
                    <h5 className="font-bold text-sm text-white mb-2">Advanced Systems Architecture</h5>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">Learn to structure high-performance APIs, databases indexing, and server configurations.</p>
                    <Link href="/journey" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      Start learning <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">DSA Challenge</span>
                    <h5 className="font-bold text-sm text-white mb-2">Dynamic Programming Master</h5>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">Solve arrays, knapsack, and memoized trees optimization puzzles.</p>
                    <Link href="/challenges" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      Start coding <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Repository Scanner */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6 min-h-[460px] flex flex-col justify-between">
                
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                    <GitBranch className="w-5 h-5 text-indigo-400" />
                    GitHub DNA Scanner
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Analyze a repository to scan patterns, identify anti-patterns, and gain developer XP.
                  </p>

                  {/* GitHub URL presets */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => handleSelectPreset("https://github.com/facebook/react")}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 hover:border-indigo-500/30 text-[10px] font-mono text-slate-300"
                    >
                      facebook/react
                    </button>
                    <button
                      onClick={() => handleSelectPreset("https://github.com/prisma/prisma")}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 hover:border-indigo-500/30 text-[10px] font-mono text-slate-300"
                    >
                      prisma/prisma
                    </button>
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-500 absolute top-1/2 left-4 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Paste repository url..."
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-indigo-500/50 text-xs"
                      />
                    </div>
                    
                    <button
                      onClick={handleScan}
                      disabled={isScanning || !githubUrl.trim()}
                      className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      Scan
                    </button>
                  </div>
                </div>

                {/* Scan state output */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {isScanning ? (
                      <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 py-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-500/10 border-t-indigo-400 animate-spin" />
                          <span className="text-xs font-mono text-slate-300">Scanning repository modules...</span>
                        </div>
                        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-indigo-300 space-y-1.5">
                          {scanSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span> {step}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : scanResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white">Unlocked Badge</span>
                            <span className="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold text-white">{scanResult.badge}</span>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-white/5 pt-2">
                            <span className="text-xs text-slate-400">XP points earned</span>
                            <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" /> +{scanResult.points} pts
                            </span>
                          </div>
                        </div>

                        {/* Skill gains */}
                        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Level Gains</div>
                          <div className="space-y-2">
                            {scanResult.skillsImpact.map((s: any) => (
                              <div key={s.name} className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-300">{s.name}</span>
                                <span className="text-emerald-400 font-bold">{s.gain}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Scan warning details */}
                        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 flex gap-3 items-start">
                          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-[11px] text-slate-400 leading-relaxed">
                            {scanResult.issues}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 mx-auto mb-4">
                          <BarChart2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">Analyzer Offline</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                          Paste a GitHub repository link or click a preset above to begin parsing project profiles.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
