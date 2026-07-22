"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowLeft, MessageCircle, Eye, CornerDownRight, Plus, Search, Filter, HelpCircle, FileCode2, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const THREADS = [
  {
    id: 1,
    title: "V8 memory leak: Heap keeps expanding when using closures in request handlers?",
    category: "Q&A",
    desc: "I am observing a steady memory heap increase when executing requests on an Express node server. Profiler points to standard closure scope variables. Is this GC delay or physical reference retention?",
    author: "Dan Abramov Fan",
    replies: 14,
    views: 312,
    sticky: true,
    solved: false
  },
  {
    id: 2,
    title: "CodeVerse Contest 44: Official solutions thread & optimization review",
    category: "Contests",
    desc: "Discuss algorithmic solutions and time complexities (O(N log N) vs O(N)) for yesterday's algorithms track. Post code structures here.",
    author: "Marcus Chen",
    replies: 48,
    views: 1205,
    sticky: true,
    solved: true
  },
  {
    id: 3,
    title: "Double Pointer vs Single Pointer allocation speeds inside nested loops (C++)",
    category: "DSA",
    desc: "Why does pointer reallocation show a 15% speed increase on GCC targets when we dereference using a secondary pointer table? Benchmarking logs included.",
    author: "CppDev_98",
    replies: 8,
    views: 189,
    sticky: false,
    solved: true
  },
  {
    id: 4,
    title: "Showcase: AI Agent that generates unit tests directly from TypeScript types",
    category: "Showcase",
    desc: "Built a small wrapper using CodeVerse APIs that automatically generates Jest specs directly from interface signatures. Check my GitHub link inside.",
    author: "Elena Rostova",
    replies: 22,
    views: 456,
    sticky: false,
    solved: false
  },
  {
    id: 5,
    title: "Express vs NestJS performance loops inside high-concurrency requests",
    category: "Q&A",
    desc: "Seeking advice on route handler architectures. NestJS decorators show slight memory offsets under massive wrk benchmarks compared to plain Express routing.",
    author: "Alice_Coder",
    replies: 6,
    views: 145,
    sticky: false,
    solved: false
  }
];

export default function ForumsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Q&A");
  const [newDesc, setNewDesc] = useState("");

  const categories = ["All", "Q&A", "Contests", "DSA", "Showcase"];

  const filtered = THREADS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    
    // Simulating insert
    alert(`Discussion thread '${newTitle}' created successfully! It will appear after moderation review.`);
    setNewTitle("");
    setNewDesc("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10 text-white font-sans">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-12">
          
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h1 className="text-4xl font-bold tracking-tight">
                Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Forums</span>
              </h1>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed font-normal">
                Ask compiler errors, share algorithms solutions, coordinate hackathons, and exchange engineering profiles with developers globally.
              </p>
            </motion.div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 select-none"
            >
              <Plus className="w-4 h-4" /> New Discussion
            </button>
          </div>

          {/* Filter & Search Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-4 border-t border-white/5">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-slate-900/40 text-slate-400 border-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search forum threads..."
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-4 pt-2">
            {filtered.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => alert(`Opening thread discussion for: '${t.title}'`)}
                className="bg-slate-900/30 border border-white/5 hover:border-white/10 rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 group"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                    {t.sticky && (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                        Sticky
                      </span>
                    )}
                    <span className="bg-slate-800 text-slate-400 border border-white/5 px-2 py-0.5 rounded uppercase tracking-wider">
                      {t.category}
                    </span>
                    {t.solved && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                        [Solved]
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-normal">
                    {t.desc}
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-slate-400 text-xs font-mono border-t md:border-t-0 border-white/5 pt-4 md:pt-0 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[9px] text-emerald-400">
                      {t.author.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-sans">{t.author}</span>
                  </div>
                  
                  <div className="flex gap-4 ml-auto md:ml-0">
                    <div className="flex items-center gap-1.5" title="Replies count">
                      <MessageCircle className="w-4 h-4 text-slate-500" />
                      <span>{t.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Views count">
                      <Eye className="w-4 h-4 text-slate-500" />
                      <span>{t.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-slate-900/10 border border-white/5 rounded-3xl text-slate-500 space-y-3">
              <MessageSquare className="w-10 h-10 mx-auto opacity-40 text-emerald-500 animate-pulse" />
              <p className="text-xs">No discussions match your filter query.</p>
            </div>
          )}

        </div>
      </main>

      {/* New Thread Modal Popover */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[99999] p-6">
            {/* Modal clickout overlay */}
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative z-10 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" /> Start Discussion
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateThread} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Thread Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Closing a socket connection in Golang routing handles"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Category Tag</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500/40"
                  >
                    <option value="Q&A">Q&A / Bug Help</option>
                    <option value="Contests">Contests & Competitions</option>
                    <option value="DSA">DSA / Algorithms</option>
                    <option value="Showcase">Project Showcase</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Discussion Content</label>
                  <textarea
                    required
                    rows={4}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide details of your question, error logs, or project description..."
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold transition-all text-center select-none"
                >
                  Create Discussion Thread
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
