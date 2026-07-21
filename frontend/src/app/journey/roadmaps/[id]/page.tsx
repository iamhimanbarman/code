"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Code, ChevronRight, ChevronDown, CheckCircle2, Circle, Lock,
  Globe, Database, Layers, Terminal, Cpu, GitBranch, Zap, Trophy, Clock,
  ArrowLeft, Star, Play, Sparkles, AlertCircle, Award, Check
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Detailed roadmaps data including all 6 paths
const ROADMAPS_DETAIL_DATA: Record<string, any> = {
  frontend: {
    title: "Frontend Development",
    desc: "Master modern web development from HTML/CSS basics to high-performance React and Next.js applications.",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-500",
    color: "cyan",
    level: "Beginner → Advanced",
    estimatedHours: 120,
    quiz: {
      question: "Which hook should you use in React to perform side effects like fetching data or setting up subscriptions?",
      options: ["useState", "useMemo", "useEffect", "useCallback"],
      answer: 2, // useEffect
      explanation: "useEffect is designed to handle side effects in React function components, such as API calls, subscriptions, DOM manipulation, and timers."
    },
    modules: [
      {
        title: "Web Fundamentals",
        topics: [
          { title: "How the Internet & Browsers Work", type: "reading", duration: "15 min", free: true },
          { title: "HTML5 Semantic Structure & SEO", type: "tutorial", duration: "2 hr", free: true },
          { title: "CSS3 Flexbox, Grid & Layouts", type: "tutorial", duration: "3 hr", free: true },
          { title: "Responsive Web Design & Tailwind", type: "project", duration: "2 hr", free: true },
          { title: "Practice: Build a Developer Portfolio", type: "challenge", duration: "2 hr", free: true },
        ],
      },
      {
        title: "JavaScript Mastery",
        topics: [
          { title: "JS Types, Variables & Scope", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "Functions, Closures & Context (this)", type: "tutorial", duration: "2 hr", free: true },
          { title: "Arrays, Objects & ES6+ Features", type: "tutorial", duration: "2 hr", free: true },
          { title: "Asynchronous JavaScript (Promises & Async/Await)", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "DOM Manipulation & Event Loop", type: "reading", duration: "1.5 hr", free: true },
          { title: "Practice: Concatenation of Array", type: "challenge", challengeSlug: "concatenation-of-array", duration: "1 hr", free: true },
        ],
      },
      {
        title: "React Fundamentals",
        topics: [
          { title: "Virtual DOM & Core Concepts", type: "tutorial", duration: "2 hr", free: true },
          { title: "Components, JSX & Props", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "State Management & Event Handling", type: "tutorial", duration: "2 hr", free: true },
          { title: "Hooks Deep Dive (useState, useEffect)", type: "tutorial", duration: "3 hr", free: false },
          { title: "Custom Hooks & Context API", type: "tutorial", duration: "2 hr", free: false },
          { title: "Practice: Valid Parentheses", type: "challenge", challengeSlug: "valid-parentheses", duration: "1 hr", free: true },
        ],
      },
      {
        title: "Next.js & Advanced React",
        topics: [
          { title: "Next.js App Router & Server Components", type: "tutorial", duration: "3 hr", free: false },
          { title: "Data Fetching & Caching Strategies", type: "tutorial", duration: "2 hr", free: false },
          { title: "TypeScript with React & Next.js", type: "tutorial", duration: "2.5 hr", free: false },
          { title: "Tailwind CSS & Framer Motion Animations", type: "project", duration: "3 hr", free: false },
          { title: "Testing React Apps (Vitest & RTL)", type: "tutorial", duration: "2 hr", free: false },
          { title: "Capstone: Interactive SaaS Dashboard", type: "project", duration: "10 hr", free: false },
        ],
      },
    ],
  },
  backend: {
    title: "Backend Engineering",
    desc: "Build robust, secure, and scalable server-side systems with Node.js, relational & NoSQL databases, and cloud platforms.",
    icon: Database,
    gradient: "from-emerald-500 to-green-500",
    color: "emerald",
    level: "Beginner → Advanced",
    estimatedHours: 110,
    quiz: {
      question: "Which of the following database concepts guarantees transactional integrity (Atomicity, Consistency, Isolation, Durability)?",
      options: ["BASE", "ACID", "CAP Theorem", "Sharding"],
      answer: 1, // ACID
      explanation: "ACID properties ensure that database transactions are processed reliably, maintaining data consistency and robustness in application backends."
    },
    modules: [
      {
        title: "Node.js & Express Basics",
        topics: [
          { title: "Node.js Architecture & Event Loop", type: "reading", duration: "1.5 hr", free: true },
          { title: "Node Modules, NPM, & Package.json", type: "tutorial", duration: "1 hr", free: true },
          { title: "Creating HTTP Server from Scratch", type: "tutorial", duration: "2 hr", free: true },
          { title: "Express.js Routing & Middleware", type: "tutorial", duration: "3 hr", free: true },
          { title: "RESTful API Best Practices", type: "tutorial", duration: "2 hr", free: true },
        ],
      },
      {
        title: "Databases & Data Modeling",
        topics: [
          { title: "Relational DBs & SQL (PostgreSQL)", type: "tutorial", duration: "3 hr", free: true },
          { title: "Database Normalization & Indexing", type: "reading", duration: "2 hr", free: true },
          { title: "Prisma ORM Database Integration", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "NoSQL DBs (MongoDB & Mongoose)", type: "tutorial", duration: "2 hr", free: false },
          { title: "Redis Caching for Performance", type: "tutorial", duration: "2 hr", free: false },
        ],
      },
      {
        title: "Authentication & Security",
        topics: [
          { title: "Password Hashing & JWT Authentication", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Sessions, Cookies & CORS Security", type: "reading", duration: "1.5 hr", free: true },
          { title: "OAuth 2.0 & Social Logins", type: "tutorial", duration: "3 hr", free: false },
          { title: "API Rate Limiting & Input Validation", type: "tutorial", duration: "1.5 hr", free: false },
        ],
      },
      {
        title: "Advanced Backend Concepts",
        topics: [
          { title: "NestJS Dependency Injection Framework", type: "tutorial", duration: "4 hr", free: false },
          { title: "WebSockets & Real-time Bi-directional Flow", type: "tutorial", duration: "2 hr", free: false },
          { title: "Message Queues (RabbitMQ/Kafka)", type: "tutorial", duration: "3 hr", free: false },
          { title: "Docker Containerizing Backend Service", type: "project", duration: "3 hr", free: false },
          { title: "Capstone: E-Commerce REST & GraphQL API", type: "project", duration: "12 hr", free: false },
        ],
      },
    ],
  },
  dsa: {
    title: "Data Structures & Algorithms",
    desc: "Master key computer science patterns, arrays, trees, graphs, and dynamic programming to ace coding interviews.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-500",
    color: "amber",
    level: "Beginner → Expert",
    estimatedHours: 200,
    quiz: {
      question: "What is the worst-case time complexity of lookup in a hash map?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answer: 2, // O(n)
      explanation: "In the worst case (when all keys hash to the same bucket causing hash collisions), a hash map lookup degrades to linear time O(n)."
    },
    modules: [
      {
        title: "Algorithmic Analysis & Basics",
        topics: [
          { title: "Big-O Notation & Time/Space Complexity", type: "reading", duration: "1 hr", free: true },
          { title: "Arrays & Dynamic String Operations", type: "tutorial", duration: "2 hr", free: true },
          { title: "HashMap & HashSet Implementations", type: "tutorial", duration: "2 hr", free: true },
          { title: "Two Pointers Technique", type: "tutorial", duration: "1.5 hr", free: true },
          { title: "Sliding Window Patterns", type: "tutorial", duration: "2 hr", free: true },
          { title: "Practice: Two Sum", type: "challenge", challengeSlug: "two-sum", duration: "1 hr", free: true },
        ],
      },
      {
        title: "Linear Data Structures",
        topics: [
          { title: "Linked Lists (Singly & Doubly)", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Stacks & Queues from Scratch", type: "tutorial", duration: "2 hr", free: true },
          { title: "Monotonic Stack Patterns", type: "tutorial", duration: "2 hr", free: false },
          { title: "Practice: Reverse Linked List", type: "challenge", challengeSlug: "reverse-linked-list", duration: "1 hr", free: true },
          { title: "Practice: Merge Two Sorted Lists", type: "challenge", challengeSlug: "merge-two-sorted-lists", duration: "1 hr", free: true },
        ],
      },
      {
        title: "Non-Linear Structures & Traversals",
        topics: [
          { title: "Binary Trees & Binary Search Trees (BST)", type: "tutorial", duration: "3 hr", free: true },
          { title: "BFS & DFS Tree Traversals", type: "tutorial", duration: "2 hr", free: true },
          { title: "Tries & Segment Trees", type: "tutorial", duration: "2.5 hr", free: false },
          { title: "Graph Representations & Basic BFS/DFS", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Shortest Path (Dijkstra's & Bellman-Ford)", type: "tutorial", duration: "3 hr", free: false },
          { title: "Topological Sort & Disjoint Set Union", type: "tutorial", duration: "2.5 hr", free: false },
        ],
      },
      {
        title: "Advanced Optimization & DP",
        topics: [
          { title: "Recursion & Backtracking Algorithms", type: "tutorial", duration: "3 hr", free: false },
          { title: "Greedy Choice Property & Scheduling", type: "tutorial", duration: "2 hr", free: false },
          { title: "Dynamic Programming: 1D Patterns", type: "tutorial", duration: "4 hr", free: false },
          { title: "Dynamic Programming: Knapsack & Grid State", type: "tutorial", duration: "5 hr", free: false },
          { title: "Bit Manipulation Tricks", type: "tutorial", duration: "1.5 hr", free: false },
        ],
      },
    ],
  },
  fullstack: {
    title: "Full-Stack Mastery",
    desc: "Become a complete full-stack engineer. Build, style, deploy, and scale comprehensive end-to-end applications.",
    icon: Terminal,
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
    level: "Intermediate → Expert",
    estimatedHours: 180,
    quiz: {
      question: "Which of the following rendering strategies fetches data and generates HTML on demand for each user request in Next.js?",
      options: ["Static Site Generation (SSG)", "Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)", "Client-Side Rendering (CSR)"],
      answer: 1, // SSR
      explanation: "Server-Side Rendering (SSR) compiles the page HTML on the server dynamically during each incoming user request."
    },
    modules: [
      {
        title: "Monorepo & Workspace Architecture",
        topics: [
          { title: "Monorepo Setup with Turborepo & NPM Workspaces", type: "tutorial", duration: "3 hr", free: true },
          { title: "Shared Schemas & TypeScript DTO Configuration", type: "reading", duration: "2 hr", free: true },
          { title: "Eslint & Prettier Monorepo Standardization", type: "tutorial", duration: "1.5 hr", free: true },
        ],
      },
      {
        title: "API Protocols & Data Pipelines",
        topics: [
          { title: "GraphQL Schema Design & Resolvers", type: "tutorial", duration: "3.5 hr", free: true },
          { title: "Apollo Client vs React Query State Integration", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "REST APIs vs tRPC Implementation", type: "tutorial", duration: "3 hr", free: false },
          { title: "Real-time SSE (Server-Sent Events) and WS", type: "tutorial", duration: "2 hr", free: false },
        ],
      },
      {
        title: "Deployment & Infrastructure",
        topics: [
          { title: "CI/CD Deployment Pipelines with GitHub Actions", type: "tutorial", duration: "2 hr", free: true },
          { title: "Deploying Frontend on Vercel & Backend on AWS", type: "project", duration: "4 hr", free: false },
          { title: "Database Migration & DB Hosting (Supabase/Neon)", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Serverless Functions & Edge Network Caching", type: "reading", duration: "2 hr", free: false },
        ],
      },
      {
        title: "Production Best Practices",
        topics: [
          { title: "Logging Platforms (Winston, Axiom) Setup", type: "tutorial", duration: "2 hr", free: false },
          { title: "Error Monitoring & Crash Reports (Sentry)", type: "tutorial", duration: "1.5 hr", free: false },
          { title: "SEO, Meta Tags & Web Vitals Optimization", type: "reading", duration: "2 hr", free: false },
          { title: "Capstone: Fully Featured SaaS Platform with Subscriptions", type: "project", duration: "15 hr", free: false },
        ],
      },
    ],
  },
  devops: {
    title: "DevOps & Cloud",
    desc: "Master automated deployments, container orchestration, CI/CD pipelines, and robust cloud architectures.",
    icon: Cpu,
    gradient: "from-rose-500 to-red-500",
    color: "rose",
    level: "Intermediate → Advanced",
    estimatedHours: 80,
    quiz: {
      question: "Which Docker instruction sets the default command that is executed when running the container?",
      options: ["RUN", "CMD", "ENTRYPOINT", "EXPOSE"],
      answer: 1, // CMD
      explanation: "The CMD instruction specifies the default executable command along with parameters when starting a Docker container."
    },
    modules: [
      {
        title: "Containerization",
        topics: [
          { title: "Introduction to Virtualization & Containers", type: "reading", duration: "1 hr", free: true },
          { title: "Writing Dockerfiles from Scratch", type: "tutorial", duration: "2.5 hr", free: true },
          { title: "Docker Compose for Multi-Container Apps", type: "tutorial", duration: "2 hr", free: true },
          { title: "Optimizing Docker Image Size (Multi-stage)", type: "tutorial", duration: "1.5 hr", free: true },
        ],
      },
      {
        title: "CI/CD & Automation",
        topics: [
          { title: "Git and Git Flow Paradigms", type: "reading", duration: "1 hr", free: true },
          { title: "GitHub Actions Build & Test Pipelines", type: "tutorial", duration: "3 hr", free: true },
          { title: "Automatic Docker Hub Image Publishing", type: "tutorial", duration: "2 hr", free: false },
          { title: "Self-Hosted Runners & Pipeline Security", type: "reading", duration: "2 hr", free: false },
        ],
      },
      {
        title: "Kubernetes Orchestration",
        topics: [
          { title: "K8s Architecture, Control Plane & Worker Nodes", type: "reading", duration: "2 hr", free: true },
          { title: "K8s Resources: Pods, Deployments & Services", type: "tutorial", duration: "3 hr", free: false },
          { title: "Persistent Volumes & ConfigMaps", type: "tutorial", duration: "2 hr", free: false },
          { title: "Helm Charts Package Management", type: "tutorial", duration: "2.5 hr", free: false },
        ],
      },
      {
        title: "Cloud Infrastructure (AWS) & Monitoring",
        topics: [
          { title: "AWS Core: VPC, EC2, S3 & IAM Policies", type: "tutorial", duration: "4 hr", free: false },
          { title: "Infrastructure as Code (IaC) with Terraform", type: "tutorial", duration: "3.5 hr", free: false },
          { title: "System Monitoring with Prometheus & Grafana", type: "project", duration: "3 hr", free: false },
          { title: "Centralized Logs Management with ELK Stack", type: "tutorial", duration: "2.5 hr", free: false },
        ],
      },
    ],
  },
  "system-design": {
    title: "System Design",
    desc: "Learn to design large-scale, highly available distributed systems. Understand load balancing, sharding, and message queues.",
    icon: GitBranch,
    gradient: "from-indigo-500 to-violet-500",
    color: "indigo",
    level: "Advanced → Expert",
    estimatedHours: 60,
    quiz: {
      question: "According to the CAP Theorem, when a network partition (P) occurs, what must a distributed system choose between?",
      options: ["Consistency (C) and Availability (A)", "Speed (S) and Security (S)", "Scalability (S) and Latency (L)", "Durability (D) and Atomicity (A)"],
      answer: 0, // Consistency and Availability
      explanation: "The CAP Theorem states that in the event of a network partition, a distributed system can guarantee either Consistency or Availability, but not both."
    },
    modules: [
      {
        title: "Scaling Fundamentals",
        topics: [
          { title: "Vertical vs Horizontal Scaling Patterns", type: "reading", duration: "1.5 hr", free: true },
          { title: "Load Balancers (Nginx, HAProxy) & Algorithms", type: "tutorial", duration: "2 hr", free: true },
          { title: "DNS, CDN & Reverse Proxy Routing", type: "reading", duration: "1.5 hr", free: true },
          { title: "Consistent Hashing Implementation", type: "tutorial", duration: "2 hr", free: true },
        ],
      },
      {
        title: "Data Stores & Caching",
        topics: [
          { title: "Database Read/Write Replication & Failovers", type: "reading", duration: "2 hr", free: true },
          { title: "Database Sharding & Partitioning Strategies", type: "tutorial", duration: "3 hr", free: false },
          { title: "Distributed Caching (Redis/Memcached)", type: "tutorial", duration: "2 hr", free: false },
          { title: "SQL vs NoSQL CAP Analysis", type: "reading", duration: "1.5 hr", free: true },
        ],
      },
      {
        title: "Distributed Communication",
        topics: [
          { title: "Message Queues (Kafka vs RabbitMQ)", type: "tutorial", duration: "3 hr", free: false },
          { title: "Event-Driven Architectures & CQRS Patterns", type: "reading", duration: "2 hr", free: false },
          { title: "Distributed Unique ID Generator (Snowflake)", type: "tutorial", duration: "2 hr", free: false },
          { title: "Heartbeats, Gossip Protocol & Consensus (Raft)", type: "reading", duration: "2.5 hr", free: false },
        ],
      },
      {
        title: "System Design Case Studies",
        topics: [
          { title: "Case Study: Designing URL Shortener (TinyURL)", type: "project", duration: "2.5 hr", free: true },
          { title: "Case Study: Designing Chat App (WhatsApp)", type: "project", duration: "3 hr", free: false },
          { title: "Case Study: Designing Video Platform (YouTube)", type: "project", duration: "4 hr", free: false },
          { title: "Case Study: Designing Ride Sharing System (Uber)", type: "project", duration: "4.5 hr", free: false },
        ],
      },
    ],
  },
};

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
    case "reading": return "text-blue-400 bg-blue-400/10 border-blue-500/10";
    case "tutorial": return "text-emerald-400 bg-emerald-400/10 border-emerald-500/10";
    case "challenge": return "text-amber-400 bg-amber-400/10 border-amber-500/10";
    case "project": return "text-purple-400 bg-purple-400/10 border-purple-500/10";
    default: return "text-slate-400 bg-slate-400/10 border-slate-500/10";
  }
}

export default function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roadmapId = resolvedParams.id;
  const roadmap = ROADMAPS_DETAIL_DATA[roadmapId];

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  // Interactive Quiz States
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  const [xpPoints, setXpPoints] = useState(0);

  // User input name for certificate
  const [userName, setUserName] = useState("");
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Initialize and load saved progress
  useEffect(() => {
    if (!roadmap) return;
    const storedProgress = localStorage.getItem(`cv-progress-${roadmapId}`);
    if (storedProgress) {
      try {
        setCompletedTopics(new Set(JSON.parse(storedProgress)));
      } catch (e) {
        console.error("Failed to parse progress data", e);
      }
    }

    const storedXp = localStorage.getItem("cv-xp-points");
    if (storedXp) {
      setXpPoints(parseInt(storedXp, 10));
    }

    const savedName = localStorage.getItem("cv-user-name");
    if (savedName) {
      setUserName(savedName);
    }
  }, [roadmapId, roadmap]);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center text-white">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Roadmap Not Found</h1>
        <p className="text-slate-400 mb-6">The requested roadmap path does not exist.</p>
        <Link href="/journey" className="btn btn--primary">
          Return to Journey Hub
        </Link>
      </div>
    );
  }

  // Calculate progress stats
  const totalTopics = roadmap.modules.reduce((sum: number, m: any) => sum + m.topics.length, 0);
  const completedCount = roadmap.modules.reduce(
    (sum: number, m: any, mi: number) =>
      sum + m.topics.filter((_: any, ti: number) => completedTopics.has(`${roadmapId}-${mi}-${ti}`)).length,
    0
  );
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const toggleModule = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTopic = (key: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else {
        next.add(key);
        // Award 15 XP for completing a topic
        const newXp = xpPoints + 15;
        setXpPoints(newXp);
        localStorage.setItem("cv-xp-points", String(newXp));
      }
      const arrayData = Array.from(next);
      localStorage.setItem(`cv-progress-${roadmapId}`, JSON.stringify(arrayData));
      return next;
    });
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === roadmap.quiz.answer) {
      setQuizSuccess(true);
      const newXp = xpPoints + 100;
      setXpPoints(newXp);
      localStorage.setItem("cv-xp-points", String(newXp));
      // Mark all reading topics as completed as a bonus!
      const next = new Set(completedTopics);
      roadmap.modules.forEach((module: any, mi: number) => {
        module.topics.forEach((topic: any, ti: number) => {
          if (topic.type === "reading") {
            next.add(`${roadmapId}-${mi}-${ti}`);
          }
        });
      });
      setCompletedTopics(next);
      localStorage.setItem(`cv-progress-${roadmapId}`, JSON.stringify(Array.from(next)));
    } else {
      setQuizSuccess(false);
    }
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    localStorage.setItem("cv-user-name", userName);
    setCertificateUnlocked(true);
    setShowCertificateModal(true);
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <Link href="/journey" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Journey Hub
            </Link>

            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-300">
              <Trophy className="w-4 h-4 text-indigo-400" />
              <span>{xpPoints} total XP earned</span>
            </div>
          </div>

          {/* Hero Banner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-xl mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center shadow-lg mb-6`}>
                  <roadmap.icon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {roadmap.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Roadmap</span>
                </h1>
                <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-3xl">
                  {roadmap.desc}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-white/5">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> {totalTopics} topics
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-white/5">
                    <Clock className="w-4 h-4 text-emerald-400" /> {roadmap.estimatedHours}h estimated
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-white/5">
                    <Star className="w-4 h-4 text-amber-400" /> {roadmap.level}
                  </span>
                </div>
              </div>

              {/* Dynamic Radial Progress */}
              <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-white/5 rounded-2xl p-6 w-full lg:w-64 text-center backdrop-blur-xl">
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      cx="56" cy="56" r="48"
                      stroke={`url(#roadmap-grad-${roadmapId})`}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - progressPercent / 100)}
                      strokeLinecap="round"
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id={`roadmap-grad-${roadmapId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold text-white leading-none">{progressPercent}%</span>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Complete</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  {completedCount} of {totalTopics} Completed
                </p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Mark topics complete to earn +15 XP each
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Modules & Topics Accordion */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" /> Roadmap Structure
              </h2>

              <div className="space-y-3">
                {roadmap.modules.map((module: any, mi: number) => {
                  const moduleKey = `${roadmapId}-mod-${mi}`;
                  const isExpanded = expandedModules[moduleKey] !== false; // Default expanded
                  const moduleCompletedCount = module.topics.filter(
                    (_: any, ti: number) => completedTopics.has(`${roadmapId}-${mi}-${ti}`)
                  ).length;

                  return (
                    <div
                      key={mi}
                      className="bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-white/10"
                    >
                      <button
                        onClick={() => toggleModule(moduleKey)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/[0.01] transition-colors text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center text-sm font-bold text-white`}>
                            {mi + 1}
                          </div>
                          <div>
                            <span className="font-bold text-white text-base block">{module.title}</span>
                            <span className="text-xs text-slate-500">
                              {moduleCompletedCount} of {module.topics.length} completed
                            </span>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/5 px-5 pb-4 pt-2 divide-y divide-white/5"
                          >
                            {module.topics.map((topic: any, ti: number) => {
                              const topicKey = `${roadmapId}-${mi}-${ti}`;
                              const isDone = completedTopics.has(topicKey);

                              return (
                                <div
                                  key={ti}
                                  className="flex items-start md:items-center justify-between gap-4 py-3.5 group"
                                >
                                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                    <button
                                      onClick={() => toggleTopic(topicKey)}
                                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                        isDone
                                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 scale-105"
                                          : "border border-slate-700 text-transparent hover:border-slate-500"
                                      }`}
                                      title={isDone ? "Mark incomplete" : "Mark complete"}
                                    >
                                      {isDone ? <Check className="w-3.5 h-3.5" /> : null}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                      {topic.challengeSlug ? (
                                        <Link
                                          href={`/challenges/${topic.challengeSlug}`}
                                          className={`text-sm font-semibold hover:text-indigo-400 transition-colors flex items-center gap-2 ${
                                            isDone ? "text-slate-500 line-through" : "text-slate-200"
                                          }`}
                                        >
                                          {topic.title}
                                          <Play className="w-3 h-3 text-emerald-400 shrink-0 fill-emerald-400" />
                                        </Link>
                                      ) : (
                                        <span className={`text-sm font-semibold block ${isDone ? "text-slate-500 line-through" : "text-slate-200"}`}>
                                          {topic.title}
                                        </span>
                                      )}
                                      <div className="flex items-center gap-2.5 mt-1 text-[11px] text-slate-500">
                                        <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 uppercase font-bold tracking-wider ${getTypeColor(topic.type)}`}>
                                          {getTypeIcon(topic.type)} {topic.type}
                                        </span>
                                        <span>•</span>
                                        <span>{topic.duration}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {!topic.free && <Lock className="w-3.5 h-3.5 text-slate-600" />}
                                    {topic.challengeSlug && (
                                      <Link
                                        href={`/challenges/${topic.challengeSlug}`}
                                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#333] hover:border-emerald-500/40 hover:bg-emerald-500/5 text-slate-300 hover:text-white transition-all shrink-0"
                                      >
                                        Solve Challenge
                                      </Link>
                                    )}
                                  </div>
                                </div>
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

            {/* Right Col: Interactive Tools & Certificate */}
            <div className="space-y-8">
              
              {/* Interactive Quiz / Knowledge check */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Daily Knowledge Check</h3>
                    <p className="text-xs text-slate-500">Answer correct to get +100 XP</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-5 font-medium leading-relaxed">
                  {roadmap.quiz.question}
                </p>

                <div className="space-y-2 mb-5">
                  {roadmap.quiz.options.map((option: string, oi: number) => {
                    const isSelected = selectedQuizOption === oi;
                    let optionStyle = "border-white/5 hover:border-white/10 hover:bg-white/[0.01]";
                    if (isSelected) optionStyle = "border-indigo-500/40 bg-indigo-500/5 text-white";
                    if (quizSubmitted) {
                      if (oi === roadmap.quiz.answer) optionStyle = "border-emerald-500/40 bg-emerald-500/5 text-emerald-400";
                      else if (isSelected) optionStyle = "border-rose-500/40 bg-rose-500/5 text-rose-400";
                    }

                    return (
                      <button
                        key={oi}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(oi)}
                        className={`w-full text-left p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && oi === roadmap.quiz.answer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizOption === null}
                    className="w-full btn btn--primary btn--small py-2.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-400">
                    <p className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      {quizSuccess ? (
                        <>
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span>Correct! +100 XP awarded</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          <span>Wrong Answer!</span>
                        </>
                      )}
                    </p>
                    <p className="leading-relaxed">{roadmap.quiz.explanation}</p>
                  </div>
                )}
              </div>

              {/* Roadmap Certificate Unlocker */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Certificate of Completion</h3>
                    <p className="text-xs text-slate-500">Reach 100% progress to claim</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  Verify your expertise. Complete this roadmap curriculum and earn a downloadable verified CodeVerse Certificate to share on LinkedIn or with hiring teams.
                </p>

                {progressPercent < 100 ? (
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Requirement: 100% Progress</span>
                      <span>{progressPercent}% Current</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleGenerateCertificate} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter name for certificate"
                        className="w-full bg-slate-800/40 border border-white/5 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4" /> Generate Certificate
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowCertificateModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#0b0c10] border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              {/* Certificate Inner Frame */}
              <div className="border border-white/5 rounded-2xl p-6 md:p-10 text-center bg-[#07080a] relative">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/30" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500/30" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-500/30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500/30" />
                
                <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-4 animate-bounce" />
                
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                  Certificate of Completion
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-6">
                  Verified by CodeVerse Academy
                </p>
                
                <p className="text-slate-400 text-sm mb-1.5 italic">This is proudly presented to</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 font-display tracking-tight bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  {userName}
                </h2>
                
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  for successfully mastering the curriculum of <span className="text-white font-semibold">{roadmap.title}</span>, completed with structured learning tracks, code challenges, and algorithmic tests.
                </p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-6 max-w-sm mx-auto">
                  <div className="text-left">
                    <p className="text-xs text-white font-bold">CodeVerse Academy</p>
                    <p className="text-[9px] text-slate-500">Ecosystem Verification</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white font-bold">{new Date().toLocaleDateString()}</p>
                    <p className="text-[9px] text-slate-500">Date Issued</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-100 transition-colors"
                >
                  Download PDF / Print
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
