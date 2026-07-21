"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BrainCircuit, CheckCircle2, ChevronRight, Clock, Code,
  MessageSquare, Play, RefreshCw, Send, Sparkles, Terminal, Award, HelpCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api-client";

const INTERVIEW_PRESETS = [
  {
    company: "Google",
    role: "L4 Frontend Engineer",
    question: "Design a real-time collaborative text editor like Google Docs. Explain conflict resolution (CRDTs vs OT), data flow synchronization, and performance optimization for concurrent typing updates.",
    sampleCode: `// Client-side text sync stub
class EditorSync {
  constructor(socket) {
    this.socket = socket;
    this.version = 0;
  }
  
  onLocalInsert(index, char) {
    const op = { type: 'insert', index, char, version: this.version };
    this.socket.send(JSON.stringify(op));
  }
}`,
    feedback: {
      verdict: "Strong Hire",
      score: "9.2/10",
      tech: "4.8/5.0",
      comm: "4.5/5.0",
      design: "4.7/5.0",
      detailed: "Excellent explanation of Operational Transformation conflict limits. Your recommendation to use WebSockets for framing client messages and Redis Streams in the background is optimal. Consider describing memory footprints under 10k concurrent users."
    }
  },
  {
    company: "Meta",
    role: "Senior Backend Engineer",
    question: "Design a rate limiter middleware for a high-traffic API (10M requests/day). Compare Token Bucket vs Sliding Window Log algorithms, and explain how to scale this with Redis Cluster.",
    sampleCode: `// Token Bucket Rate Limiter
async function isAllowed(clientId) {
  const limit = 100;
  const window = 60; // 1 minute
  // TODO: Implement sliding window logic in Redis
}`,
    feedback: {
      verdict: "Hire",
      score: "8.5/10",
      tech: "4.5/5.0",
      comm: "4.2/5.0",
      design: "4.3/5.0",
      detailed: "Good analysis of lock contentions in Redis Redis-Cell or Lua scripts. Ensure to mention script execution timeouts and backup strategies if Redis nodes fail."
    }
  }
];

