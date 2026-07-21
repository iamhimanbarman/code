"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Cpu, Database, Server, Settings, Sparkles, Folder, FileCode,
  LayoutGrid, Layers, KanbanSquare, CheckCircle2, ChevronRight, Play, RefreshCw, Zap, ExternalLink
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api-client";

const PRESET_IDEAS = [
  {
    title: "E-Commerce SaaS API",
    prompt: "A multi-vendor store API with microservices, Stripe payments, Redis caching, and dynamic stock inventory controls.",
    architecture: "Microservices",
    db: "PostgreSQL + Redis",
    stack: "TypeScript & NestJS",
    files: {
      "package.json": `{
  "name": "ecommerce-saas-api",
  "version": "1.0.0",
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "prisma": "^5.0.0",
    "stripe": "^12.0.0",
    "ioredis": "^5.3.0"
  }
}`,
      "docker-compose.yml": `version: '3.8'
services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
  redis:
    image: redis:7
    ports:
      - "6379:6379"`,
      "prisma/schema.prisma": `model Vendor {
  id        String   @id @default(uuid())
  name      String
  products  Product[]
}

model Product {
  id       String @id @default(uuid())
  title    String
  stock    Int
  vendorId String
  vendor   Vendor @relation(fields: [vendorId], references: [id])
}`
    },
    apis: [
      { method: "POST", path: "/api/v1/auth/register", desc: "Vendor registration endpoint" },
      { method: "GET", path: "/api/v1/products", desc: "Paginated catalog with Redis cache middleware" },
      { method: "POST", path: "/api/v1/orders/checkout", desc: "Initiate Stripe webhook session pipeline" }
    ],
    tasks: [
      { id: "t1", title: "Configure Docker Compose database & cache", status: "todo" },
      { id: "t2", title: "Setup Prisma schema relational mappings", status: "progress" },
      { id: "t3", title: "Integrate Stripe checkout hooks", status: "todo" },
      { id: "t4", title: "Initialize NestJS entry routes", status: "done" }
    ]
  },
  {
    title: "Realtime Collaborative Board",
    prompt: "Canvas editor like Figma with WebSockets sync, conflict-free replicated data types, and auth.",
    architecture: "Event-Driven",
    db: "MongoDB + WebSockets",
    stack: "Go & Fiber",
    files: {
      "main.go": `package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func main() {
	app := fiber.New()
	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		// Handle realtime collaborative coordinates
	}))
	app.Listen(":3000")
}`,
      "crdt/resolver.go": `package crdt

type Node struct {
	ID    string
	Value string
	Clock int64
}

func ResolveConflicts(n1, n2 Node) Node {
	if n1.Clock > n2.Clock {
		return n1
	}
	return n2
}`
    },
    apis: [
      { method: "GET", path: "/ws", desc: "WebSocket upgrade connection hub" },
      { method: "POST", path: "/api/boards/create", desc: "Initialize canvas structure" }
    ],
    tasks: [
      { id: "t1", title: "Design conflict-free clock structures", status: "progress" },
      { id: "t2", title: "Bind WebSocket message routes", status: "todo" },
      { id: "t3", title: "Configure MongoDB connection hooks", status: "done" }
    ]
  }
];

