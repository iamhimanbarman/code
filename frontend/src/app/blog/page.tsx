"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, User, ArrowRight, ArrowLeft, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const POSTS = [
  {
    title: "Deep Dive into JavaScript V8 Engine Memory Allocations",
    category: "System",
    desc: "Understand stack vs heap memory, garbage collection algorithms, and how V8 handles variables under the hood to write memory-efficient JavaScript.",
    author: "Elena Rostova",
    date: "July 20, 2026",
    readTime: "8 min read",
    color: "from-amber-500/20 to-yellow-500/20 text-yellow-400 border-yellow-500/10"
  },
  {
    title: "Why We Migrated Our Web IDE Coding Sandboxes to Docker Wrappers",
    category: "Engineering",
    desc: "A behind-the-scenes look at scaling isolated code compilation. How we achieved 1.2s compiler runs safely while preventing host kernel escapes.",
    author: "Marcus Chen",
    date: "July 15, 2026",
    readTime: "12 min read",
    color: "from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-emerald-500/10"
  },
  {
    title: "Mastering the Double-Pointer in C++ for Core DSA Interviews",
    category: "Algorithms",
    desc: "Pointer manipulation remains a primary filter in tech screening. Learn when and why to use double-pointers with graphical memory mappings.",
    author: "Dave K.",
    date: "July 08, 2026",
    readTime: "6 min read",
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/10"
  },
  {
    title: "AI Code Mentoring: The Next Paradigm Shift in Software Learning",
    category: "AI",
    desc: "How Large Language Models are transitioning from static autocompletions to dynamic, contextual programming guides that accelerate learning.",
    author: "Sophia Sterling",
    date: "June 28, 2026",
    readTime: "10 min read",
    color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/10"
  },
  {
    title: "Optimizing Next.js 16 Server Components & Core Web Vitals",
    category: "Frontend",
    desc: "Learn our strategies for caching data fetching layers, minimizing bundle hydration sizes, and structuring layout routing for premium speeds.",
    author: "Alex Rivers",
    date: "June 19, 2026",
    readTime: "9 min read",
    color: "from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/10"
  },
  {
    title: "A Complete Guide to Git Rebase vs. Merge in Team Workflows",
    category: "Git",
    desc: "Prevent messy commit logs. Understand interactive rebasing, resolution of conflict loops, and branching strategies for modern engineering teams.",
    author: "Marcus Chen",
    date: "June 12, 2026",
    readTime: "7 min read",
    color: "from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/10"
  }
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "System", "Engineering", "Algorithms", "AI", "Frontend", "Git"];

  const filtered = POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Journal</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              Technical guides, engineering postmortems, compiler sandbox architectural reports, and tips straight from the CodeVerse core builders.
            </p>
          </motion.div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-4 border-t border-white/5">
            {/* Category selection scroll bar */}
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

            {/* Search inputs */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
              />
            </div>
          </div>

          {/* Grid list of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {filtered.map((post, idx) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-white/10 hover:shadow-lg transition-all group relative overflow-hidden h-72"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${post.color}`}>
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">
                    {post.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[9px] text-emerald-400">
                      {post.author.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <button
                    onClick={() => alert(`Redirecting to article detail page for '${post.title}'...`)}
                    className="text-xs font-bold text-emerald-400 flex items-center gap-1 hover:text-emerald-300 transition-colors"
                  >
                    Read Post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-slate-900/10 border border-white/5 rounded-3xl text-slate-500 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto opacity-40 text-emerald-500 animate-pulse" />
              <p className="text-xs">No articles found matching your selections.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
