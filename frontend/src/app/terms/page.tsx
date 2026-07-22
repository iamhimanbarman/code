"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Key, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By creating an account, accessing our Journey curriculum pathways, or typing code within the Web IDE, you agree to comply with these Terms of Service. If you do not accept these terms in full, please do not activate sandbox compilation services or access CodeVerse platforms."
    },
    {
      title: "2. Account Registration & Safety",
      content: "You must maintain a secure login password. You are responsible for all profile settings, display settings, and sandbox compiler scripts initiated under your account. We reserve the right to suspend accounts executing dangerous recursion loops, shell execution attempts, or server port floods."
    },
    {
      title: "3. Interactive Sandbox Constraints",
      content: "CodeVerse offers temporary code compilers inside isolated environments to simulate outputs. You receive personal, non-transferable access. Executing malicious scripts, hosting backend endpoints, attempts to escape the virtualization layers, or running commercial cron jobs is strictly prohibited."
    },
    {
      title: "4. Intellectual Property & Code Ownership",
      content: "You retain full ownership of the original code snippets you write inside the CodeVerse playgrounds and compilers. By submitting code to public contests or forums, you grant us a local, royalty-free license to display and verify execution results for standard developer metrics."
    },
    {
      title: "5. Disclaimer of Compiler Liability",
      content: "CODEVERSE SANDBOX COMPILERS AND AI ADVISERS ARE PROVIDED 'AS IS' WITHOUT EXPRESS WARRANTY. WE DO NOT GUARANTEE SYSTEM UPTIME, FAULTLESS PROGRAM COMPILATIONS, OR COMPATIBILITY OF TEST CASES. WE HELD ZERO LIABILITY FOR ANY DIRECT CODE COLLAPSE OR LOSS OF IDE METRICS."
    }
  ];

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10 text-white font-sans">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
          
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
            </div>
            <p className="text-slate-400 text-xs font-mono">Last updated: July 22, 2026</p>
            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              Please review these Terms of Service prior to executing sandbox compiler runs or participating in global challenge tracks on CodeVerse.
            </p>
          </motion.div>

          {/* Terms sections list */}
          <div className="space-y-8 pt-4 border-t border-white/5">
            {sections.map((sec, idx) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="space-y-3"
              >
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-4 bg-purple-500 rounded-full" />
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {sec.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Warning banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex gap-3 text-xs text-rose-300 leading-relaxed mt-12"
          >
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>
              <strong>Note:</strong> Escaping our Docker sandbox layers or exploiting compiler execution endpoints will result in an immediate hardware ban and possible legal review. Code safely and respect sandbox boundaries.
            </span>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
