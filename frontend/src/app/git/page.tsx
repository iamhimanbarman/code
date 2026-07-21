"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, GitFork, GitCommit, GitPullRequest, GitBranch, Plus, Check, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type RepositoryFile = {
  name: string;
  status: "staged" | "unstaged" | "committed";
};

type CommitLog = {
  hash: string;
  message: string;
  author: string;
  date: string;
};

export default function GitEcosystem() {
  const [activeTab, setActiveTab] = useState<"workspace" | "prs">("workspace");
  const [branch, setBranch] = useState("main");
  const [commitMsg, setCommitMsg] = useState("");
  
  const [files, setFiles] = useState<RepositoryFile[]>([
    { name: "src/components/AIEngine.tsx", status: "unstaged" },
    { name: "src/app/challenges/page.tsx", status: "unstaged" },
    { name: "package.json", status: "committed" },
    { name: "backend/src/main.ts", status: "committed" }
  ]);

  const [commits, setCommits] = useState<CommitLog[]>([
    { hash: "f9b8c2d", message: "Initialize App layout and configure NestJS API endpoints", author: "Himan Barman", date: "July 21, 2026 12:44 PM" },
    { hash: "a091f8c", message: "Add Gemini optimization route fallbacks to live provider", author: "Himan Barman", date: "July 21, 2026 6:35 PM" }
  ]);

  const [prReviews, setPrReviews] = useState([
    {
      id: "#102",
      title: "Implement visual skill trees with game graph rewards",
      author: "Himan Barman",
      diffs: `+  const handleNodeClick = (node: SkillNode) => {
+    setSelectedNode(node);
+    scanSkillPath(node.id);
+  };`,
      status: "Open"
    }
  ]);

  const [gitOutput, setGitOutput] = useState<string[]>([
    "$ git status",
    "On branch main",
    "Your branch is up to date with 'origin/main'.",
    "Changes not staged for commit:",
    "  (use 'git add <file>...' to update what will be committed)",
    "    modified:   src/components/AIEngine.tsx",
    "    modified:   src/app/challenges/page.tsx"
  ]);

  const handleStageFile = (fileName: string) => {
    setFiles(prev =>
      prev.map(f => (f.name === fileName ? { ...f, status: "staged" } : f))
    );
    setGitOutput(prev => [
      ...prev,
      `$ git add ${fileName}`,
      `Staged 1 change in ${fileName}`
    ]);
  };

  const handleStageAll = () => {
    setFiles(prev =>
      prev.map(f => (f.status === "unstaged" ? { ...f, status: "staged" } : f))
    );
    setGitOutput(prev => [
      ...prev,
      `$ git add .`,
      `Staged all modified files successfully.`
    ]);
  };

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMsg.trim()) return;

    const stagedFiles = files.filter(f => f.status === "staged");
    if (stagedFiles.length === 0) {
      setGitOutput(prev => [...prev, `Error: No files staged for commit.`]);
      return;
    }

    const hash = Math.random().toString(16).substring(2, 9);
    const newCommit: CommitLog = {
      hash,
      message: commitMsg,
      author: "Himan Barman",
      date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };

    setCommits([newCommit, ...commits]);
    setFiles(prev =>
      prev.map(f => (f.status === "staged" ? { ...f, status: "committed" } : f))
    );
    setCommitMsg("");
    setGitOutput(prev => [
      ...prev,
      `$ git commit -m "${commitMsg}"`,
      `[${branch} ${hash}] ${commitMsg}`,
      ` ${stagedFiles.length} files changed, ${stagedFiles.length * 4} insertions(+)`
    ]);
  };

  const handleMergePR = (id: string) => {
    setPrReviews(prev => prev.map(p => p.id === id ? { ...p, status: "Merged" } : p));
    setGitOutput(prev => [
      ...prev,
      `$ git checkout main`,
      `$ git merge feature/skills-graph`,
      `Updating f9b8c2d..a091f8c`,
      `Fast-forward completed. PR ${id} successfully merged into main.`
    ]);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <Link href="/#features" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Platform Landing
              </Link>
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                <GitBranch className="w-9 h-9 text-blue-400" />
                Git <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ecosystem</span>
              </h1>
              <p className="text-slate-400 mt-2">
                Simulated interactive Git environments mapping branch configurations, code review pipelines, and PR status.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-900/80 border border-white/5 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("workspace")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "workspace"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <GitFork className="w-4 h-4" />
                Repository Workspace
              </button>
              <button
                onClick={() => setActiveTab("prs")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "prs"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <GitPullRequest className="w-4 h-4" />
                Pull Requests
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              
              <AnimatePresence mode="wait">
                {activeTab === "workspace" ? (
                  <motion.div
                    key="workspace"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Working Files */}
                    <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-200">
                          <span>Working Directory</span>
                        </h2>
                        <button
                          onClick={handleStageAll}
                          className="text-xs px-3 py-1.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-all"
                        >
                          Stage All Changes
                        </button>
                      </div>

                      <div className="space-y-3">
                        {files.map(file => (
                          <div
                            key={file.name}
                            className="flex justify-between items-center p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <span className="font-mono text-sm text-slate-300">{file.name}</span>
                            <div className="flex items-center gap-3">
                              {file.status === "unstaged" && (
                                <button
                                  onClick={() => handleStageFile(file.name)}
                                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Stage
                                </button>
                              )}
                              {file.status === "staged" && (
                                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <Check className="w-3.5 h-3.5" /> Staged
                                </span>
                              )}
                              {file.status === "committed" && (
                                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-white/5">
                                  Committed
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Commit Box */}
                    <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                      <h2 className="text-lg font-semibold mb-4 text-slate-200">Commit Changes</h2>
                      <form onSubmit={handleCommit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                          type="text"
                          value={commitMsg}
                          onChange={(e) => setCommitMsg(e.target.value)}
                          placeholder="e.g. Implement navigation path linking feature cards..."
                          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                        />
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-50 text-white font-semibold transition-all hover:bg-blue-500"
                        >
                          <GitCommit className="w-4 h-4" />
                          Commit
                        </button>
                      </form>
                    </div>

                    {/* Commits Timeline */}
                    <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                      <h2 className="text-lg font-semibold mb-6 text-slate-200">Commits Timeline</h2>
                      <div className="relative border-l border-white/5 ml-4 pl-6 space-y-8">
                        {commits.map(commit => (
                          <div key={commit.hash} className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 border border-blue-500 ring-4 ring-slate-950">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            </span>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-white">{commit.message}</h3>
                                <p className="text-xs text-slate-400 mt-1">
                                  Authored by <span className="text-slate-300">{commit.author}</span> on {commit.date}
                                </p>
                              </div>
                              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 border border-white/5 text-blue-300">
                                {commit.hash}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prs"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {prReviews.map(pr => (
                      <div
                        key={pr.id}
                        className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 backdrop-blur-xl"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-blue-400 font-bold">{pr.id}</span>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${pr.status === "Open" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"}`}>
                                {pr.status}
                              </span>
                            </div>
                            <h2 className="text-xl font-bold mt-1 text-slate-100">{pr.title}</h2>
                            <p className="text-xs text-slate-400 mt-1">Requested by {pr.author}</p>
                          </div>

                          {pr.status === "Open" && (
                            <button
                              onClick={() => handleMergePR(pr.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
                            >
                              Merge Pull Request
                            </button>
                          )}
                        </div>

                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 font-mono text-xs text-emerald-400 max-h-[200px] overflow-y-auto mt-4">
                          <div className="text-slate-500 mb-2">// Code Diff Review</div>
                          {pr.diffs.split("\n").map((line, i) => (
                            <div key={i} className={line.startsWith("+") ? "text-emerald-400" : "text-slate-300"}>
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Git Terminal simulation */}
            <div className="lg:col-span-4 flex flex-col bg-slate-950 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl h-[400px] font-mono text-xs">
              <div className="flex items-center gap-2 px-6 py-4 bg-slate-900/40 border-b border-white/5 text-slate-400">
                <Play className="w-4 h-4 text-blue-400" />
                <span>Git Console Logs</span>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-2 text-slate-300">
                {gitOutput.map((out, idx) => (
                  <div
                    key={idx}
                    className={
                      out.startsWith("$")
                        ? "text-blue-400"
                        : out.includes("Staged")
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }
                  >
                    {out}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
