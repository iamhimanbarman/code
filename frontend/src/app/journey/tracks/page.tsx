"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Award, BookOpen, Code, Trophy, Zap, ChevronRight,
  ArrowLeft, Search, CheckCircle2, Lock, Star, Play, Sparkles
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Practice Tracks Data with associated problems
const TRACKS_DATA = [
  {
    id: "blind-75",
    title: "Blind 75",
    desc: "The legendary set of 75 essential problems for coding interviews.",
    count: 75,
    diff: "Mixed",
    color: "from-amber-500 to-orange-600",
    xp: 1500,
    problems: [
      { id: "two-sum", title: "Two Sum", difficulty: "EASY", category: "Arrays & Hashing", slug: "two-sum", xp: 100 },
      { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "EASY", category: "Stack", slug: "valid-parentheses", xp: 100 },
      { id: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", difficulty: "EASY", category: "Linked List", slug: "merge-two-sorted-lists", xp: 100 },
      { id: "longest-substring-no-repeat", title: "Longest Substring Without Repeating Characters", difficulty: "MEDIUM", category: "Sliding Window", slug: "longest-substring-no-repeat", xp: 200 },
      { id: "reverse-linked-list", title: "Reverse Linked List", difficulty: "EASY", category: "Linked List", slug: "reverse-linked-list", xp: 100 },
      { id: "container-with-most-water", title: "Container With Most Water", difficulty: "MEDIUM", category: "Two Pointers", slug: "container-with-most-water", xp: 200 },
      { id: "three-sum", title: "3Sum", difficulty: "MEDIUM", category: "Two Pointers", slug: "three-sum", xp: 200 },
      { id: "valid-anagram", title: "Valid Anagram", difficulty: "EASY", category: "Arrays & Hashing", slug: "valid-anagram", xp: 100 },
    ]
  },
  {
    id: "leetcode-100",
    title: "LeetCode Top 100",
    desc: "The most frequently asked interview problems at top-tier companies.",
    count: 100,
    diff: "Mixed",
    color: "from-rose-500 to-pink-600",
    xp: 2000,
    problems: [
      { id: "two-sum", title: "Two Sum", difficulty: "EASY", category: "Arrays", slug: "two-sum", xp: 100 },
      { id: "longest-substring-no-repeat", title: "Longest Substring Without Repeating Characters", difficulty: "MEDIUM", category: "Sliding Window", slug: "longest-substring-no-repeat", xp: 200 },
      { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "EASY", category: "Stack", slug: "valid-parentheses", xp: 100 },
      { id: "merge-intervals", title: "Merge Intervals", difficulty: "MEDIUM", category: "Sorting", slug: "merge-intervals", xp: 200 },
      { id: "group-anagrams", title: "Group Anagrams", difficulty: "MEDIUM", category: "Hash Table", slug: "group-anagrams", xp: 200 },
    ]
  },
  {
    id: "dp-mastery",
    title: "Dynamic Programming Mastery",
    desc: "From basic memoization to complex multi-dimensional state machines.",
    count: 48,
    diff: "Medium–Hard",
    color: "from-indigo-500 to-purple-600",
    xp: 1200,
    problems: [
      { id: "climbing-stairs", title: "Climbing Stairs", difficulty: "EASY", category: "Dynamic Programming", slug: "climbing-stairs", xp: 100 },
      { id: "coin-change", title: "Coin Change", difficulty: "MEDIUM", category: "Dynamic Programming", slug: "coin-change", xp: 200 },
      { id: "longest-common-subsequence", title: "Longest Common Subsequence", difficulty: "MEDIUM", category: "Dynamic Programming", slug: "longest-common-subsequence", xp: 200 },
      { id: "house-robber", title: "House Robber", difficulty: "MEDIUM", category: "Dynamic Programming", slug: "house-robber", xp: 200 },
    ]
  },
  {
    id: "graphs-dive",
    title: "Graph Algorithms Deep Dive",
    desc: "BFS, DFS, shortest paths, topological sort, and Minimum Spanning Trees.",
    count: 35,
    diff: "Medium–Hard",
    color: "from-cyan-500 to-teal-600",
    xp: 900,
    problems: [
      { id: "number-of-islands", title: "Number of Islands", difficulty: "MEDIUM", category: "Graphs", slug: "number-of-islands", xp: 200 },
      { id: "clone-graph", title: "Clone Graph", difficulty: "MEDIUM", category: "Graphs", slug: "clone-graph", xp: 200 },
      { id: "course-schedule", title: "Course Schedule", difficulty: "MEDIUM", category: "Graphs", slug: "course-schedule", xp: 200 },
      { id: "pacific-atlantic-water-flow", title: "Pacific Atlantic Water Flow", difficulty: "MEDIUM", category: "Graphs", slug: "pacific-atlantic-water-flow", xp: 200 },
    ]
  },
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing Fundamentals",
    desc: "Master the most common structural coding patterns and complexity tradeoffs.",
    count: 40,
    diff: "Easy–Medium",
    color: "from-emerald-500 to-green-600",
    xp: 800,
    problems: [
      { id: "concatenation-of-array", title: "Concatenation of Array", difficulty: "EASY", category: "Arrays", slug: "concatenation-of-array", xp: 100 },
      { id: "two-sum", title: "Two Sum", difficulty: "EASY", category: "Arrays", slug: "two-sum", xp: 100 },
      { id: "contains-duplicate", title: "Contains Duplicate", difficulty: "EASY", category: "Arrays", slug: "contains-duplicate", xp: 100 },
      { id: "valid-anagram", title: "Valid Anagram", difficulty: "EASY", category: "Arrays", slug: "valid-anagram", xp: 100 },
      { id: "top-k-frequent-elements", title: "Top K Frequent Elements", difficulty: "MEDIUM", category: "Arrays", slug: "top-k-frequent-elements", xp: 200 },
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search Patterns",
    desc: "Master standard, rotated, and answer-on-value binary search techniques.",
    count: 22,
    diff: "Easy–Hard",
    color: "from-violet-500 to-fuchsia-600",
    xp: 600,
    problems: [
      { id: "binary-search", title: "Binary Search", difficulty: "EASY", category: "Binary Search", slug: "binary-search", xp: 100 },
      { id: "search-a-2d-matrix", title: "Search a 2D Matrix", difficulty: "MEDIUM", category: "Binary Search", slug: "search-a-2d-matrix", xp: 200 },
      { id: "search-in-rotated-sorted-array", title: "Search in Rotated Sorted Array", difficulty: "MEDIUM", category: "Binary Search", slug: "search-in-rotated-sorted-array", xp: 200 },
      { id: "find-minimum-in-rotated-sorted-array", title: "Find Minimum in Rotated Sorted Array", difficulty: "MEDIUM", category: "Binary Search", slug: "find-minimum-in-rotated-sorted-array", xp: 200 },
    ]
  }
];

export default function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [xpPoints, setXpPoints] = useState(0);

  // Load solved problems & XP
  useEffect(() => {
    const savedSolved = localStorage.getItem("cv-solved-problems");
    if (savedSolved) {
      try {
        setSolvedProblems(new Set(JSON.parse(savedSolved)));
      } catch (e) {
        console.error(e);
      }
    }

    const savedXp = localStorage.getItem("cv-xp-points");
    if (savedXp) {
      setXpPoints(parseInt(savedXp, 10));
    }
  }, []);

  const toggleSolveProblem = (problemId: string, xpReward: number) => {
    setSolvedProblems((prev) => {
      const next = new Set(prev);
      let newXp = xpPoints;

      if (next.has(problemId)) {
        next.delete(problemId);
        newXp = Math.max(0, xpPoints - xpReward);
      } else {
        next.add(problemId);
        newXp = xpPoints + xpReward;
      }

      setXpPoints(newXp);
      localStorage.setItem("cv-xp-points", String(newXp));
      localStorage.setItem("cv-solved-problems", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "EASY": return "text-emerald-400 bg-emerald-400/10 border-emerald-500/20";
      case "MEDIUM": return "text-amber-400 bg-amber-400/10 border-amber-500/20";
      case "HARD": return "text-rose-400 bg-rose-400/10 border-rose-500/20";
      default: return "text-slate-400 bg-slate-400/10 border-slate-500/20";
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {!selectedTrack ? (
              // Main list of Tracks view
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
                      Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Tracks</span>
                    </h1>
                    <p className="text-slate-400 text-base max-w-2xl">
                      Master specific algorithmic topics step-by-step. Complete tracks to test your logic, earn badges, and gain bonus XP.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-2 rounded-xl text-sm font-semibold text-indigo-300">
                    <Trophy className="w-5 h-5 text-indigo-400" />
                    <span>XP Bank: {xpPoints} XP</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TRACKS_DATA.map((track) => {
                    // Calculate local track completion percentage based on simulated questions
                    const trackSolvedCount = track.problems.filter(p => solvedProblems.has(p.id)).length;
                    const progressVal = track.problems.length > 0 
                      ? Math.round((trackSolvedCount / track.problems.length) * 100) 
                      : 0;

                    return (
                      <div
                        key={track.id}
                        onClick={() => setSelectedTrack(track)}
                        className="group bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all cursor-pointer flex flex-col justify-between h-64 hover:shadow-lg"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-5">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center shadow-lg`}>
                              <Target className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-800/40 px-2.5 py-1 rounded-lg border border-white/5">
                              {track.count} Problems
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                            {track.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {track.desc}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-slate-500">{track.diff}</span>
                            <span className="font-semibold text-indigo-400">{progressVal}% Done</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                            <div className={`h-full bg-gradient-to-r ${track.color} rounded-full`} style={{ width: `${progressVal}%` }} />
                          </div>
                          
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
                            <span>+{track.xp} Completion XP</span>
                            <span className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                              Open Track <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // Track Detail View
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Tracks List
                </button>

                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl mb-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTrack.color} flex items-center justify-center shadow-lg`}>
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight">{selectedTrack.title}</h2>
                          <p className="text-xs text-slate-400 mt-0.5">{selectedTrack.diff} Difficulty • +{selectedTrack.xp} XP reward</p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                        {selectedTrack.desc} Complete the key concepts below to finish this practice track.
                      </p>
                    </div>

                    <div className="w-full md:w-60 bg-slate-950/40 border border-white/5 rounded-2xl p-5 text-center">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-2">Track Completion</p>
                      <div className="text-3xl font-extrabold text-white mb-2">
                        {selectedTrack.problems.filter((p: any) => solvedProblems.has(p.id)).length} / {selectedTrack.problems.length}
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${selectedTrack.color} rounded-full`}
                          style={{
                            width: `${(selectedTrack.problems.filter((p: any) => solvedProblems.has(p.id)).length / selectedTrack.problems.length) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
                  <div className="px-6 py-4 border-b border-white/5 bg-slate-800/20 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Required Problems
                  </div>
                  
                  <div className="divide-y divide-white/5">
                    {selectedTrack.problems.map((prob: any, idx: number) => {
                      const isSolved = solvedProblems.has(prob.id);

                      return (
                        <div key={prob.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <button
                              onClick={() => toggleSolveProblem(prob.id, prob.xp)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isSolved 
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 scale-105"
                                  : "border border-slate-700 text-transparent hover:border-slate-500"
                              }`}
                              title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                            >
                              {isSolved && <CheckCircle2 className="w-4 h-4" />}
                            </button>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2.5">
                                <Link
                                  href={`/challenges/${prob.slug}`}
                                  className={`text-sm font-semibold hover:text-indigo-400 transition-colors ${
                                    isSolved ? "text-slate-500 line-through" : "text-white"
                                  }`}
                                >
                                  {prob.title}
                                </Link>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider ${getDifficultyColor(prob.difficulty)}`}>
                                  {prob.difficulty}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{prob.category} • +{prob.xp} XP</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <Link
                              href={`/challenges/${prob.slug}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-white/5 hover:border-white/10"
                            >
                              <Play className="w-3 h-3 fill-white" /> Launch Editor
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
}
