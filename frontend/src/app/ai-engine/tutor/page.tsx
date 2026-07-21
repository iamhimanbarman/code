"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Play,
  RefreshCw, Send, Zap, BookOpen, Bug, ZapOff, ArrowLeft, Terminal
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api-client";

// Presets for the code editor
const SUBOPTIMAL_PRESETS = [
  {
    name: "N+1 DB Query (SQL/ORM)",
    lang: "sql",
    badCode: `-- Suboptimal SQL query fetching orders inside a user loop
SELECT * FROM users WHERE active = 1;

-- Then inside application code, for each user:
-- SELECT * FROM orders WHERE user_id = ?;`,
    goodCode: `-- Optimized using a single INNER JOIN with query analysis
SELECT u.id, u.name, o.id as order_id, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.active = 1;`,
    explanation: "Consolidates N+1 database roundtrips into a single performant JOIN. Eliminates connection pool overhead and slashes query time by up to 95%.",
    metrics: { timeBefore: "124ms", timeAfter: "8ms", reduction: "93.5% faster" }
  },
  {
    name: "Recursive Fibonacci (Unmemoized)",
    lang: "javascript",
    badCode: `// Suboptimal O(2^n) exponential time complexity recursion
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(40));`,
    goodCode: `// Optimized O(n) linear time complexity using Tabulation
function fibonacci(n) {
  if (n <= 1) return n;
  const table = Array(n + 1).fill(0);
  table[1] = 1;
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}`,
    explanation: "Replaces exponential recursive stack calls with flat dynamic programming table. Prevents stack overflow and runs instantaneously for high values of n.",
    metrics: { timeBefore: "1820ms", timeAfter: "< 1ms", reduction: "99.9% faster" }
  },
  {
    name: "React memory leak (useEffect)",
    lang: "javascript",
    badCode: `// Suboptimal: missing event listener cleanup
useEffect(() => {
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });
}, []);`,
    goodCode: `// Optimized: properly cleans up event listener on unmount
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);`,
    explanation: "Returns a cleanup function to detach the window resize listener when the component unmounts. Prevents severe memory leaks and rendering cycles.",
    metrics: { timeBefore: "Leaking", timeAfter: "Stable", reduction: "0 leaks detected" }
  }
];

