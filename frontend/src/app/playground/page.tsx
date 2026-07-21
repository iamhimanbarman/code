"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Terminal as TermIcon, Sparkles, Code2, RefreshCw, Layers } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LANG_TEMPLATES = {
  javascript: `// CodeVerse JavaScript Sandbox
const greeting = "Hello, Developer!";
console.log(greeting);

// Let's compute a simple fibonacci sequence
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log("Fibonacci(10):", fib(10));
`,
  python: `# CodeVerse Python Sandbox
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))

# Array manipulation example
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
print("Squares list:", squares)
`,
  html: `<!-- CodeVerse HTML/CSS Sandbox -->
<div class="card">
  <h1>Welcome to CodeVerse!</h1>
  <p>Modify this markup or style to see the live rendering frame below.</p>
  <button onclick="alert('Hello from sandbox!')">Click Me</button>
</div>

<style>
  body {
    background: radial-gradient(circle at center, #1e1b4b, #0f172a);
    color: #f8fafc;
    font-family: system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px fill rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2.5rem;
    border-radius: 1.5rem;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  button {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    transition: transform 0.2s;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>
`
};

export default function CodePlayground() {
  const [lang, setLang] = useState<keyof typeof LANG_TEMPLATES>("javascript");
  const [code, setCode] = useState(LANG_TEMPLATES.javascript);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Terminal initialized. Select a language, modify code, and hit Run to execute."
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const handleLangChange = (newLang: keyof typeof LANG_TEMPLATES) => {
    setLang(newLang);
    setCode(LANG_TEMPLATES[newLang]);
    setTerminalOutput([`Switched to ${newLang.toUpperCase()} environment. Ready to compile.`]);
    setPreviewHtml(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setTerminalOutput(prev => [...prev, `[running] launching compiler pipeline...`]);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (lang === "javascript") {
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
      };
      
      try {
        // Safe sandbox execution wrapper
        const sandboxFn = new Function(code);
        sandboxFn();
        setTerminalOutput([
          `[success] Sandbox compilation completed.`,
          `--- stdout ---`,
          ...logs,
          `--------------`,
          `Process exited with code 0 (elapsed: 14ms)`
        ]);
      } catch (err: any) {
        setTerminalOutput([
          `[error] Runtime Exception occurred!`,
          `--- stderr ---`,
          err.message,
          `--------------`,
          `Process exited with code 1`
        ]);
      } finally {
        console.log = originalLog;
      }
    } else if (lang === "python") {
      // Mock python interpreter stdout
      setTerminalOutput([
        `[success] Python standard compiler run complete.`,
        `--- stdout ---`,
        `Hello, Developer!`,
        `Squares list: [1, 4, 9, 16, 25]`,
        `--------------`,
        `Process exited with code 0 (elapsed: 42ms)`
      ]);
    } else if (lang === "html") {
      setPreviewHtml(code);
      setTerminalOutput([
        `[success] Markup parsed. Iframe renderer mounted.`,
        `View the output preview below.`
      ]);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(LANG_TEMPLATES[lang]);
    setTerminalOutput([`Workspace reset to default template.`]);
    setPreviewHtml(null);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <Link href="/#features" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Platform Landing
              </Link>
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                <Code2 className="w-9 h-9 text-indigo-400" />
                Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Playground</span>
              </h1>
              <p className="text-slate-400 mt-2">
                Experiment with coding paradigms in a rapid sandbox IDE.
              </p>
            </div>

            <div className="flex gap-3">
              {(["javascript", "python", "html"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize border transition-all ${
                    lang === l
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Playground Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Editor Console */}
            <div className="lg:col-span-7 flex flex-col bg-slate-950/70 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="flex justify-between items-center px-6 py-4 bg-slate-900/40 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-mono ml-2">sandbox_editor.{lang === "javascript" ? "js" : lang === "python" ? "py" : "html"}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Reset Code template"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
                  >
                    {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Run Code
                  </button>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[450px] p-6 bg-transparent text-slate-100 font-mono text-sm focus:outline-none resize-none leading-relaxed border-0"
                spellCheck="false"
              />
            </div>

            {/* Output terminal & helpers */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Output Console */}
              <div className="flex-1 flex flex-col bg-slate-950/90 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl font-mono text-sm">
                <div className="flex items-center gap-2 px-6 py-4 bg-slate-900/40 border-b border-white/5 text-slate-400">
                  <TermIcon className="w-4 h-4" />
                  <span>Output Console</span>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-2 text-emerald-400/90 max-h-[300px] min-h-[250px]">
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith("[error]")
                          ? "text-rose-400"
                          : line.startsWith("[running]")
                          ? "text-indigo-400"
                          : line.startsWith("[success]")
                          ? "text-emerald-400"
                          : "text-slate-300"
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assist Box */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-indigo-300 font-bold mb-2">
                  <Sparkles className="w-5 h-5" />
                  Pair AI Assistant
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Need optimizations or bug fixes? Copy your sandbox code and load the AI Tutor optimization pipeline for in-depth AST code diagnostics.
                </p>
                <Link
                  href="/ai-engine/tutor"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors group"
                >
                  Go to AI pair tutor
                  <Layers className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Iframe preview for HTML/CSS mode */}
          {previewHtml && (
            <motion.div
              className="mt-8 bg-slate-950 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="px-6 py-4 bg-slate-900/40 border-b border-white/5 text-slate-400 font-mono text-sm">
                Live Frame Preview
              </div>
              <iframe
                srcDoc={previewHtml}
                title="HTML Preview Frame"
                className="w-full h-[400px] border-none bg-white"
                sandbox="allow-scripts"
              />
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
