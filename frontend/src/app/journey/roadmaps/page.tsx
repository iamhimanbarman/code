"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Code, ChevronRight, ChevronDown, CheckCircle2, Circle, Lock,
  Globe, Database, Layers, Terminal, Cpu, GitBranch, Zap, Trophy, Clock,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ROADMAPS = [
  {
    id: "frontend",
    title: "Frontend Development",
    desc: "Master modern web development from HTML basics to production React/Next.js applications.",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-500",
    totalTopics: 42,
    estimatedHours: 120,
    modules: [
      {
        title: "Web Fundamentals",
        topics: [
          { title: "How the Internet Works", type: "reading", duration: "15 min", free: true },
          { title: "HTML5 Deep Dive", type: "tutorial", duration: "2 hr", free: true },
          { title: "CSS3 & Flexbox/Grid", type: "tutorial", duration: "3 hr", free: true },
          { title: "Responsive Design Patterns", type: "project", duration: "2 hr", free: true },
          { title: "Practice: Build a Landing Page", type: "challenge", duration: "1.5 hr", free: true },
        ],
      },
      {
        title: "JavaScript Mastery",
        topics: [
          { title: "Variables, Types & Operators", type: "tutorial", duration: "1 hr", free: true },
          { title: "Functions & Scope", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "Arrays, Objects & Destructuring", type: "tutorial", duration: "2 hr", free: true },
          { title: "Async/Await & Promises", type: "tutorial", duration: "2 hr", free: true },
          { title: "DOM Manipulation", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "ES6+ Modern Features", type: "reading", duration: "1 hr", free: true },
          { title: "Practice: Interactive Quiz App", type: "challenge", duration: "3 hr", free: true },
        ],
      },
      {
        title: "React Fundamentals",
        topics: [
          { title: "React Core Concepts", type: "tutorial", duration: "2 hr", free: true },
          { title: "Components & Props", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "State & Lifecycle", type: "tutorial", duration: "2 hr", free: true },
          { title: "Hooks Deep Dive", type: "tutorial", duration: "3 hr", free: false },
          { title: "Routing with React Router", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "Practice: Todo App with React", type: "challenge", duration: "2.5 hr", free: true },
        ],
      },
      {
        title: "Advanced Frontend",
        topics: [
          { title: "TypeScript for React", type: "tutorial", duration: "3 hr", free: false },
          { title: "State Management (Redux/Zustand)", type: "tutorial", duration: "2.5 hr", free: false },
          { title: "Next.js App Router", type: "tutorial", duration: "3 hr", free: false },
          { title: "Testing with Vitest & RTL", type: "tutorial", duration: "2 hr", free: false },
          { title: "Performance Optimization", type: "reading", duration: "1.5 hr", free: false },
          { title: "Capstone: Full Dashboard App", type: "project", duration: "8 hr", free: false },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    desc: "Build robust server-side applications with Node.js, databases, and cloud deployment.",
    icon: Database,
    gradient: "from-emerald-500 to-green-500",
    totalTopics: 38,
    estimatedHours: 110,
    modules: [
      {
        title: "Node.js Foundations",
        topics: [
          { title: "Node.js Runtime & Event Loop", type: "reading", duration: "1 hr", free: true },
          { title: "Modules & File System", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "HTTP Server from Scratch", type: "tutorial", duration: "2 hr", free: true },
          { title: "Express.js Fundamentals", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "RESTful API Design", type: "tutorial", duration: "2 hr", free: true },
        ],
      },
      {
        title: "Databases & ORM",
        topics: [
          { title: "SQL Fundamentals (PostgreSQL)", type: "tutorial", duration: "3 hr", free: true },
          { title: "Database Design & Normalization", type: "reading", duration: "1.5 hr", free: true },
          { title: "Prisma ORM Deep Dive", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "MongoDB & NoSQL Patterns", type: "tutorial", duration: "2 hr", free: false },
          { title: "Redis Caching Strategies", type: "tutorial", duration: "1.5 hr", free: false },
        ],
      },
      {
        title: "Authentication & Security",
        topics: [
          { title: "JWT Authentication Flow", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "OAuth2 & Social Login", type: "tutorial", duration: "2 hr", free: false },
          { title: "CORS, CSRF & Security Headers", type: "reading", duration: "1 hr", free: true },
          { title: "Rate Limiting & Input Validation", type: "tutorial", duration: "1.5 hr", free: false },
        ],
      },
      {
        title: "Advanced Backend",
        topics: [
          { title: "NestJS Framework", type: "tutorial", duration: "4 hr", free: false },
          { title: "WebSockets & Real-time", type: "tutorial", duration: "2 hr", free: false },
          { title: "Message Queues (RabbitMQ)", type: "tutorial", duration: "2 hr", free: false },
          { title: "Microservices Architecture", type: "reading", duration: "2 hr", free: false },
          { title: "Capstone: E-Commerce API", type: "project", duration: "10 hr", free: false },
        ],
      },
    ],
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    desc: "Systematic approach to solving coding problems and acing technical interviews.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-500",
    totalTopics: 56,
    estimatedHours: 200,
    modules: [
      {
        title: "Fundamentals",
        topics: [
          { title: "Big-O Notation & Complexity", type: "reading", duration: "1 hr", free: true },
          { title: "Arrays & Strings", type: "tutorial", duration: "2 hr", free: true },
          { title: "Hash Tables & Hash Maps", type: "tutorial", duration: "2 hr", free: true },
          { title: "Two Pointers Technique", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "Sliding Window", type: "tutorial", duration: "2 hr", free: true },
          { title: "Practice: 15 Easy Problems", type: "challenge", duration: "5 hr", free: true },
        ],
      },
      {
        title: "Linear Data Structures",
        topics: [
          { title: "Linked Lists (Singly & Doubly)", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Stacks & Queues", type: "tutorial", duration: "2 hr", free: true },
          { title: "Monotonic Stack Patterns", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "Practice: 10 Medium Problems", type: "challenge", duration: "5 hr", free: true },
        ],
      },
      {
        title: "Trees & Graphs",
        topics: [
          { title: "Binary Trees & BST", type: "tutorial", duration: "3 hr", free: true },
          { title: "Tree Traversals (BFS/DFS)", type: "tutorial", duration: "2 hr", free: true },
          { title: "Tries & Segment Trees", type: "tutorial", duration: "2.5 hr", free: false },
          { title: "Graph Representations", type: "tutorial", duration: "2 hr", free: true },
          { title: "Shortest Path Algorithms", type: "tutorial", duration: "3 hr", free: false },
          { title: "Union Find (Disjoint Set)", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "Topological Sort", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "Practice: 15 Graph Problems", type: "challenge", duration: "8 hr", free: true },
        ],
      },
      {
        title: "Advanced Techniques",
        topics: [
          { title: "Dynamic Programming Patterns", type: "tutorial", duration: "5 hr", free: false },
          { title: "Greedy Algorithms", type: "tutorial", duration: "2 hr", free: false },
          { title: "Backtracking & Recursion", type: "tutorial", duration: "3 hr", free: false },
          { title: "Binary Search Variants", type: "tutorial", duration: "2 hr", free: false },
          { title: "Bit Manipulation", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "Heap & Priority Queue", type: "tutorial", duration: "2 hr", free: false },
          { title: "Practice: 20 Hard Problems", type: "challenge", duration: "12 hr", free: false },
        ],
      },
    ],
  },
];

function getTypeIcon(type: string) {
  switch (type) {
    case "reading": return <BookOpen className="w-3.5 h-3.5" />;
    case "tutorial": return <Code className="w-3.5 h-3.5" />;
    case "challenge": return <Zap className="w-3.5 h-3.5" />;
    case "project": return <Terminal className="w-3.5 h-3.5" />;
    default: return <Circle className="w-3.5 h-3.5" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "reading": return "text-blue-400 bg-blue-400/10";
    case "tutorial": return "text-emerald-400 bg-emerald-400/10";
    case "challenge": return "text-amber-400 bg-amber-400/10";
    case "project": return "text-purple-400 bg-purple-400/10";
    default: return "text-slate-400 bg-slate-400/10";
  }
}

export default function RoadmapsPage() {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  // Simulated progress
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const toggleModule = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTopic = (key: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          <Link href="/journey" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journey
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Roadmaps</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Structured, step-by-step curricula with progress tracking. Click on topics to mark them complete and track your learning.
            </p>
          </motion.div>

          {ROADMAPS.map((roadmap, ri) => {
            const totalTopics = roadmap.modules.reduce((sum, m) => sum + m.topics.length, 0);
            const completedCount = roadmap.modules.reduce(
              (sum, m, mi) =>
                sum + m.topics.filter((_, ti) => completedTopics.has(`${roadmap.id}-${mi}-${ti}`)).length,
              0
            );
            const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

            return (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ri * 0.1 }}
                className="mb-12"
              >
                {/* Roadmap Header */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl mb-4">
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <roadmap.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                        <h2 className="text-xl font-bold text-white">{roadmap.title}</h2>
                        <Link
                          href={`/journey/roadmaps/${roadmap.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Launch Interactive Path <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{roadmap.desc}</p>
                      <div className="flex items-center gap-6 text-xs text-slate-500 mb-4">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {totalTopics} topics</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {roadmap.estimatedHours}h estimated</span>
                        <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> {completedCount}/{totalTopics} completed</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${roadmap.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{progress}% complete</p>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="space-y-2">
                  {roadmap.modules.map((module, mi) => {
                    const moduleKey = `${roadmap.id}-mod-${mi}`;
                    const isExpanded = expandedModules[moduleKey] !== false; // default open
                    const moduleCompleted = module.topics.filter(
                      (_, ti) => completedTopics.has(`${roadmap.id}-${mi}-${ti}`)
                    ).length;

                    return (
                      <div key={mi} className="bg-slate-900/30 border border-white/5 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleModule(moduleKey)}
                          className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                              {mi + 1}
                            </div>
                            <span className="font-semibold text-white text-sm">{module.title}</span>
                            <span className="text-xs text-slate-500">
                              ({moduleCompleted}/{module.topics.length})
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {isExpanded && (
                          <div className="border-t border-white/5 px-4 pb-3">
                            {module.topics.map((topic, ti) => {
                              const topicKey = `${roadmap.id}-${mi}-${ti}`;
                              const isDone = completedTopics.has(topicKey);

                              return (
                                <div
                                  key={ti}
                                  className="flex items-center gap-3 py-2.5 group cursor-pointer"
                                  onClick={() => toggleTopic(topicKey)}
                                >
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isDone
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : "border border-slate-700 text-transparent group-hover:border-slate-500"
                                  }`}>
                                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className={`text-sm font-medium ${isDone ? "text-slate-500 line-through" : "text-slate-200"}`}>
                                      {topic.title}
                                    </span>
                                  </div>
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 ${getTypeColor(topic.type)}`}>
                                    {getTypeIcon(topic.type)} {topic.type}
                                  </span>
                                  <span className="text-xs text-slate-600 w-16 text-right">{topic.duration}</span>
                                  {!topic.free && <Lock className="w-3 h-3 text-slate-600" />}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
