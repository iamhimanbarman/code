"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, FileText, CheckCircle, ArrowRight, UserCheck, Star, Sparkles, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MATCHED_JOBS = [
  {
    company: "Stripe",
    logo: "💳",
    role: "Software Engineer, Core Platform",
    salary: "$165,000 - $210,000",
    match: "94%",
    stack: ["TypeScript", "Node.js", "Ruby", "Prisma"],
    location: "San Francisco, CA (Hybrid)"
  },
  {
    company: "Google",
    logo: "🔍",
    role: "Frontend Developer, Cloud Console",
    salary: "$180,000 - $240,000",
    match: "89%",
    stack: ["React", "TypeScript", "Next.js", "Tailwind"],
    location: "Mountain View, CA"
  },
  {
    company: "Vercel",
    logo: "▲",
    role: "Developer Advocate",
    salary: "$140,000 - $185,000",
    match: "85%",
    stack: ["Next.js", "React", "Serverless", "TailwindCSS"],
    location: "Remote (Global)"
  }
];

export default function CareerPortal() {
  const [resumeText, setResumeText] = useState("");
  const [enhancedResume, setEnhancedResume] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setIsEnhancing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setEnhancedResume(`💡 PROFESSIONAL PROFILE
Highly analytical and detail-oriented Software Engineer with a strong foundation in modern Javascript architectures, database schema optimization, and AI model routing.

🛠️ ENHANCED CORE EXPERIENCE Bullet Points:
• Engineered high-performance backend microservices using NestJS and Prisma ORM, reducing database latency bounds by 38% under high load.
• Integrated Google Gemini AI models directly into development workspaces to streamline automated tutor review code flows.
• Built browser-based sandbox IDEs supporting real-time script evaluation with clean, isolated iframe executions.
• Collaborated in git-based workflows managing release merges and automated code review pull requests.`);
    setIsEnhancing(false);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10">
            <Link href="/#features" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Platform Landing
            </Link>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <Briefcase className="w-9 h-9 text-rose-400" />
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Portal</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Accelerate your engineering placement bounds with integrated AI resumes, recruiter matching, and mock trials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              
              {/* Job Readiness Hub */}
              <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-rose-400" />
                  Developer Job Readiness Score
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Technical DSA Core", value: "85%", desc: "12 challenges solved" },
                    { label: "System Architecture", value: "78%", desc: "3 optimized projects" },
                    { label: "AI Interview Trials", value: "92%", desc: "Avg. recruiter score" }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-slate-900/40 border border-white/5 p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-rose-400">{metric.value}</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">{metric.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{metric.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-rose-300">Ready to test your live behavior?</h3>
                    <p className="text-xs text-slate-300 mt-0.5">Start an interactive chat trial simulator with an AI Recruiter interviewer.</p>
                  </div>
                  <Link
                    href="/ai-engine/interview"
                    className="flex items-center gap-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start AI Interview
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* AI Resume Enhancer */}
              <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-400" />
                  AI Resume Enhancer
                </h2>
                <p className="text-sm text-slate-400 mb-4">Paste your current resume descriptions or experience bullet points and generate enhanced descriptions.</p>

                <form onSubmit={handleEnhanceResume} className="space-y-4">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="e.g. I did coding in backend NestJS application and set up database tables."
                    className="w-full h-32 p-4 bg-slate-900 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isEnhancing || !resumeText.trim()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold transition-all disabled:opacity-50"
                  >
                    {isEnhancing ? (
                      <>Enhancing resume...</>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Enhance Resume Bullet Points
                      </>
                    )}
                  </button>
                </form>

                {enhancedResume && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-5"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                        <CheckCircle className="w-4 h-4" /> Optimized Output Ready
                      </div>
                      <button
                        onClick={() => alert("Resume downloaded!")}
                        className="flex items-center gap-1 text-[11px] bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-600/30 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {enhancedResume}
                    </pre>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Recruiter Placement Feed */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
                  <Star className="w-4 h-4 text-rose-400" />
                  Matched Developer Jobs
                </h2>

                <div className="space-y-4">
                  {MATCHED_JOBS.map((job) => (
                    <div
                      key={job.company}
                      className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{job.logo}</span>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-rose-400 transition-colors">{job.company}</h3>
                            <p className="text-xs text-slate-400">{job.location}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {job.match} match
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200 mt-3">{job.role}</h4>
                      <p className="text-xs text-rose-300 font-medium mt-0.5">{job.salary}</p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.stack.map((tech) => (
                          <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
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
