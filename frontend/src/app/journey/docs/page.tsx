"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, ChevronRight, ArrowLeft, Search, ExternalLink, Code,
  FileText, Lightbulb, Star, CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageLogo } from "./[slug]/page";

const LANGUAGES = [
  {
    slug: "javascript",
    name: "JavaScript",
    color: "from-yellow-500 to-amber-500",
    desc: "The language of the web. Learn ES6+, async patterns, DOM, and modern JS runtime.",
    officialDocs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    slug: "python",
    name: "Python",
    color: "from-blue-500 to-cyan-500",
    desc: "Versatile, beginner-friendly language. Perfect for DSA, machine learning, and backend.",
    officialDocs: "https://docs.python.org/3/",
  },
  {
    slug: "java",
    name: "Java",
    color: "from-red-500 to-orange-500",
    desc: "Enterprise-grade class-based language. Strong typing, OOP, and massive ecosystem.",
    officialDocs: "https://docs.oracle.com/en/java/",
  },
  {
    slug: "cpp",
    name: "C++",
    color: "from-indigo-500 to-blue-600",
    desc: "High-performance systems programming. Essential for competitive programming and engines.",
    officialDocs: "https://en.cppreference.com/",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    color: "from-blue-600 to-indigo-600",
    desc: "Strictly typed superset of JavaScript compiling to browser-clean JS.",
    officialDocs: "https://www.typescriptlang.org/docs/",
  },
  {
    slug: "go",
    name: "Go",
    color: "from-cyan-500 to-teal-500",
    desc: "Simple, high-throughput compiled language designed by Google for networking services.",
    officialDocs: "https://go.dev/doc/",
  },
  {
    slug: "rust",
    name: "Rust",
    color: "from-orange-600 to-red-700",
    desc: "System-level language focusing on borrow-checked compilation and thread safety.",
    officialDocs: "https://doc.rust-lang.org/book/",
  },
  {
    slug: "sql",
    name: "SQL",
    color: "from-blue-600 to-indigo-700",
    desc: "Structured Query Language for reading, joining, and writing to relational database stores.",
    officialDocs: "https://www.postgresql.org/docs/",
  }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <Link href="/journey" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journey Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Documentation &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Guides</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-6">
              Comprehensive references covering variables, memory allocations, object-oriented code, standard libraries, and practice algorithms.
            </p>

            {/* Global Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search languages or descriptions..."
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 backdrop-blur-xl"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLanguages.map((lang, idx) => (
              <motion.div
                key={lang.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all flex flex-col justify-between h-56 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center shadow-lg p-3 bg-slate-950/40 border border-white/5`}>
                      <LanguageLogo slug={lang.slug} className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {lang.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {lang.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-white/5">
                  <a
                    href={lang.officialDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-slate-300 transition-colors flex items-center gap-1"
                  >
                    Official Reference <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    href={`/journey/docs/${lang.slug}`}
                    className="flex items-center gap-1 text-indigo-400 font-bold group-hover:translate-x-1 transition-transform"
                  >
                    Open Guides <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-16 bg-slate-900/10 border border-white/5 rounded-2xl text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No languages found matching &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