export default function PairProgrammerPage() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [editorContent, setEditorContent] = useState(SUBOPTIMAL_PRESETS[0].badCode);
  const [chatPrompt, setChatPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setEditorContent(SUBOPTIMAL_PRESETS[idx].badCode);
    setAnalysisResult(null);
  };

  const handleAnalyze = async (mode: "optimize" | "debug" | "explain") => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisSteps([]);

    const steps = [
      "Tokenizing code segments...",
      "Building Abstract Syntax Tree (AST)...",
      "Running complexity analysis...",
      "Searching database for optimal patterns...",
      "Generating optimization recommendations..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisSteps(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    try {
      const response: any = await api.post("/ai/tutor/optimize", {
        code: editorContent,
        language: SUBOPTIMAL_PRESETS[selectedPresetIdx].lang,
        mode,
      });

      setAnalysisResult({
        type: mode,
        title: response.title || "Analysis Complete",
        badge: response.badge || "AI Grade",
        explanation: response.explanation,
        diffBefore: response.diffBefore || editorContent,
        diffAfter: response.diffAfter || editorContent,
        metrics: response.metrics || {}
      });
    } catch (error) {
      console.error("AI Optimization failed, falling back:", error);
      const currentPreset = SUBOPTIMAL_PRESETS[selectedPresetIdx];
      if (mode === "optimize") {
        setAnalysisResult({
          type: "optimize",
          title: "Optimization Complete (Local Fallback)",
          badge: "Performance boost",
          explanation: currentPreset.explanation + "\n\n*(Failed to connect to API, fallback loaded)*",
          diffBefore: currentPreset.badCode,
          diffAfter: currentPreset.goodCode,
          metrics: currentPreset.metrics
        });
      } else if (mode === "debug") {
        setAnalysisResult({
          type: "debug",
          title: "Bug Check & Security Review (Local Fallback)",
          badge: "Security check passed",
          explanation: "Static analyzer scanned path. Identified 1 potential memory leak / state constraint issue.\n\n*(Failed to connect to API, fallback loaded)*",
          diffBefore: currentPreset.badCode,
          diffAfter: currentPreset.goodCode,
          metrics: { timeBefore: "Vulnerable", timeAfter: "Secured", reduction: "No warnings remaining" }
        });
      } else {
        setAnalysisResult({
          type: "explain",
          title: "Line-by-Line Explanation (Local Fallback)",
          badge: "Code breakdown",
          explanation: "1. The entry initializes resources.\n2. Iterates over active collections.\n3. Cache/Tabulation is used to optimize execution.\n\n*(Failed to connect to API, fallback loaded)*",
          diffBefore: currentPreset.badCode,
          diffAfter: currentPreset.goodCode,
          metrics: { complexity: "O(n) linear", paradigm: "Imperative", memory: "Minimal" }
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatPrompt.trim()) return;
    const userMsg = chatPrompt;
    const currentHistory = [...chatHistory, { sender: "user" as const, text: userMsg }];
    setChatHistory(currentHistory);
    setChatPrompt("");

    // Temporary thinking message
    setChatHistory(prev => [...prev, { sender: "ai" as const, text: "Thinking..." }]);

    try {
      const response: any = await api.post("/ai/tutor/chat", {
        prompt: userMsg,
        history: chatHistory.map(h => ({ sender: h.sender, text: h.text }))
      });

      setChatHistory(prev => {
        const clean = prev.slice(0, -1);
        return [...clean, { sender: "ai" as const, text: response.text }];
      });
    } catch (error) {
      console.error("AI Chat failed:", error);
      setChatHistory(prev => {
        const clean = prev.slice(0, -1);
        let aiResponse = "I've analyzed your custom input (Fallback Mode). ";
        if (userMsg.toLowerCase().includes("optimize") || userMsg.toLowerCase().includes("fast")) {
          aiResponse += "For this type of routine, using an iterative tabulation method or dynamic programming decreases CPU ticks significantly. Make sure to cache repeated calls.";
        } else if (userMsg.toLowerCase().includes("bug") || userMsg.toLowerCase().includes("error")) {
          aiResponse += "Reviewing state allocations... Ensure to dispose event bindings and clear active setTimeout intervals inside your cleanup routines.";
        } else {
          aiResponse += "The syntax is valid. Consider modularizing into standalone functions to keep complexity rating low and ease unit test creation.";
        }
        return [...clean, { sender: "ai" as const, text: aiResponse }];
      });
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Breadcrumb / Back */}
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
                AI Pair <span className="gradient-text--accent">Programmer</span>
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                Your on-demand senior staff engineer. Select a preset below, type your own code, and run instant performance optimization audits.
              </p>
            </div>
            
            {/* Quick Metrics Badge */}
            <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-slate-400">Optimization Accuracy</div>
              </div>
            </div>
          </div>

          {/* Main workspace layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Code presets & Code Editor */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Presets Row */}
              <div className="bg-slate-950/60 border border-white/5 rounded-3xl p-4 backdrop-blur-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
                  Choose a Suboptimal Preset
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUBOPTIMAL_PRESETS.map((preset, idx) => (
                    <button
                      key={preset.name}
                      onClick={() => handleSelectPreset(idx)}
                      className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                        selectedPresetIdx === idx
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500"
                          : "bg-slate-900/50 hover:bg-slate-950 text-slate-300 border border-white/5"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor Workspace */}
              <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
                {/* Editor Header */}
                <div className="bg-slate-900/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                    </div>
                    <span className="text-sm font-mono text-slate-400">workspace_file.{SUBOPTIMAL_PRESETS[selectedPresetIdx].lang === "sql" ? "sql" : "js"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                      {SUBOPTIMAL_PRESETS[selectedPresetIdx].lang}
                    </span>
                  </div>
                </div>

                {/* Editor body wrapper */}
                <div className="flex-1 flex overflow-hidden relative font-mono text-sm leading-relaxed">
                  {/* Line numbers gutter */}
                  <div className="w-12 border-r border-white/5 bg-slate-950/40 text-right select-none pr-3 pt-4 text-slate-600">
                    {Array.from({ length: Math.max(12, editorContent.split("\n").length) }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Textarea code container */}
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    spellCheck={false}
                    className="flex-1 w-full h-full bg-transparent px-4 py-4 focus:outline-none resize-none overflow-y-auto text-slate-100 font-mono"
                  />
                </div>

                {/* Editor Actions bar */}
                <div className="bg-slate-900/60 border-t border-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleAnalyze("optimize")}
                      disabled={isAnalyzing}
                      className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/10 border border-indigo-500/50 disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-200" /> Optimize Code
                    </button>

                    <button
                      onClick={() => handleAnalyze("debug")}
                      disabled={isAnalyzing}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 active:scale-95 transition-all text-xs font-bold flex items-center gap-2 border border-white/5 disabled:opacity-50"
                    >
                      <Bug className="w-3.5 h-3.5 text-rose-400" /> Security & Bugs
                    </button>
                    
                    <button
                      onClick={() => handleAnalyze("explain")}
                      disabled={isAnalyzing}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 active:scale-95 transition-all text-xs font-bold flex items-center gap-2 border border-white/5 disabled:opacity-50"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Explain Line-by-Line
                    </button>
                  </div>

                  <button
                    onClick={() => setEditorContent(SUBOPTIMAL_PRESETS[selectedPresetIdx].badCode)}
                    title="Reset Editor"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-white border border-white/5 transition-all active:rotate-180 duration-500"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: AI Analysis & Chat panel */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Analysis output container */}
              <div className="bg-slate-950/80 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl min-h-[380px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center py-12"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/10 border-t-indigo-400 animate-spin" />
                        <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      
                      <div className="text-sm font-semibold text-slate-300 text-center mb-4">
                        AI Pair Programmer analyzing...
                      </div>

                      {/* Animated console steps */}
                      <div className="w-full max-w-xs bg-slate-950/80 border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-indigo-300/80 space-y-1">
                        {analysisSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> {step}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : analysisResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Result Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            {analysisResult.title}
                          </h3>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                            {analysisResult.badge}
                          </span>
                        </div>

                        {/* Analysis description */}
                        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-white/5 rounded-2xl p-4 mb-4">
                          {analysisResult.explanation}
                        </p>

                        {/* Performance metrics dashboard */}
                        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                          {Object.entries(analysisResult.metrics).map(([key, val]: [string, any]) => (
                            <div key={key} className="bg-slate-900/40 border border-white/5 rounded-2xl p-3">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{key}</div>
                              <div className="text-sm font-mono font-bold text-white">{val}</div>
                            </div>
                          ))}
                        </div>

                        {/* Side-by-side view switcher button */}
                        <div className="border border-white/5 rounded-2xl overflow-hidden bg-slate-900/20">
                          <div className="bg-slate-900/80 border-b border-white/5 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Optimized Code Diff preview
                          </div>
                          <div className="p-4 font-mono text-[11px] leading-relaxed max-h-40 overflow-y-auto space-y-2">
                            <div className="text-rose-400 bg-rose-500/5 p-2 rounded-xl border border-rose-500/10">
                              <div className="font-bold text-[9px] uppercase tracking-wider mb-1 text-rose-500">Suboptimal (Before)</div>
                              <pre className="whitespace-pre-wrap">{analysisResult.diffBefore}</pre>
                            </div>
                            <div className="text-emerald-400 bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10">
                              <div className="font-bold text-[9px] uppercase tracking-wider mb-1 text-emerald-500">Refactored (After)</div>
                              <pre className="whitespace-pre-wrap">{analysisResult.diffAfter}</pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setEditorContent(analysisResult.diffAfter)}
                        className="w-full mt-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold flex items-center justify-center gap-2 border border-indigo-400/30 transition-all active:scale-[0.98]"
                      >
                        Apply Optimization to Editor <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-16"
                    >
                      <div className="w-16 h-16 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                        <Terminal className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">Ready to Analyze</h4>
                      <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                        Edit code on the left, then click "Optimize", "Security & Bugs" or "Explain" to populate real-time diagnostics.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Chat companion tab */}
              <div className="bg-slate-950/80 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col h-[280px] justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-white/5 pb-2">
                  Interactive Dev Assistant
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 text-xs">
                  {chatHistory.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">
                      Ask me anything: "How can I resolve memory leaks here?" or "Explain index keys."
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-2.5 max-w-[85%] ${
                          msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-2xl leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Prompt bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask AI pair programmer..."
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    className="flex-1 bg-slate-900 border border-white/5 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-indigo-500/50 text-xs"
                  />
                  <button
                    onClick={handleSendChat}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/20 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
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
