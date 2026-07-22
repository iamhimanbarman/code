"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Terminal, Star, CheckCircle, Code, ChevronLeft, ChevronRight, X } from "lucide-react";
import { challengesService } from "@/lib/services";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Challenge = {
  id: string;
  number?: number;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  tags: string[];
  acceptanceRate: number;
  xpReward?: number;
  paidOnly?: boolean;
};

const DIFFICULTIES = ["ALL", "EASY", "MEDIUM", "HARD"] as const;
const PAGE_SIZE = 50;

export default function ChallengesPage() {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Pagination
  const [page, setPage] = useState(1);

  // Load data: try API first, then fall back to static JSON
  useEffect(() => {
    async function loadChallenges() {
      try {
        const res = await challengesService.getAll({ limit: 5000 });
        if (res && res.data && res.data.length > 10) {
          setAllChallenges(res.data);
          setIsLoading(false);
          return;
        }
      } catch {
        // API unavailable — fall through to static JSON
      }

      try {
        const resp = await fetch("/data/challenges.json");
        if (resp.ok) {
          const data = await resp.json();
          setAllChallenges(data);
        }
      } catch (e) {
        console.error("Failed to load static challenges data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadChallenges();
  }, []);

  // Extract unique categories for the filter panel
  const categories = useMemo(() => {
    const set = new Set(allChallenges.map((c) => c.category));
    return ["ALL", ...Array.from(set).sort()];
  }, [allChallenges]);

  // Filtered + searched challenges
  const filtered = useMemo(() => {
    let list = allChallenges;

    if (difficulty !== "ALL") {
      list = list.filter((c) => c.difficulty === difficulty);
    }
    if (selectedCategory !== "ALL") {
      list = list.filter((c) => c.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.slug.includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allChallenges, difficulty, selectedCategory, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, difficulty, selectedCategory]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "MEDIUM":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "HARD":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  // Difficulty breakdown stats
  const stats = useMemo(() => {
    const easy = allChallenges.filter((c) => c.difficulty === "EASY").length;
    const medium = allChallenges.filter((c) => c.difficulty === "MEDIUM").length;
    const hard = allChallenges.filter((c) => c.difficulty === "HARD").length;
    return { total: allChallenges.length, easy, medium, hard };
  }, [allChallenges]);

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
                Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Challenges</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-lg max-w-2xl">
                {stats.total.toLocaleString()} problems across all difficulty levels. Master data structures, algorithms, and ace your interviews.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto"
            >
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search problems..." 
                  className="bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all backdrop-blur-xl w-full sm:w-72 text-sm"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${showFilters ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-800 hover:bg-slate-700 text-white border-white/10"}`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </motion.div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl"
            >
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-400 mb-3">Difficulty</p>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        difficulty === d
                          ? d === "ALL"
                            ? "bg-white/10 border-white/20 text-white"
                            : d === "EASY"
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                            : d === "MEDIUM"
                            ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                            : "bg-rose-500/15 border-rose-500/30 text-rose-400"
                          : "bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700/50"
                      }`}
                    >
                      {d === "ALL" ? "All" : d.charAt(0) + d.slice(1).toLowerCase()}
                      {d !== "ALL" && (
                        <span className="ml-1.5 opacity-60">
                          ({d === "EASY" ? stats.easy : d === "MEDIUM" ? stats.medium : stats.hard})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-400 mb-3">Category</p>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        selectedCategory === cat
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                          : "bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700/50"
                      }`}
                    >
                      {cat === "ALL" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 mb-6 sm:mb-10">
            {[
              { label: "Total Problems", value: stats.total.toLocaleString(), icon: Code, color: "text-indigo-400" },
              { label: "Easy", value: stats.easy.toLocaleString(), icon: CheckCircle, color: "text-emerald-400" },
              { label: "Medium", value: stats.medium.toLocaleString(), icon: Star, color: "text-amber-400" },
              { label: "Hard", value: stats.hard.toLocaleString(), icon: Terminal, color: "text-rose-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                className="bg-slate-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 backdrop-blur-xl hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-800/50 border border-white/5 ${stat.color}`}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-medium mb-0.5">{stat.label}</p>
                    <p className="text-base sm:text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results summary + Pagination top */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <p className="text-sm text-slate-400">
              Showing <span className="text-white font-medium">{((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of{" "}
              <span className="text-white font-medium">{filtered.length.toLocaleString()}</span> problems
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-slate-300 min-w-[80px] text-center">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Challenges Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-800/20">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-slate-400 w-10 sm:w-16">#</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-slate-400">Title</th>
                    <th className="hidden md:table-cell px-6 py-4 text-sm font-medium text-slate-400">Category</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-sm font-medium text-slate-400">Acceptance</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-slate-400">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 sm:px-6 py-8 sm:py-12 text-center text-slate-400 text-sm">
                        <div className="flex items-center justify-center gap-3">
                          <Code className="w-5 h-5 animate-spin text-emerald-400" />
                          Loading {">"}3,500 challenges...
                        </div>
                      </td>
                    </tr>
                  ) : paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 sm:px-6 py-8 sm:py-12 text-center text-slate-400 text-sm">
                        No challenges match your filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((challenge) => (
                      <tr 
                        key={challenge.id} 
                        className="group hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm text-slate-500 font-mono">
                          {challenge.number || "—"}
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5">
                          <Link 
                            href={`/challenges/${challenge.slug}`}
                            className="font-medium text-sm sm:text-base text-white hover:text-emerald-400 transition-colors"
                          >
                            {challenge.title}
                          </Link>
                          {challenge.tags && challenge.tags.length > 0 && (
                            <div className="flex gap-1.5 mt-1.5 flex-wrap">
                              {challenge.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="hidden md:table-cell px-6 py-3.5 text-sm text-slate-400">
                          {challenge.category}
                        </td>
                        <td className="hidden sm:table-cell px-6 py-3.5 text-sm text-slate-400">
                          {challenge.acceptanceRate}%
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5">
                          <span className={`text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Pagination Bottom */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                First
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page number buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      page === pageNum
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                        : "border border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Last
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
