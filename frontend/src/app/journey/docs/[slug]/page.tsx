"use client";

import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronRight, ArrowLeft, Search, ExternalLink, Code,
  FileText, Lightbulb, Star, CheckCircle2, Copy, Check, Info, HelpCircle, ChevronDown,
  Play, RotateCcw, Download, Settings, Terminal, FolderTree, FileCode, X,
  Maximize2, Minimize2, Laptop, RefreshCw
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LANGUAGES_DOCS_DB } from "./db";

// Custom SVG Logos for all 8 Languages
export function LanguageLogo({ slug, className = "w-6 h-6" }: { slug: string; className?: string }) {
  switch (slug) {
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M12 18.5c.3 1.2 1.1 2 2.5 2s2.2-.8 2.2-2.3v-5.7h-1.8v5.6c0 .6-.2.9-.6.9s-.5-.3-.6-.9l-1.7.4zm-4.7-.2c.2.8.8 1.4 1.8 1.4.9 0 1.4-.4 1.4-1.1 0-.7-.4-1-1.3-1.4l-.8-.3c-1.3-.5-1.9-1.2-1.9-2.4 0-1.5 1.2-2.5 2.8-2.5 1.5 0 2.5.8 2.7 2.1l-1.7.3c-.2-.6-.6-1-1-1s-.8.3-.8.7c0 .5.3.7 1 .9l.8.3c1.5.6 2.2 1.2 2.2 2.5 0 1.7-1.3 2.7-3.1 2.7-2 0-3.1-1.1-3.3-2.6l1.8-.3z" fill="#000000" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9 2C6.5 2 6.7 4.3 6.7 4.3l.1 2.3h5.1v.7H6.8S4.3 7 4.3 12.3c0 5.4 2.1 5.2 2.1 5.2l1.2-.1v-1.7c0-.2.2-.4.4-.4h2.9c.2 0 .4-.2.4-.4v-4.1h4.2c.2 0 .4-.2.4-.4V7.9c0-.2-.2-.4-.4-.4h-5.2V5.1c0-.2.2-.4.4-.4h3.1s1.9.1 1.9-2.7c0-2.8-3.7-2-3.7-2zm-2.3 1.1c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6c0-.3.3-.6.6-.6z" fill="#3776AB" />
          <path d="M12.1 22c5.4 0 5.2-2.3 5.2-2.3l-.1-2.3h-5.1v-.7h5.1s2.5.2 2.5-5.1c0-5.4-2.1-5.2-2.1-5.2l-1.2.1v1.7c0 .2-.2.4-.4.4h-2.9c-.2 0-.4.2-.4.4v4.1H9c-.2 0-.4.2-.4.4v2.9c0 .2.2.4.4.4h5.2v2.4c0 .2-.2.4-.4.4H10.7s-1.9-.1-1.9 2.7c0 2.8 3.7 2 3.7 2zm2.3-1.1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6c.3 0 .6.3.6.6s-.3.6-.6.6z" fill="#FFE873" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9 14.8c-.8.1-1.6.2-2.4.2-1.7-.1-3.2-.8-4.5-1.9-1.2-1-2.3-2.1-3.4-3.1C8.2 8.7 6.8 7.6 5 7.1c-1-.3-2.1-.4-3.1-.1C.8 7.4.2 8.1.1 9c-.1.9.4 1.7 1.2 2.1 1 .5 2.1.6 3.1.5 1.7-.1 3.2-.8 4.6-1.8 1.1-.9 2.1-2 3.2-3 1.4-1.2 2.9-2.3 4.8-2.7 1-.2 2.1-.2 3.1.2.9.4 1.4 1.1 1.4 2.1s-.4 1.8-1.2 2.3c-1 .6-2.1.8-3.1.8-1.7 0-3.3-.6-4.6-1.5-1.1-.8-2.1-1.8-3.1-2.7-1.4-1.2-2.9-2.3-4.8-2.8-1-.2-2.1-.2-3.1.2-.9.4-1.4 1.1-1.4 2.1s.4 1.8 1.2 2.3c1 .6 2.1.8 3.1.8 1.7 0 3.3-.6 4.6-1.5 1.1-.8 2.1-1.8 3.1-2.7 1.4-1.2 2.9-2.3 4.8-2.8-1-.2-2.1-.2-3.1.2" fill="#5382A1" />
          <path d="M13.2 12c.5-1.5.8-3 .9-4.5.1-1.5 0-3-.2-4.5-.1 1.5-.1 3 .1 4.5.2 1.5.5 3 1 4.5zm-3 .5c.6-1.4.9-2.8 1.1-4.2.1-1.4 0-2.8-.2-4.2-.1 1.4-.1 2.8.1 4.2.2 1.4.5 2.8 1 4.2" fill="#E76F51" />
        </svg>
      );
    case "cpp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 6.5v11L12 22l10-4.5v-11L12 2z" fill="#00599C" />
          <path d="M12 4.5L4 8v8l8 3.5 8-3.5V8l-8-3.5z" fill="#004482" />
          <path d="M11.5 9h-3v2h3v1.5h-3v2h3V16h-5V8h5v1zm6.5 2.5h-1.5v-1.5H15v1.5h-1.5V13H15v1.5h1.5V13H18v-1.5zM21.5 11.5H20v-1.5h-1.5v1.5H17V13h1.5v1.5H20V13h1.5v-1.5z" fill="#FFFFFF" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M20 18.5h-4.5v-7.5H13V9.5h8.5v1.5H20v7.5zM11.5 14.5c0 1-.5 1.5-1.5 1.5H6.5v-1.5H10c.3 0 .4-.1.4-.4s-.1-.4-.4-.4H8c-1.5 0-2.5-.5-2.5-2v-2c0-1.2 1-2 2.5-2H11v1.5H8c-.3 0-.4.1-.4.4s.1.4.4.4h2c1.5 0 2.5.5 2.5 2v2z" fill="#FFFFFF" />
        </svg>
      );
    case "go":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1 2.2C8.3 2.2 4 6 4 12c0 5.8 4.3 9.8 10.1 9.8 4.6 0 7.8-2.2 9.1-5.8h-4.1c-.9 1.7-2.6 2.8-5 2.8-3.8 0-6.1-2.5-6.1-6.8 0-4.2 2.3-6.8 6.1-6.8 2.4 0 4.1 1.1 5 2.8h4.1C21.9 4.4 18.7 2.2 14.1 2.2zM21.8 10.2H14v3.6h7.8v-3.6z" fill="#00ADD8" />
        </svg>
      );
    case "rust":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm1 14.5h-2v-1.2a4 4 0 01-1.7-.8l-.9.9-1.4-1.4.9-.9a4 4 0 01-.8-1.7H6v-2h1.2a4 4 0 01.8-1.7l-.9-.9 1.4-1.4.9.9a4 4 0 011.7-.8V6h2v1.2a4 4 0 011.7.8l.9-.9 1.4 1.4-.9.9a4 4 0 01.8 1.7H18v2h-1.2a4 4 0 01-.8 1.7l.9.9-1.4 1.4-.9-.9a4 4 0 01-1.7.8v1.2zM12 9a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#DEA584" />
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4zm0 2c4.4 0 8 1.3 8 2.7S16.4 9.3 12 9.3 4 8 4 6.7 7.6 4 12 4zm8 4.7c-.8.5-2 .9-3.4 1.1-1.3.2-2.9.3-4.6.3s-3.3-.1-4.6-.3c-1.4-.2-2.6-.6-3.4-1.1V10c0 1.3 3.6 2.7 8 2.7s8-1.3 8-2.7V8.7zm0 6c-.8.5-2 .9-3.4 1.1-1.3.2-2.9.3-4.6.3s-3.3-.1-4.6-.3c-1.4-.2-2.6-.6-3.4-1.1v1.3c0 1.3 3.6 2.7 8 2.7s8-1.3 8-2.7v-1.3z" fill="#336791" />
        </svg>
      );
    default:
      return null;
  }
}