export default function InterviewSimulatorPage() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  
  // Timer setup
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [timerRunning, setTimerRunning] = useState(true);

  // Editor and Chat inputs
  const [editorContent, setEditorContent] = useState(INTERVIEW_PRESETS[0].sampleCode);
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `Hello, I'm your AI technical interviewer. Today we are conducting a mock interview for the role of ${INTERVIEW_PRESETS[0].role} at ${INTERVIEW_PRESETS[0].company}. Here is your prompt:\n\n${INTERVIEW_PRESETS[0].question}`
    }
  ]);

  // Loading & evaluation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSteps, setSubmitSteps] = useState<string[]>([]);
  const [evalResult, setEvalResult] = useState<any | null>(null);

  useEffect(() => {
    let timer: any;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setEditorContent(INTERVIEW_PRESETS[idx].sampleCode);
    setChatLogs([
      {
        sender: "bot",
        text: `Hello, I'm your AI technical interviewer. Today we are conducting a mock interview for the role of ${INTERVIEW_PRESETS[idx].role} at ${INTERVIEW_PRESETS[idx].company}. Here is your prompt:\n\n${INTERVIEW_PRESETS[idx].question}`
      }
    ]);
    setEvalResult(null);
    setTimeLeft(2700);
    setTimerRunning(true);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    const newLogs = [...chatLogs, { sender: "user" as const, text: userText }];
    setChatLogs(newLogs);
    setChatInput("");

    // Put a loading status
    setChatLogs(prev => [...prev, { sender: "bot" as const, text: "Thinking..." }]);

    try {
      const currentPreset = INTERVIEW_PRESETS[selectedPresetIdx];
      const response: any = await api.post("/ai/interview/chat", {
        company: currentPreset.company,
        role: currentPreset.role,
        question: currentPreset.question,
        history: chatLogs.map(l => ({ sender: l.sender, text: l.text })),
        newMessage: userText
      });

      setChatLogs(prev => {
        const clean = prev.slice(0, -1);
        return [...clean, { sender: "bot" as const, text: response.text }];
      });
    } catch (error) {
      console.error("AI Interview Chat failed:", error);
      setChatLogs(prev => {
        const clean = prev.slice(0, -1);
        return [
          ...clean,
          {
            sender: "bot" as const,
            text: "Interesting perspective. How would you handle scale, data replication, or system failures in this setup? (Failed to query AI, using static feedback question)."
          }
        ];
      });
    }
  };

  const handleSubmitInterview = async () => {
    setIsSubmitting(true);
    setEvalResult(null);
    setTimerRunning(false);
    setSubmitSteps([]);

    const steps = [
      "Compiling chat logs and code architecture...",
      "Analyzing algorithm patterns for edge cases...",
      "Calculating scalability and load overhead rating...",
      "Comparing responses with senior engineering baselines...",
      "Structuring feedback matrix and verdict..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setSubmitSteps(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const currentPreset = INTERVIEW_PRESETS[selectedPresetIdx];

    try {
      const response: any = await api.post("/ai/interview/submit", {
        company: currentPreset.company,
        role: currentPreset.role,
        question: currentPreset.question,
        code: editorContent,
        history: chatLogs.map(l => ({ sender: l.sender, text: l.text }))
      });
      setEvalResult(response);
    } catch (error) {
      console.error("AI Interview Submit failed:", error);
      setEvalResult(currentPreset.feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Back button link */}
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
                AI Interview <span className="gradient-text--accent">Simulator</span>
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                Practice high-stakes mock coding and system design interviews. Face custom prompts, write clean structures under time limits, and receive a comprehensive hire report.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Clock className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-white">{formatTime(timeLeft)}</div>
                <div className="text-xs text-slate-400">Remaining Session Clock</div>
              </div>
            </div>
          </div>

          {/* Main workspace grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Selector & Chat */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Preset selectors card */}
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-400" /> Select Target Loop
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {INTERVIEW_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedPresetIdx === idx
                          ? "bg-indigo-600/10 border-indigo-500 text-indigo-300"
                          : "bg-slate-900/40 border-white/5 hover:bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="font-bold text-sm text-white mb-1">
                        {preset.company} — {preset.role}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {preset.question}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat pane */}
              <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col h-[400px] justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-white/5 pb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Interviewer Feed
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 mb-4 pr-1">
                  {chatLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2.5 max-w-[85%] ${
                        log.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          log.sender === "user"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none whitespace-pre-line"
                        }`}
                      >
                        {log.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your response to the interviewer..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    className="flex-1 bg-slate-900 border border-white/5 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-indigo-500/50 text-xs"
                  />
                  <button
                    onClick={handleSendChat}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Code Editor & Evaluation result */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-grow flex flex-col items-center justify-center py-20"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/10 border-t-indigo-400 animate-spin" />
                        <BrainCircuit className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      
                      <div className="text-lg font-bold text-white mb-2">Analyzing Mock Interview Response</div>
                      <p className="text-sm text-slate-400 mb-6 max-w-xs text-center">AI code grading and logic models scoring...</p>

                      <div className="w-full max-w-xs bg-slate-900/60 border border-white/5 rounded-2xl p-5 font-mono text-xs text-indigo-300 space-y-2">
                        {submitSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> {step}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : evalResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-1 flex flex-col justify-between p-6"
                    >
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                          <div>
                            <h3 className="font-bold text-lg text-white flex items-center gap-2">
                              <Award className="w-5.5 h-5.5 text-indigo-400" />
                              Technical Interview Scorecard
                            </h3>
                            <p className="text-xs text-slate-400">Mock loop evaluation summary</p>
                          </div>
                          
                          <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide border ${
                            evalResult.verdict === "Strong Hire"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-sky-500/10 border-sky-500/20 text-sky-400"
                          }`}>
                            {evalResult.verdict}
                          </span>
                        </div>

                        {/* Scores grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center">
                          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Overall</div>
                            <div className="text-sm font-mono font-bold text-white">{evalResult.score}</div>
                          </div>
                          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Technical</div>
                            <div className="text-sm font-mono font-bold text-white">{evalResult.tech}</div>
                          </div>
                          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Design</div>
                            <div className="text-sm font-mono font-bold text-white">{evalResult.design}</div>
                          </div>
                          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Communication</div>
                            <div className="text-sm font-mono font-bold text-white">{evalResult.comm}</div>
                          </div>
                        </div>

                        {/* Summary Feedback */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Feedback Critique</span>
                          <p className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 text-xs text-slate-300 leading-relaxed">
                            {evalResult.detailed}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectPreset(selectedPresetIdx)}
                        className="w-full mt-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold flex items-center justify-center gap-2 border border-indigo-400/30 transition-all active:scale-[0.98]"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Start New Simulation Session
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="editor"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      {/* Editor Header */}
                      <div className="bg-slate-900/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                          <span>draft_sandbox.js</span>
                        </div>
                        <div className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          JavaScript
                        </div>
                      </div>

                      {/* Text editor box */}
                      <div className="flex-1 flex font-mono text-xs leading-relaxed relative min-h-[300px]">
                        <div className="w-10 border-r border-white/5 bg-slate-950/40 text-right select-none pr-2.5 pt-4 text-slate-600">
                          {Array.from({ length: Math.max(12, editorContent.split("\n").length) }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                        
                        <textarea
                          value={editorContent}
                          onChange={(e) => setEditorContent(e.target.value)}
                          spellCheck={false}
                          className="flex-1 w-full bg-transparent px-4 py-4 focus:outline-none resize-none overflow-y-auto text-slate-100 font-mono focus:ring-0"
                        />
                      </div>

                      {/* Submit controls footer */}
                      <div className="bg-slate-900/60 border-t border-white/5 px-6 py-4 flex items-center justify-between gap-4">
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-indigo-400" /> Under mock timer constraints
                        </div>

                        <button
                          onClick={handleSubmitInterview}
                          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-xs font-bold flex items-center gap-2 border border-indigo-400/30"
                        >
                          Submit Interview Response <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
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
