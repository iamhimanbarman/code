"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Layers, Cpu, Server, Database, Globe, Network, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LAYERS = [
  {
    id: "learning",
    name: "Layer 1 — Learning Engine",
    color: "#6366f1",
    icon: Globe,
    description: "Interactive visual documentation guides, curated career pathways, and AI learning mentors.",
    items: [
      { name: "Documentation", href: "/journey" },
      { name: "Learning Roadmaps", href: "/journey" },
      { name: "Interactive Notes", href: "/journey" },
      { name: "AI Tutor Review", href: "/ai-engine/tutor" }
    ]
  },
  {
    id: "practice",
    name: "Layer 2 — Challenge Sandbox",
    color: "#06b6d4",
    icon: Network,
    description: "Algorithmic practice modules, daily DSA challenges, and dynamic skill graphs.",
    items: [
      { name: "Coding Challenges", href: "/challenges" },
      { name: "DSA Practice Problems", href: "/challenges" },
      { name: "Skills Assessment Graph", href: "/ai-engine/skill" }
    ]
  },
  {
    id: "building",
    name: "Layer 3 — Project Builder",
    color: "#10b981",
    icon: Cpu,
    description: "AI-guided application scaffolding, database schema architecture design, and deployment guides.",
    items: [
      { name: "Project Builder", href: "/ai-engine/project" },
      { name: "AI Scaffolding Engine", href: "/ai-engine/project" }
    ]
  },
  {
    id: "collaboration",
    name: "Layer 4 — Version Control",
    color: "#f59e0b",
    icon: Database,
    description: "Built-in git branch environments, interactive file commits, and collaborative review pipelines.",
    items: [
      { name: "Git Repository", href: "/git" },
      { name: "Pull Requests", href: "/git" },
      { name: "Code Reviews", href: "/git" }
    ]
  },
  {
    id: "career",
    name: "Layer 5 — Career Portal",
    color: "#f43f5e",
    icon: Server,
    description: "Live recruiter matchmaking, job placement dashboards, and behavioral AI mock interview preparation.",
    items: [
      { name: "AI Interview Simulator", href: "/ai-engine/interview" },
      { name: "Resume Enhancer", href: "/career" },
      { name: "Matched Jobs", href: "/career" }
    ]
  }
];

const STACKS = [
  {
    title: "Client & Presentation",
    desc: "Built on Next.js 15 App Router. Zero-layout shift styling with CSS Modules and fluid micro-animations via Framer Motion.",
    color: "#6366f1",
    tech: ["Next.js", "TypeScript", "Framer Motion", "CSS Modules"]
  },
  {
    title: "Orchestration & Services",
    desc: "Powered by NestJS backend APIs. Modular dependency injection handles AI routing pipelines and rate throttles.",
    color: "#10b981",
    tech: ["NestJS", "TypeScript", "RxJS", "Passport JWT"]
  },
  {
    title: "AI & Intelligence",
    desc: "Driven by Google Gemini generative models. Translates user requests into structured, token-efficient JSON outputs.",
    color: "#a855f7",
    tech: ["Gemini 3.x Flash", "Google GenAI SDK", "Structured JSON Schema"]
  },
  {
    title: "Persistence & Deployment",
    desc: "Stateless API server talking to PostgreSQL database layers. Type safety guaranteed by Prisma schema bounds.",
    color: "#f59e0b",
    tech: ["PostgreSQL", "Prisma ORM", "Docker Containers"]
  }
];

export default function ArchitecturePage() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>("learning");

  const activeLayerData = LAYERS.find(l => l.id === selectedLayer);

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <Layers className="w-9 h-9 text-indigo-400" />
              Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Architecture</span>
            </h1>
            <p className="text-slate-400 mt-2">
              A high-performance modular design structured across five interconnected ecosystem layers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Layers Stack */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecosystem Layers</h2>
              
              <div className="flex flex-col gap-3">
                {LAYERS.map((layer) => {
                  const Icon = layer.icon;
                  const isActive = selectedLayer === layer.id;
                  
                  return (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedLayer(layer.id)}
                      className="w-full text-left transition-all duration-300 focus:outline-none"
                    >
                      <div
                        className={`p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                          isActive
                            ? "bg-slate-900 border-white/20 shadow-xl scale-[1.01]"
                            : "bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/30"
                        }`}
                        style={{
                          borderLeftWidth: "4px",
                          borderLeftColor: layer.color
                        }}
                      >
                        <div
                          className="p-2.5 rounded-xl"
                          style={{
                            background: `${layer.color}15`,
                            color: layer.color
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-base">{layer.name}</h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{layer.description}</p>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isActive ? "rotate-90 text-white" : ""
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layer Details Panel */}
            <div className="lg:col-span-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Layer Components</h2>
              
              <AnimatePresence mode="wait">
                {activeLayerData && (
                  <motion.div
                    key={activeLayerData.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="bg-slate-950/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ background: activeLayerData.color }}
                    />

                    <h3 className="text-2xl font-black text-white">{activeLayerData.name}</h3>
                    <p className="text-slate-350 text-sm mt-3 leading-relaxed">{activeLayerData.description}</p>

                    <div className="mt-8">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Click to Open Feature:</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeLayerData.items.map((item) => (
                          <Link key={item.name} href={item.href} className="block group">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/15 hover:bg-slate-900 transition-all">
                              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.name}</span>
                              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tech Stack Diagram */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Powered By <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CodeVerse Core Stack</span>
              </h2>
              <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
                Modern, reliable, and decoupled services working in harmony to deliver instant developer loops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STACKS.map((stack) => (
                <div
                  key={stack.title}
                  className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors backdrop-blur-xl"
                >
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border"
                    style={{
                      color: stack.color,
                      borderColor: `${stack.color}30`,
                      background: `${stack.color}10`
                    }}
                  >
                    {stack.title}
                  </span>
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">{stack.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {stack.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