const LANGUAGES_LIST = [
  { slug: "javascript", name: "JavaScript" },
  { slug: "python", name: "Python" },
  { slug: "java", name: "Java" },
  { slug: "cpp", name: "C++" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "go", name: "Go" },
  { slug: "rust", name: "Rust" },
  { slug: "sql", name: "SQL" }
];

const THEMES: Record<string, { bg: string; text: string; gutter: string; gutterText: string; accent: string; header: string; terminal: string }> = {
  "vs-dark": {
    bg: "bg-[#1E1E1E]",
    text: "text-[#D4D4D4]",
    gutter: "bg-[#1E1E1E] border-r border-[#3C3C3C]",
    gutterText: "text-[#858585]",
    accent: "border-indigo-500 text-indigo-400",
    header: "bg-[#252526] border-b border-[#3C3C3C]",
    terminal: "bg-[#1E1E1E] border-t border-[#3C3C3C] text-[#D4D4D4]"
  },
  "dracula": {
    bg: "bg-[#282a36]",
    text: "text-[#f8f8f2]",
    gutter: "bg-[#282a36] border-r border-[#44475a]",
    gutterText: "text-[#6272a4]",
    accent: "border-[#bd93f9] text-[#bd93f9]",
    header: "bg-[#191a21] border-b border-[#44475a]",
    terminal: "bg-[#282a36] border-t border-[#44475a] text-[#f8f8f2]"
  },
  "cyberpunk": {
    bg: "bg-[#0b0c10]",
    text: "text-[#66fcf1]",
    gutter: "bg-[#0b0c10] border-r border-[#1f2833]",
    gutterText: "text-[#45f3ff]/60",
    accent: "border-[#ff007f] text-[#ff007f]",
    header: "bg-[#1f2833]/80 border-b border-[#1f2833]",
    terminal: "bg-[#0b0c10] border-t border-[#1f2833] text-[#66fcf1]"
  },
  "github-light": {
    bg: "bg-[#ffffff]",
    text: "text-[#24292e]",
    gutter: "bg-[#f6f8fa] border-r border-[#e1e4e6]",
    gutterText: "text-[#959da5]",
    accent: "border-[#0366d6] text-[#0366d6]",
    header: "bg-[#f6f8fa] border-b border-[#e1e4e6]",
    terminal: "bg-[#ffffff] border-t border-[#e1e4e6] text-[#24292e]"
  }
};

function getFileNameForSlug(slug: string): string {
  switch (slug) {
    case "javascript": return "main.js";
    case "python": return "main.py";
    case "java": return "Main.java";
    case "cpp": return "main.cpp";
    case "typescript": return "main.ts";
    case "go": return "main.go";
    case "rust": return "main.rs";
    case "sql": return "query.sql";
    default: return "main.js";
  }
}

function getCompilerNameForSlug(slug: string): string {
  switch (slug) {
    case "javascript": return "node v20.10.0";
    case "python": return "python 3.11.4";
    case "java": return "openjdk 21.0.1";
    case "cpp": return "g++ 13.2.0";
    case "typescript": return "tsc v5.2.2";
    case "go": return "go version go1.21.3";
    case "rust": return "rustc 1.73.0";
    case "sql": return "sqlite3 v3.43.2";
    default: return "node v20.10.0";
  }
}

