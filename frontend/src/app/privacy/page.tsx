"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when creating an account, compiling code in our Web IDE, solving challenges, or requesting developer profile support. This includes: user profile details (displayName, username, bio, website, LinkedIn/GitHub URLs), authentication data, and user-submitted code snippets compiled in our compilers."
    },
    {
      title: "2. How We Use Information",
      content: "We use the information we collect to operate, configure, and maintain the CodeVerse sandbox environments, compute level-ups and XP allocations, and manage user dashboards. We analyze compilation metadata to fix sandbox run errors, maintain code safety standards, and recommend algorithmic tracks matching your skill graph profile."
    },
    {
      title: "3. Compiler Sandbox Isolation",
      content: "CodeVerse executes user code inside stateless, isolated container environments (sandboxes). The code you compile in the Web IDE is transient and used only to return outputs or problems/errors, and is not permanently logged or sold to third parties. We enforce strict query size bounds and processing limitations to prevent service disruptions."
    },
    {
      title: "4. Cookies & Web Tokens",
      content: "We use secure HTTP-only cookies and JSON Web Tokens (JWTs) to authenticate requests and persist user state across routing. These cookies contain no personally identifiable details. You can disable cookies in your browser settings, though doing so will restrict authentication access and prevent code compiler saves."
    },
    {
      title: "5. Security & Isolation Limits",
      content: "We implement industry-standard database encryption and stateless API access rules. However, please note that no database connection or web transmission is entirely risk-free. Do not submit production database credentials, private API tokens, or high-risk private files into our compiler editor inputs."
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
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            </div>
            <p className="text-slate-400 text-xs font-mono">Last updated: July 22, 2026</p>
            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              At CodeVerse, we respect your privacy and isolation controls. This Privacy Policy details the data boundaries, compiler transient rules, and cookies used to support our developer ecosystem.
            </p>
          </motion.div>

          {/* Sections List */}
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
                  <span className="w-1 h-4 bg-indigo-500 rounded-full" />
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {sec.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl text-xs text-slate-400 leading-relaxed mt-12"
          >
            If you have questions regarding data retention, or want to permanently scrub your profile dashboard and Solved Challenges progress history, contact our support team at <a href="mailto:privacy@codeverse.com" className="text-indigo-400 hover:text-indigo-300 underline">privacy@codeverse.com</a>.
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