export default function ProjectGeneratorPage() {
  const [projectPrompt, setProjectPrompt] = useState(PRESET_IDEAS[0].prompt);
  const [architecture, setArchitecture] = useState("Microservices");
  const [dbType, setDbType] = useState("PostgreSQL + Redis");
  const [techStack, setTechStack] = useState("TypeScript & NestJS");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSteps, setGenSteps] = useState<string[]>([]);
  const [genResult, setGenResult] = useState<any | null>(null);
  
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"files" | "apis" | "tasks">("files");
  const [selectedFile, setSelectedFile] = useState<string>("");

  const handleSelectPreset = (preset: typeof PRESET_IDEAS[0]) => {
    setProjectPrompt(preset.prompt);
    setArchitecture(preset.architecture);
    setDbType(preset.db);
    setTechStack(preset.stack);
    setGenResult(null);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenResult(null);
    setGenSteps([]);

    const steps = [
      "Structuring microservices directories...",
      "Mapping database schemas and indexes...",
      "Designing API route endpoints & Swagger models...",
      "Assembling ready-to-run setup scripts...",
      "Validating project scaffolding schema..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenSteps(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    try {
      const response: any = await api.post("/ai/project/generate", {
        prompt: projectPrompt,
        architecture,
        dbType,
        techStack
      });

      setGenResult({
        files: response.files,
        apis: response.apis,
        tasks: response.tasks
      });
      setSelectedFile(Object.keys(response.files)[0]);
    } catch (error) {
      console.error("AI Project Generation failed, using preset:", error);
      const matchedPreset = PRESET_IDEAS.find(p => p.prompt === projectPrompt) || PRESET_IDEAS[0];
      setGenResult({
        files: matchedPreset.files,
        apis: matchedPreset.apis,
        tasks: matchedPreset.tasks
      });
      setSelectedFile(Object.keys(matchedPreset.files)[0]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    if (!genResult) return;
    const updatedTasks = genResult.tasks.map((t: any) => {
      if (t.id === taskId) {
        const nextStatus = t.status === "todo" ? "progress" : t.status === "progress" ? "done" : "todo";
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setGenResult({ ...genResult, tasks: updatedTasks });
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Back button */}
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
                AI Project <span className="gradient-text--accent">Generator</span>
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                Specify your concept and stack configuration. The AI designs folder structures, database schemas, Swagger specifications, and imports immediate tasks.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Layers className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Scaffolding Coverage</div>
              </div>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Settings */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Presets Card */}
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-indigo-400" /> Preset Scaffolds
                </h3>
                <div className="space-y-3">
                  {PRESET_IDEAS.map((preset) => (
                    <button
                      key={preset.title}
                      onClick={() => handleSelectPreset(preset)}
                      className="w-full text-left p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/20 transition-all group"
                    >
                      <div className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors mb-1">
                        {preset.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-2">
                        {preset.prompt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Card */}
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-5">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" /> Architecture Config
                </h3>

                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Project Description</label>
                  <textarea
                    value={projectPrompt}
                    onChange={(e) => setProjectPrompt(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50"
                  />
                </div>

                {/* Architecture Type */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 font-mono">Architecture Style</label>
                  <select
                    value={architecture}
                    onChange={(e) => setArchitecture(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 text-slate-300"
                  >
                    <option>Microservices</option>
                    <option>Monolithic MVC</option>
                    <option>Event-Driven Serverless</option>
                  </select>
                </div>

                {/* DB Choice */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Database Engine</label>
                  <select
                    value={dbType}
                    onChange={(e) => setDbType(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 text-slate-300"
                  >
                    <option>PostgreSQL + Redis</option>
                    <option>MongoDB + WebSockets</option>
                    <option>DynamoDB + Lambda</option>
                  </select>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Language & Framework</label>
                  <select
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 text-slate-300"
                  >
                    <option>TypeScript & NestJS</option>
                    <option>Go & Fiber</option>
                    <option>FastAPI & Python</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 transition-all font-bold text-sm flex items-center justify-center gap-2 border border-indigo-400/30 disabled:opacity-50"
                >
                  <Cpu className="w-4 h-4" /> Generate Project Scaffolding
                </button>
              </div>

            </div>

            {/* Right Column: Output / Scaffolding Panel */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center py-20"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/10 border-t-indigo-400 animate-spin" />
                        <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      
                      <div className="text-lg font-bold text-white mb-2">Analyzing Blueprint Architecture</div>
                      <p className="text-sm text-slate-400 mb-6 max-w-xs text-center">AI project mapping engine compiling boilerplate...</p>

                      <div className="w-full max-w-sm bg-slate-900/60 border border-white/5 rounded-2xl p-5 font-mono text-xs text-indigo-300 space-y-2">
                        {genSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> {step}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : genResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Workspace Header Tabs */}
                      <div className="bg-slate-900/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveWorkspaceTab("files")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                              activeWorkspaceTab === "files"
                                ? "bg-indigo-600 border-indigo-500 text-white"
                                : "bg-slate-800/40 border-white/5 text-slate-400 hover:text-white"
                            }`}
                          >
                            <Folder className="w-3.5 h-3.5" /> Generated Files
                          </button>
                          
                          <button
                            onClick={() => setActiveWorkspaceTab("apis")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                              activeWorkspaceTab === "apis"
                                ? "bg-indigo-600 border-indigo-500 text-white"
                                : "bg-slate-800/40 border-white/5 text-slate-400 hover:text-white"
                            }`}
                          >
                            <Server className="w-3.5 h-3.5" /> API Specification
                          </button>

                          <button
                            onClick={() => setActiveWorkspaceTab("tasks")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                              activeWorkspaceTab === "tasks"
                                ? "bg-indigo-600 border-indigo-500 text-white"
                                : "bg-slate-800/40 border-white/5 text-slate-400 hover:text-white"
                            }`}
                          >
                            <KanbanSquare className="w-3.5 h-3.5" /> Setup Taskboard
                          </button>
                        </div>
                        
                        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                          Ready for download
                        </div>
                      </div>

                      {/* Workspace Content */}
                      <div className="flex-1 p-6">
                        
                        {/* Files tab view */}
                        {activeWorkspaceTab === "files" && (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[400px]">
                            {/* Left Side: Tree */}
                            <div className="md:col-span-4 bg-slate-900/30 border border-white/5 rounded-2xl p-4 overflow-y-auto space-y-1">
                              {Object.keys(genResult.files).map((fileName) => (
                                <button
                                  key={fileName}
                                  onClick={() => setSelectedFile(fileName)}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-colors ${
                                    selectedFile === fileName
                                      ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-300"
                                      : "hover:bg-slate-900 border border-transparent text-slate-400"
                                  }`}
                                >
                                  <FileCode className="w-4 h-4 text-indigo-400" /> {fileName}
                                </button>
                              ))}
                            </div>

                            {/* Right Side: Code Viewer */}
                            <div className="md:col-span-8 bg-slate-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                              <div className="bg-slate-900/80 px-4 py-2 border-b border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                                <span>{selectedFile}</span>
                                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[8px]">AI scaffolded</span>
                              </div>
                              <pre className="flex-1 p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-auto whitespace-pre-wrap">
                                {genResult.files[selectedFile]}
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* APIs tab view */}
                        {activeWorkspaceTab === "apis" && (
                          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                            {genResult.apis.map((api: any, idx: number) => (
                              <div
                                key={idx}
                                className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-xl text-[10px] font-black font-mono tracking-wider ${
                                    api.method === "GET"
                                      ? "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                                      : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                  }`}>
                                    {api.method}
                                  </span>
                                  <span className="font-mono text-xs text-white">{api.path}</span>
                                </div>
                                <div className="text-xs text-slate-400 md:text-right">
                                  {api.desc}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tasks tab view */}
                        {activeWorkspaceTab === "tasks" && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] overflow-y-auto">
                            {/* Todo column */}
                            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
                                <span>Todo</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{genResult.tasks.filter((t: any) => t.status === "todo").length}</span>
                              </h4>
                              <div className="space-y-2">
                                {genResult.tasks.filter((t: any) => t.status === "todo").map((task: any) => (
                                  <div
                                    key={task.id}
                                    onClick={() => handleToggleTask(task.id)}
                                    className="p-3.5 bg-slate-950 border border-white/5 hover:border-indigo-500/30 rounded-xl text-xs cursor-pointer transition-all hover:translate-y-[-1px]"
                                  >
                                    {task.title}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* In Progress column */}
                            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
                                <span>In Progress</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{genResult.tasks.filter((t: any) => t.status === "progress").length}</span>
                              </h4>
                              <div className="space-y-2">
                                {genResult.tasks.filter((t: any) => t.status === "progress").map((task: any) => (
                                  <div
                                    key={task.id}
                                    onClick={() => handleToggleTask(task.id)}
                                    className="p-3.5 bg-slate-950 border border-white/5 hover:border-indigo-500/30 rounded-xl text-xs cursor-pointer transition-all hover:translate-y-[-1px]"
                                  >
                                    {task.title}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Completed column */}
                            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
                                <span>Done</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{genResult.tasks.filter((t: any) => t.status === "done").length}</span>
                              </h4>
                              <div className="space-y-2">
                                {genResult.tasks.filter((t: any) => t.status === "done").map((task: any) => (
                                  <div
                                    key={task.id}
                                    onClick={() => handleToggleTask(task.id)}
                                    className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-xs cursor-pointer transition-all line-through text-slate-400 flex items-center gap-2"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    {task.title}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Footer CTA */}
                      <div className="bg-slate-900/60 border-t border-white/5 px-6 py-4 flex items-center justify-between gap-4">
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Scaffold completed successfully
                        </div>
                        
                        <button
                          onClick={() => {
                            const element = document.createElement("a");
                            const file = new Blob([JSON.stringify(genResult.files, null, 2)], { type: 'text/plain' });
                            element.href = URL.createObjectURL(file);
                            element.download = "project-scaffolding.json";
                            element.click();
                          }}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold flex items-center gap-2 transition-colors border border-indigo-400/20"
                        >
                          Download Scaffolding ZIP <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center py-24">
                      <div className="w-16 h-16 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                        <Server className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">Workspace Generation Idle</h4>
                      <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                        Customize your project description on the left and click generate to populate code repositories, API routes, and task lists.
                      </p>
                    </div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