export default function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const langSlug = resolvedParams.slug;
  const currentLang = LANGUAGES_DOCS_DB[langSlug] || LANGUAGES_DOCS_DB.javascript;

  const [expandedSection, setExpandedSection] = useState<number>(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [activeTopicIdx, setActiveTopicIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Quick Quiz states (mapped by sectionIndex-topicIndex)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuizKeys, setSubmittedQuizKeys] = useState<Set<string>>(new Set());

  // Web IDE states
  const [isIdeActive, setIsIdeActive] = useState(false);
  const [isIdeMaximized, setIsIdeMaximized] = useState(false);
  const [editorCode, setEditorCode] = useState("");
  const [editorFileName, setEditorFileName] = useState("main.cpp");
  const [ideTheme, setIdeTheme] = useState("vs-dark");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeIdeTab, setActiveIdeTab] = useState<"file" | "readme">("file");

  const [workspaceFiles, setWorkspaceFiles] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState("main.cpp");
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileNameInput, setNewFileNameInput] = useState("");
  const [bottomPanelTab, setBottomPanelTab] = useState<"terminal" | "problems" | "output" | "debug">("terminal");
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [editorWordWrap, setEditorWordWrap] = useState(true);
  const [showMinimap, setShowMinimap] = useState(true);
  const [activeActivityTab, setActiveActivityTab] = useState<"explorer" | "search" | "git" | "debug" | "extensions">("explorer");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const ideContainerRef = useRef<HTMLDivElement>(null);

  const handleTextareaScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, isRunning]);

  // Reset indices on language slug change to prevent out of bounds errors
  useEffect(() => {
    setActiveSectionIdx(0);
    setActiveTopicIdx(0);
    setExpandedSection(0);
    setIsIdeActive(false);
    setIsIdeMaximized(false);
  }, [langSlug]);
  const [showF11Hint, setShowF11Hint] = useState(false);

  // Detect native fullscreen changes (F11 key or Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsIdeMaximized(false);
        setShowF11Hint(false);
      }
    };
    // Detect F11 via window resize — F11 makes window.innerHeight === screen.height
    const handleResize = () => {
      const isNativeFullscreen = window.innerHeight === screen.height && window.innerWidth === screen.width;
      if (isNativeFullscreen && isIdeActive) {
        setIsIdeMaximized(true);
        setShowF11Hint(false);
      }
      if (!isNativeFullscreen && !document.fullscreenElement) {
        // User pressed F11/Esc to exit
        if (isIdeMaximized) {
          setIsIdeMaximized(false);
          setShowF11Hint(false);
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isIdeActive, isIdeMaximized]);

  const toggleFullscreen = () => {
    if (!isIdeMaximized) {
      // Enter CSS fullscreen + try native API
      setIsIdeMaximized(true);
      const el = ideContainerRef.current;
      if (el && el.requestFullscreen) {
        el.requestFullscreen().then(() => {
          // Native fullscreen worked! Hide hint
          setShowF11Hint(false);
        }).catch(() => {
          // Native fullscreen blocked — show F11 hint
          setShowF11Hint(true);
          // Auto-hide hint after 5 seconds
          setTimeout(() => setShowF11Hint(false), 5000);
        });
      } else {
        setShowF11Hint(true);
        setTimeout(() => setShowF11Hint(false), 5000);
      }
    } else {
      // Exit
      setIsIdeMaximized(false);
      setShowF11Hint(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (isIdeMaximized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isIdeMaximized]);
  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([editorCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = editorFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    const compiler = getCompilerNameForSlug(langSlug);
    setTerminalLogs(prev => [
      ...prev,
      `[info] ${compiler}: Compiling ${editorFileName}...`,
      `[info] linking object files...`
    ]);

    setTimeout(() => {
      let results: string[] = [];
      try {
        if (langSlug === "javascript" || langSlug === "typescript") {
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
          };
          new Function(editorCode)();
          console.log = originalLog;
          results = logs.length > 0 ? logs : ["Process finished with exit code 0"];
        } else if (langSlug === "python") {
          const lines = editorCode.split('\n');
          const vars: Record<string, any> = {};
          for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            const varMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (varMatch) {
              const name = varMatch[1];
              const valExpr = varMatch[2];
              try {
                let evalExpr = valExpr;
                for (const [vName, vVal] of Object.entries(vars)) {
                  evalExpr = evalExpr.replace(new RegExp(`\\b${vName}\\b`, 'g'), JSON.stringify(vVal));
                }
                vars[name] = new Function(`return (${evalExpr})`)();
              } catch {}
            }
            const printMatch = line.match(/^print\((.*)\)$/);
            if (printMatch) {
              const expr = printMatch[1];
              try {
                let evalExpr = expr;
                for (const [vName, vVal] of Object.entries(vars)) {
                  evalExpr = evalExpr.replace(new RegExp(`\\b${vName}\\b`, 'g'), JSON.stringify(vVal));
                }
                const out = new Function(`return (${evalExpr})`)();
                results.push(String(out));
              } catch {
                results.push(expr.replace(/^['"]|['"]$/g, ''));
              }
            }
          }
          if (results.length === 0) results = ["Process finished with exit code 0"];
        } else if (langSlug === "cpp") {
          const lines = editorCode.split('\n');
          const vars: Record<string, any> = {};
          for (let line of lines) {
            line = line.trim();
            if (line.startsWith('//') || line.startsWith('#')) continue;
            const varMatch = line.match(/^(int|double|float|char|bool|string)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/);
            if (varMatch) {
              const name = varMatch[2];
              const valExpr = varMatch[3];
              try {
                let evalExpr = valExpr;
                for (const [vName, vVal] of Object.entries(vars)) {
                  evalExpr = evalExpr.replace(new RegExp(`\\b${vName}\\b`, 'g'), JSON.stringify(vVal));
                }
                vars[name] = new Function(`return (${evalExpr})`)();
              } catch {}
            }
            if (line.includes('cout')) {
              const coutParts = line.split('<<').slice(1);
              let lineOut = '';
              for (let part of coutParts) {
                part = part.replace(/;/g, '').trim();
                if (part === 'endl' || part === '"\\n"' || part === "'\\n'") {
                  results.push(lineOut);
                  lineOut = '';
                } else {
                  try {
                    let evalExpr = part;
                    for (const [vName, vVal] of Object.entries(vars)) {
                      evalExpr = evalExpr.replace(new RegExp(`\\b${vName}\\b`, 'g'), JSON.stringify(vVal));
                    }
                    const out = new Function(`return (${evalExpr})`)();
                    lineOut += String(out);
                  } catch {
                    if (part.startsWith('"') && part.endsWith('"')) {
                      lineOut += part.slice(1, -1);
                    } else {
                      lineOut += part;
                    }
                  }
                }
              }
              if (lineOut) results.push(lineOut);
            }
          }
          if (results.length === 0) results = ["Process finished with exit code 0"];
        } else {
          results = [
            `Running simulated interpreter for ${currentLang.name}...`,
            `Successfully parsed code tokens.`,
            `Output:`,
            `------------------------`,
            `Program started...`,
            `Execution successful!`,
            `Process terminated with exit status 0.`
          ];
        }
      } catch (err: any) {
        results = [`[compiler error] ${err.message}`];
      }

      setTerminalLogs(prev => [
        ...prev,
        `[success] Build done. Executing binary...`,
        ...results.map(line => `  ${line}`)
      ]);
      setIsRunning(false);
    }, 1200);
  };

  // Filter topics based on search query, storing original indices
  const filteredSections = currentLang.sections.map((section: any, sIdx: number) => ({
    ...section,
    originalIdx: sIdx,
    topics: section.topics.map((t: any, tIdx: number) => ({ ...t, originalIdx: tIdx })).filter((t: any) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ),
  })).filter((s: any) => s.topics.length > 0);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleQuizSubmit = (quizKey: string, correctAnswer: number) => {
    if (selectedAnswers[quizKey] === undefined) return;
    setSubmittedQuizKeys(prev => {
      const next = new Set(prev);
      next.add(quizKey);
      return next;
    });
  };

  // Selected topic resolution
  const activeSection = currentLang.sections[activeSectionIdx] || currentLang.sections[0];
  const activeTopic = activeSection?.topics[activeTopicIdx] || activeSection?.topics[0];

  useEffect(() => {
    if (activeTopic) {
      const mainFile = getFileNameForSlug(langSlug);
      setWorkspaceFiles({
        [mainFile]: activeTopic.code || "",
        "README.md": `# Workspace Instructions\n\n${activeTopic.content || ""}\n\n### Tasks:\n1. Compile and execute the template.\n2. Add custom logic and verify correctness.\n`
      });
      setActiveFile(mainFile);
      setEditorCode(activeTopic.code || "");
    }
  }, [langSlug, activeTopic]);

  const selectFile = (fileName: string) => {
    setWorkspaceFiles(prev => ({
      ...prev,
      [activeFile]: editorCode
    }));
    setActiveFile(fileName);
    setEditorCode(workspaceFiles[fileName] || "");
  };

  const getProblems = () => {
    const problemsList: Array<{ line: number; message: string; severity: "error" | "warning" }> = [];
    if (!editorCode) return problemsList;
    const lines = editorCode.split('\n');
    if (activeFile.endsWith('.cpp') || activeFile.endsWith('.java') || activeFile.endsWith('.js') || activeFile.endsWith('.ts')) {
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (
          trimmed && 
          !trimmed.startsWith('//') && 
          !trimmed.startsWith('#') && 
          !trimmed.endsWith('{') && 
          !trimmed.endsWith('}') && 
          !trimmed.endsWith(')') &&
          !trimmed.startsWith('for') &&
          !trimmed.startsWith('if') &&
          !trimmed.startsWith('while') &&
          !trimmed.startsWith('int main')
        ) {
          if (!trimmed.endsWith(';')) {
            problemsList.push({
              line: index + 1,
              message: "Expected ';'",
              severity: "error"
            });
          }
        }
      });
    }
    return problemsList;
  };

  // Navigation handlers
  const handlePrevChapter = () => {
    if (activeTopicIdx > 0) {
      setActiveTopicIdx(activeTopicIdx - 1);
    } else if (activeSectionIdx > 0) {
      const prevSecIdx = activeSectionIdx - 1;
      const prevSec = currentLang.sections[prevSecIdx];
      setActiveSectionIdx(prevSecIdx);
      setActiveTopicIdx(prevSec.topics.length - 1);
      setExpandedSection(prevSecIdx);
    }
  };

  const handleNextChapter = () => {
    const currentSection = currentLang.sections[activeSectionIdx];
    if (activeTopicIdx < currentSection.topics.length - 1) {
      setActiveTopicIdx(activeTopicIdx + 1);
    } else if (activeSectionIdx < currentLang.sections.length - 1) {
      const nextSecIdx = activeSectionIdx + 1;
      setActiveSectionIdx(nextSecIdx);
      setActiveTopicIdx(0);
      setExpandedSection(nextSecIdx);
    }
  };

  const hasPrev = activeSectionIdx > 0 || activeTopicIdx > 0;
  const hasNext = activeSectionIdx < currentLang.sections.length - 1 || 
                  activeTopicIdx < (currentLang.sections[activeSectionIdx]?.topics.length - 1);

  const prevTopic = hasPrev ? (
    activeTopicIdx > 0 
      ? activeSection.topics[activeTopicIdx - 1] 
      : currentLang.sections[activeSectionIdx - 1].topics[currentLang.sections[activeSectionIdx - 1].topics.length - 1]
  ) : null;

  const nextTopic = hasNext ? (
    activeTopicIdx < activeSection.topics.length - 1
      ? activeSection.topics[activeTopicIdx + 1]
      : currentLang.sections[activeSectionIdx + 1].topics[0]
  ) : null;

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      {!isIdeMaximized && <Navbar />}

      <main className="min-h-screen pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <Link href="/journey" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journey Hub
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Language Dropdown and Topics */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-6">
                {/* Language Select Dropdown */}
                <div className="relative">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-3">Active Language</p>
                  
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-left text-sm font-semibold text-white hover:bg-slate-900 transition-all backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2.5">
                      <LanguageLogo slug={langSlug} className="w-5 h-5 shrink-0" />
                      <span>{currentLang.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isLangDropdownOpen && (
                      <>
                        {/* Overlay to close on outside click */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 z-50 bg-slate-950/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl max-h-64 overflow-y-auto"
                        >
                          <div className="py-1">
                            {LANGUAGES_LIST.map((lang) => (
                              <Link key={lang.slug} href={`/journey/docs/${lang.slug}`} onClick={() => setIsLangDropdownOpen(false)}>
                                <span className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:bg-white/[0.04] cursor-pointer ${
                                  langSlug === lang.slug ? "text-indigo-400 bg-white/[0.02]" : "text-slate-300"
                                }`}>
                                  <LanguageLogo slug={lang.slug} className="w-4 h-4 shrink-0" />
                                  <span>{lang.name}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Topics / Sections List */}
                <div className="space-y-1 bg-slate-900/10 border border-white/5 rounded-2xl p-3 backdrop-blur-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-3">Documentation Sections</p>
                  <div className="space-y-1.5">
                    {filteredSections.map((section: any, idx: number) => {
                      const origIdx = section.originalIdx;
                      const isActive = expandedSection === origIdx;
                      return (
                        <div key={origIdx} className="space-y-1">
                          <button
                            onClick={() => {
                              setExpandedSection(isActive ? -1 : origIdx);
                            }}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                              isActive
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                : "text-slate-400 hover:text-white hover:bg-white/[0.02] border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <BookOpen className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                              <span className="truncate">{section.title.replace(/^\d+\.\s+/, "")}</span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-slate-500 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden pl-4 border-l border-white/10 ml-4 space-y-1.5 py-1"
                              >
                                {section.topics.map((topic: any, tIdx: number) => {
                                  const origTopicIdx = topic.originalIdx;
                                  const isSelected = activeSectionIdx === origIdx && activeTopicIdx === origTopicIdx;
                                  const cleanedTopicTitle = topic.title.replace(/^\d+\.\d+\s+/, "");
                                  return (
                                    <button
                                      key={origTopicIdx}
                                      onClick={() => {
                                        setActiveSectionIdx(origIdx);
                                        setActiveTopicIdx(origTopicIdx);
                                        if (topic.code) {
                                          setEditorCode(topic.code);
                                          setEditorFileName(getFileNameForSlug(langSlug));
                                        }
                                      }}
                                      className={`w-full text-left py-1 text-[11px] font-medium transition-all block truncate pl-1.5 border-l-2 hover:translate-x-0.5 transform duration-150 ${
                                        isSelected
                                          ? "text-indigo-400 border-indigo-500 font-bold bg-indigo-500/[0.02]"
                                          : "text-slate-400 border-transparent hover:text-white hover:border-slate-700"
                                      }`}
                                    >
                                      {cleanedTopicTitle}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-xl">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-400" /> Resources
                  </p>
                  <a
                    href={currentLang.officialDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Official Reference
                  </a>
                </div>
              </div>
            </div>

            {/* Document details container */}
            <div className="flex-1 min-w-0">
              {isIdeActive ? (
                /* WEB IDE WORKSPACE */
                <div
                  ref={ideContainerRef}
                  style={isIdeMaximized ? { position: 'fixed', inset: 0, zIndex: 9999, width: '100vw', height: '100vh', background: '#020617', display: 'flex', flexDirection: 'column' as const } : {}}
                  className={isIdeMaximized ? '' : 'space-y-6'}
                >
                  {/* F11 Hint Toast */}
                  {showF11Hint && (
                    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] animate-bounce">
                      <div className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-indigo-400/30">
                        <Maximize2 className="w-5 h-5" />
                        <span>Press <kbd className="px-2 py-0.5 bg-white/20 rounded text-xs mx-1">F11</kbd> for true fullscreen</span>
                        <button onClick={() => setShowF11Hint(false)} className="ml-2 text-white/60 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={`overflow-hidden ${isIdeMaximized ? '' : 'border border-white/10 rounded-2xl'} ${THEMES[ideTheme].bg} shadow-2xl transition-all duration-300 flex flex-col ${isIdeMaximized ? 'flex-1 h-full' : ''}`}>
                    {/* IDE Header */}
                    <div className={`flex items-center justify-between px-4 py-3 ${THEMES[ideTheme].header}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-4">
                          <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                          <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                        </div>
                        
                        {/* File Tabs */}
                        <div className="flex items-center gap-1 text-xs">
                          {Object.keys(workspaceFiles).map((fileName) => {
                            const isMd = fileName.endsWith('.md');
                            const isActive = activeFile === fileName;
                            return (
                              <button
                                key={fileName}
                                onClick={() => selectFile(fileName)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-mono border-t-2 transition-all ${
                                  isActive
                                    ? `bg-slate-900 ${THEMES[ideTheme].accent} font-bold text-white`
                                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                                }`}
                              >
                                {isMd ? <FileText className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                                {fileName}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Theme Selector, Actions and Close */}
                      <div className="flex items-center gap-3">
                        {/* Theme */}
                        <div className="hidden md:flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-slate-500" />
                          <select
                            value={ideTheme}
                            onChange={(e) => setIdeTheme(e.target.value)}
                            className="bg-slate-950/60 text-[11px] text-slate-300 px-2 py-1 rounded border border-white/10 outline-none cursor-pointer focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="vs-dark">VS Code Dark</option>
                            <option value="dracula">Dracula</option>
                            <option value="cyberpunk">Cyberpunk</option>
                            <option value="github-light">GitHub Light</option>
                          </select>
                        </div>

                        {/* Run Button */}
                        <button
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded text-[11px] font-bold shadow-lg transition-all"
                        >
                          {isRunning ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          )}
                          Run
                        </button>

                        {/* Reset */}
                        <button
                          onClick={() => setEditorCode(activeTopic.code || "")}
                          title="Reset code template"
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        {/* Download */}
                        <button
                          onClick={handleDownloadCode}
                          title="Download file"
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {/* Maximize / Minimize */}
                        <button
                          onClick={toggleFullscreen}
                          title={isIdeMaximized ? "Exit Fullscreen" : "Fullscreen"}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
                        >
                          {isIdeMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                        <span className="text-slate-700">|</span>

                        {/* Close Editor */}
                        <button
                          onClick={() => setIsIdeActive(false)}
                          className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 rounded text-[11px] font-bold transition-all border border-transparent hover:border-rose-500/20"
                        >
                          <X className="w-3.5 h-3.5" /> Close Editor
                        </button>
                      </div>
                    </div>

                    {/* Workspace body */}
                    <div className={`flex overflow-hidden relative ${isIdeMaximized ? 'flex-1 min-h-0' : 'h-[420px]'}`}>
                      
                      {/* Activity Bar (Far Left) */}
                      <div className="w-12 bg-slate-950/80 border-r border-white/5 flex flex-col items-center py-4 justify-between select-none shrink-0">
                        <div className="flex flex-col gap-5 items-center w-full">
                          {[
                            { id: "explorer", icon: FolderTree, title: "Explorer" },
                            { id: "search", icon: Search, title: "Search" },
                            { id: "git", icon: Star, title: "Source Control" },
                            { id: "debug", icon: Play, title: "Run and Debug" },
                            { id: "extensions", icon: Laptop, title: "Extensions" },
                          ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeActivityTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveActivityTab(tab.id as any)}
                                title={tab.title}
                                className={`p-2 rounded-lg transition-all relative group ${
                                  isActive ? "text-indigo-400 bg-white/[0.04]" : "text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                                {isActive && (
                                  <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-indigo-500 rounded-r" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        
                        <button
                          onClick={() => setIsSettingsOpen(true)}
                          title="Settings"
                          className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Explorer / Sidebar Panel Column */}
                      <div className="w-52 bg-slate-950/40 border-r border-white/5 font-mono text-[10px] text-slate-500 p-3 hidden sm:flex flex-col select-none overflow-y-auto min-h-0 shrink-0">
                        {activeActivityTab === "explorer" && (
                          <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between font-bold uppercase tracking-wider text-slate-400 mb-4">
                              <span className="flex items-center gap-1.5">
                                <FolderTree className="w-3.5 h-3.5 text-indigo-400" />
                                Explorer
                              </span>
                              <button
                                onClick={() => setIsCreatingFile(true)}
                                title="New File"
                                className="p-0.5 hover:text-white rounded hover:bg-slate-800 transition-colors text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                            
                            {isCreatingFile && (
                              <div className="mb-3 px-1">
                                <input
                                  type="text"
                                  autoFocus
                                  placeholder="file.cpp..."
                                  value={newFileNameInput}
                                  onChange={(e) => setNewFileNameInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const name = newFileNameInput.trim();
                                      if (name) {
                                        setWorkspaceFiles(prev => ({ ...prev, [name]: "" }));
                                        setActiveFile(name);
                                        setEditorCode("");
                                        setIsCreatingFile(false);
                                        setNewFileNameInput("");
                                      }
                                    } else if (e.key === "Escape") {
                                      setIsCreatingFile(false);
                                      setNewFileNameInput("");
                                    }
                                  }}
                                  className="w-full bg-slate-900 border border-indigo-500 rounded px-1.5 py-0.5 text-[10px] text-white focus:outline-none focus:ring-0"
                                />
                                <span className="text-[8px] text-slate-600 block mt-0.5">Press Enter to save</span>
                              </div>
                            )}

                            <div className="space-y-1 overflow-y-auto flex-1 scrollbar-thin">
                              <div className="font-bold text-slate-400 mb-1">
                                📂 WORKSPACE [{langSlug.toUpperCase()}]
                              </div>
                              <div className="pl-3.5 space-y-1 mt-1">
                                {Object.keys(workspaceFiles).map((fileName) => {
                                  const isMd = fileName.endsWith('.md');
                                  return (
                                    <button
                                      key={fileName}
                                      onClick={() => selectFile(fileName)}
                                      className={`flex items-center gap-1.5 w-full text-left py-1 truncate hover:text-white transition-colors ${
                                        activeFile === fileName ? "text-indigo-400 font-bold" : ""
                                      }`}
                                    >
                                      {isMd ? <FileText className="w-3.5 h-3.5 shrink-0" /> : <FileCode className="w-3.5 h-3.5 shrink-0" />}
                                      {fileName}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {activeActivityTab === "search" && (
                          <div className="space-y-3">
                            <div className="font-bold uppercase tracking-wider text-slate-400 mb-4">Search</div>
                            <input
                              type="text"
                              placeholder="Search in files..."
                              className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-indigo-500"
                            />
                            <div className="text-[9px] text-slate-600">0 results in workspace</div>
                          </div>
                        )}

                        {activeActivityTab === "git" && (
                          <div className="space-y-3 flex-1 flex flex-col">
                            <div className="font-bold uppercase tracking-wider text-slate-400 mb-4">Source Control</div>
                            <div className="flex-1 space-y-2">
                              <div className="font-bold text-slate-400">CHANGES</div>
                              <div className="pl-2 flex items-center justify-between text-slate-400">
                                <span className="truncate">{activeFile}</span>
                                <span className="text-amber-500 font-bold">M</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                alert("Committed successfully to branch 'main'!");
                              }}
                              className="w-full py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition-all text-center"
                            >
                              Commit to main
                            </button>
                          </div>
                        )}

                        {activeActivityTab === "debug" && (
                          <div className="space-y-4">
                            <div className="font-bold uppercase tracking-wider text-slate-400 mb-4">Run and Debug</div>
                            <div className="space-y-2">
                              <div className="font-bold text-slate-400">VARIABLES</div>
                              <div className="pl-2 space-y-1">
                                <div className="text-[9px] text-slate-500">Local Scope:</div>
                                <div className="pl-1.5 text-slate-400 font-mono">No active variables</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeActivityTab === "extensions" && (
                          <div className="space-y-3">
                            <div className="font-bold uppercase tracking-wider text-slate-400 mb-4">Extensions</div>
                            <div className="space-y-2.5">
                              {[
                                { name: "C/C++ Intel", desc: "Microsoft debugger support" },
                                { name: "Prettier", desc: "Opinionated code formatter" },
                                { name: "Python Lint", desc: "Error checking and debugging" }
                              ].map((ext, idx) => (
                                <div key={idx} className="border-b border-white/5 pb-2">
                                  <div className="font-bold text-white">{ext.name}</div>
                                  <div className="text-[9px] text-slate-600 line-clamp-1">{ext.desc}</div>
                                  <button
                                    onClick={(e) => {
                                      e.currentTarget.textContent = "Installed";
                                      e.currentTarget.disabled = true;
                                    }}
                                    className="mt-1 px-1.5 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3px] text-[8px] transition-colors"
                                  >
                                    Install
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Code Editor Area */}
                      <div className="flex-1 flex overflow-hidden relative">
                        {!activeFile.endsWith('.md') ? (
                          <div className="flex-1 flex font-mono text-sm leading-6 relative select-text overflow-hidden">
                            {/* Gutter Line Numbers */}
                            <div
                              ref={gutterRef}
                              className={`select-none text-right pr-3 border-r text-[11px] font-mono w-10 pt-4 overflow-hidden leading-6 ${THEMES[ideTheme].gutter} ${THEMES[ideTheme].gutterText}`}
                            >
                              {Array.from({ length: Math.max(editorCode.split('\n').length, 1) }, (_, i) => i + 1).map(n => (
                                <div key={n} className="pr-1">{n}</div>
                              ))}
                            </div>

                            {/* Text Area Input */}
                            <textarea
                              ref={textareaRef}
                              value={editorCode}
                              style={{ fontSize: `${editorFontSize}px` }}
                              onScroll={handleTextareaScroll}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditorCode(val);
                                setWorkspaceFiles(prev => ({ ...prev, [activeFile]: val }));
                              }}
                              className={`flex-1 bg-transparent p-4 pt-4 border-none outline-none resize-none font-mono leading-6 focus:ring-0 focus:outline-none whitespace-pre overflow-auto scrollbar-thin select-text ${
                                editorWordWrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                              } ${THEMES[ideTheme].text}`}
                              spellCheck={false}
                            />

                            {/* Editor Minimap */}
                            {showMinimap && (
                              <div className="w-16 bg-slate-950/20 border-l border-white/5 opacity-40 hover:opacity-80 transition-opacity p-1 overflow-hidden select-none text-[4px] font-mono leading-[5px] whitespace-pre-wrap truncate hidden md:block select-none">
                                {editorCode}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* README / INSTRUCTIONS VIEW */
                          <div className="flex-1 p-6 overflow-y-auto text-slate-300 font-normal leading-relaxed text-sm bg-slate-900/40 scrollbar-thin">
                            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-indigo-400" />
                              Workspace Instructions
                            </h4>
                            <div className="space-y-4">
                              <p>
                                Welcome to the <strong>CodeVerse Web IDE</strong> workspace for {currentLang.name}!
                              </p>
                              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2">
                                <h5 className="font-bold text-white text-xs">Current Chapter:</h5>
                                <p className="text-xs text-indigo-400 font-semibold">{activeTopic.title}</p>
                                <p className="text-xs text-slate-400 mt-1">{activeTopic.content}</p>
                              </div>
                              <div className="space-y-2">
                                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">Tips:</h5>
                                <ul className="list-disc pl-4 text-xs space-y-1 text-slate-400">
                                  <li>You can customize the code directly inside the editor and run it!</li>
                                  <li>For C++ or Python, write standard output statements like <code>cout &lt;&lt; &quot;Value&quot;;</code> or <code>print(&quot;Value&quot;)</code> to see custom runs.</li>
                                  <li>Click the theme drop-down to change aesthetics.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Settings Popup Overlay */}
                      {isSettingsOpen && (
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-[150] p-6">
                          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                <Settings className="w-4 h-4 text-indigo-400" />
                                Editor Settings
                              </h4>
                              <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="text-slate-500 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-3 text-xs text-slate-300">
                              <div className="flex items-center justify-between">
                                <span>Font Size</span>
                                <select
                                  value={editorFontSize}
                                  onChange={(e) => setEditorFontSize(Number(e.target.value))}
                                  className="bg-slate-950 border border-white/10 rounded px-2 py-1 focus:outline-none"
                                >
                                  <option value="12">12px</option>
                                  <option value="14">14px</option>
                                  <option value="16">16px</option>
                                  <option value="18">18px</option>
                                </select>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span>Word Wrap</span>
                                <button
                                  onClick={() => setEditorWordWrap(!editorWordWrap)}
                                  className={`px-2 py-1 rounded border transition-colors ${
                                    editorWordWrap ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "border-white/10 text-slate-400"
                                  }`}
                                >
                                  {editorWordWrap ? "Enabled" : "Disabled"}
                                </button>
                              </div>

                              <div className="flex items-center justify-between">
                                <span>Show Minimap</span>
                                <button
                                  onClick={() => setShowMinimap(!showMinimap)}
                                  className={`px-2 py-1 rounded border transition-colors ${
                                    showMinimap ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "border-white/10 text-slate-400"
                                  }`}
                                >
                                  {showMinimap ? "Visible" : "Hidden"}
                                </button>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setIsSettingsOpen(false)}
                              className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all text-center"
                            >
                              Save Settings
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Panel (VS Code Tabs Style) */}
                    <div className={`font-mono text-xs h-[180px] flex flex-col ${THEMES[ideTheme].terminal} bg-slate-950/90 border-t border-white/5 shrink-0`}>
                      {/* Bottom Panel Tabs */}
                      <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/40 px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 select-none">
                        <div className="flex items-center gap-4">
                          {[
                            { id: "problems", label: `Problems (${getProblems().length})` },
                            { id: "output", label: "Output" },
                            { id: "debug", label: "Debug Console" },
                            { id: "terminal", label: "Terminal" }
                          ].map((tab) => {
                            const isActive = bottomPanelTab === tab.id;
                            const isErrorTab = tab.id === "problems" && getProblems().length > 0;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setBottomPanelTab(tab.id as any)}
                                className={`transition-colors py-0.5 ${
                                  isActive
                                    ? "text-indigo-400 border-b-2 border-indigo-500 font-bold"
                                    : isErrorTab
                                      ? "text-rose-400 hover:text-rose-300"
                                      : "hover:text-slate-300"
                                }`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => {
                            if (bottomPanelTab === "terminal") setTerminalLogs([]);
                          }}
                          className="hover:text-white transition-colors text-[9px] lowercase font-normal"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Tab Content Panel */}
                      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin select-text">
                        {bottomPanelTab === "terminal" && (
                          <div className="space-y-1">
                            {terminalLogs.map((log, index) => {
                              let style = "text-slate-300";
                              if (log.startsWith("[info]")) style = "text-indigo-400";
                              if (log.startsWith("[success]")) style = "text-emerald-400";
                              if (log.startsWith("[compiler error]")) style = "text-rose-400";
                              if (log.startsWith("[system]")) style = "text-slate-500";
                              return (
                                <div key={index} className={`whitespace-pre-wrap leading-relaxed ${style}`}>
                                  {log}
                                </div>
                              );
                            })}
                            {isRunning && (
                              <div className="text-slate-500 animate-pulse flex items-center gap-1.5">
                                <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
                                Running compiler, please wait...
                              </div>
                            )}
                            <div ref={terminalEndRef} />
                          </div>
                        )}

                        {bottomPanelTab === "problems" && (
                          <div className="space-y-1 text-slate-400">
                            {getProblems().length === 0 ? (
                              <div className="text-slate-500 text-[10px] italic">No problems have been detected in the workspace.</div>
                            ) : (
                              getProblems().map((prob, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-rose-400">
                                  <span className="font-bold">[Error]</span>
                                  <span>{activeFile}:{prob.line} - {prob.message}</span>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {bottomPanelTab === "output" && (
                          <div className="text-slate-400 text-[10px] leading-relaxed">
                            [system] Initializing compiler sandbox...
                            <br />
                            [system] Target environment: {getCompilerNameForSlug(langSlug)}
                            <br />
                            [system] Directory resolved: /workspace/{langSlug}/
                            <br />
                            [system] Active file: {activeFile}
                          </div>
                        )}

                        {bottomPanelTab === "debug" && (
                          <div className="space-y-1.5 flex flex-col h-full justify-between">
                            <div className="text-slate-500 text-[10px]">
                              CodeVerse Debug REPL. Type variable queries or expressions.
                            </div>
                            <input
                              type="text"
                              placeholder="> Type expression to evaluate..."
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const val = e.currentTarget.value.trim();
                                  if (val) {
                                    alert(`Evaluated output: ${val} => OK`);
                                    e.currentTarget.value = "";
                                  }
                                }
                              }}
                              className="w-full bg-slate-900 border border-white/5 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* IDE Status Bar */}
                    <div className="bg-indigo-600/80 backdrop-blur text-[10px] text-white/90 font-mono px-4 py-1.5 flex items-center justify-between select-none shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">STATUS: READY</span>
                        <span className="opacity-60">|</span>
                        <span>Ln {editorCode.split('\n').length}, Col {editorCode.length}</span>
                        <span className="opacity-60">|</span>
                        <span className="text-rose-300 font-semibold">{getProblems().length > 0 ? `✗ ${getProblems().length} errors` : `✓ No errors`}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="uppercase">{langSlug} Workspace</span>
                        <span className="opacity-60">|</span>
                        <span>UTF-8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : searchQuery ? (
                <div className="space-y-4">
                  <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl mb-8">
                    <div className="flex items-center gap-5 mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLang.color} flex items-center justify-center shadow-lg p-3.5 bg-slate-950/40 border border-white/5`}>
                        <LanguageLogo slug={langSlug} className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          Search Results
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">Showing matches for &ldquo;{searchQuery}&rdquo;</p>
                      </div>
                    </div>

                    {/* Local search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${currentLang.name} curriculum topics...`}
                        className="w-full bg-slate-800/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredSections.flatMap((section: any) =>
                      section.topics.map((topic: any) => (
                        <div
                          key={`${section.originalIdx}-${topic.originalIdx}`}
                          onClick={() => {
                            setActiveSectionIdx(section.originalIdx);
                            setActiveTopicIdx(topic.originalIdx);
                            setExpandedSection(section.originalIdx);
                            setSearchQuery("");
                          }}
                          className="bg-slate-900/30 hover:bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 duration-200"
                        >
                          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                            {section.title.replace(/^\d+\.\s+/, "")}
                          </span>
                          <h4 className="text-base font-bold text-white mb-2">{topic.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{topic.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header card */}
                  <motion.div
                    key={currentLang.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-5 mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLang.color} flex items-center justify-center shadow-lg p-3.5 bg-slate-950/40 border border-white/5`}>
                        <LanguageLogo slug={langSlug} className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          {currentLang.name} Reference
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">{currentLang.desc}</p>
                      </div>
                    </div>

                    {/* Local search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${currentLang.name} curriculum topics...`}
                        className="w-full bg-slate-800/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                      />
                    </div>
                  </motion.div>

                  {/* Active Topic Card */}
                  {activeTopic && (
                    <motion.div
                      key={`${activeSectionIdx}-${activeTopicIdx}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-xl"
                    >
                      {/* Breadcrumbs */}
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <span>{currentLang.name} Reference</span>
                        <ChevronRight className="w-3 h-3 text-slate-600" />
                        <span className="truncate">{activeSection.title.replace(/^\d+\.\s+/, "")}</span>
                        <ChevronRight className="w-3 h-3 text-slate-600" />
                        <span className="text-indigo-400 truncate">{activeTopic.title.replace(/^\d+\.\d+\s+/, "")}</span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5 tracking-tight border-b border-white/5 pb-4">
                          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
                          {activeTopic.title}
                        </h3>
                        
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                          {activeTopic.content}
                        </p>
                      </div>

                      {/* Code Editor Sandbox Block */}
                      {activeTopic.code && (
                        <div className="relative border border-white/5 rounded-xl overflow-hidden bg-[#0a0c10]">
                          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/50 border-b border-white/5 text-[11px] text-slate-500 font-mono">
                            <span>Interactive Example Code</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  setEditorCode(activeTopic.code || "");
                                  setEditorFileName(getFileNameForSlug(langSlug));
                                  setTerminalLogs([
                                    `[system] Initialized CodeVerse Web IDE workspace.`,
                                    `[system] Ready to run ${currentLang.name} program.`
                                  ]);
                                  setIsIdeActive(true);
                                }}
                                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                              >
                                <Code className="w-3.5 h-3.5" /> Practice in Web IDE
                              </button>
                              <span className="text-slate-700">|</span>
                              <button
                                onClick={() => handleCopyCode(activeTopic.code!, `${activeSectionIdx}-${activeTopicIdx}`)}
                                className="hover:text-white transition-colors flex items-center gap-1"
                              >
                                {copiedCodeIndex === `${activeSectionIdx}-${activeTopicIdx}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" /> Copy Code
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-emerald-400">
                            <code>{activeTopic.code}</code>
                          </pre>
                        </div>
                      )}

                      {/* Knowledge validation quiz block */}
                      {activeTopic.quiz && (
                        <div className="border-t border-white/5 pt-6 mt-6 space-y-4">
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-indigo-400" /> Test Your Knowledge
                          </h5>
                          
                          <p className="text-sm text-slate-300 font-semibold">
                            {activeTopic.quiz.question}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {activeTopic.quiz.options.map((option: string, oi: number) => {
                              const quizKey = `${activeSectionIdx}-${activeTopicIdx}`;
                              const isQuizSubmitted = submittedQuizKeys.has(quizKey);
                              const selectedAnswer = selectedAnswers[quizKey];
                              const isSelected = selectedAnswer === oi;
                              let btnStyle = "border-white/5 hover:border-white/10 hover:bg-white/[0.01]";
                              
                              if (isSelected) {
                                btnStyle = "border-indigo-500/40 bg-indigo-500/5 text-white";
                              }
                              if (isQuizSubmitted) {
                                if (oi === activeTopic.quiz!.answer) {
                                  btnStyle = "border-emerald-500/40 bg-emerald-500/5 text-emerald-400";
                                } else if (isSelected) {
                                  btnStyle = "border-rose-500/40 bg-rose-500/5 text-rose-400";
                                }
                              }

                              return (
                                <button
                                  key={oi}
                                  disabled={isQuizSubmitted}
                                  onClick={() => setSelectedAnswers(prev => ({ ...prev, [quizKey]: oi }))}
                                  className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{option}</span>
                                  {isQuizSubmitted && oi === activeTopic.quiz!.answer && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-2">
                            {submittedQuizKeys.has(`${activeSectionIdx}-${activeTopicIdx}`) ? (
                              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-400">
                                <p className="font-bold text-white mb-1">
                                  {selectedAnswers[`${activeSectionIdx}-${activeTopicIdx}`] === activeTopic.quiz!.answer ? "🎉 Correct!" : "❌ Incorrect"}
                                </p>
                                <p className="leading-relaxed">{activeTopic.quiz!.explanation}</p>
                              </div>
                            ) : (
                              <button
                                disabled={selectedAnswers[`${activeSectionIdx}-${activeTopicIdx}`] === undefined}
                                onClick={() => handleQuizSubmit(`${activeSectionIdx}-${activeTopicIdx}`, activeTopic.quiz!.answer)}
                                className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Verify Answer
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Next / Previous Chapter Navigation */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-between border-t border-white/5 pt-8 mt-8">
                        {hasPrev ? (
                          <button
                            onClick={handlePrevChapter}
                            className="flex-1 text-left p-4 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-1 min-w-0"
                          >
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Previous Chapter</span>
                            <span className="text-xs font-bold text-white truncate">
                              {prevTopic ? prevTopic.title.replace(/^\d+(\.\d+)?\s+/, "") : "Previous"}
                            </span>
                          </button>
                        ) : (
                          <div className="flex-1 hidden sm:block" />
                        )}

                        {hasNext ? (
                          <button
                            onClick={handleNextChapter}
                            className="flex-1 text-right p-4 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 border border-white/5 hover:border-white/10 transition-all flex flex-col items-end gap-1 min-w-0"
                          >
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Next Chapter</span>
                            <span className="text-xs font-bold text-white truncate">
                              {nextTopic ? nextTopic.title.replace(/^\d+(\.\d+)?\s+/, "") : "Next"}
                            </span>
                          </button>
                        ) : (
                          <div className="flex-1 hidden sm:block" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {!isIdeMaximized && <Footer />}
    </>
  );
}
