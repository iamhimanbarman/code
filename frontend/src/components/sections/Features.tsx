"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import styles from "./Features.module.css";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Interactive Learning",
    description: "AI-curated courses with visual explanations, interactive notes, and personalized learning paths tailored to your pace.",
    color: "var(--accent-indigo)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    href: "/journey",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Code Playground",
    description: "Browser-based IDE supporting 50+ languages. Write, run, and debug code instantly with intelligent auto-completion.",
    color: "var(--accent-cyan)",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
    href: "/playground",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "DSA & Challenges",
    description: "10,000+ problems across all difficulty levels. Real-time leaderboards, weekly contests, and AI-generated challenges.",
    color: "var(--accent-emerald)",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    href: "/challenges",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: "AI Mentor",
    description: "Your personal AI tutor that adapts to your learning style. Get hints, code reviews, optimization tips, and explanations.",
    color: "var(--accent-violet)",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    href: "/ai-engine/tutor",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    title: "Git Ecosystem",
    description: "Built-in repositories, branches, pull requests, and team collaboration. Like GitHub, but integrated with your learning.",
    color: "var(--accent-blue)",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    href: "/git",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Project Builder",
    description: "AI generates real-world projects with architecture, database schemas, and deployment guides. Build production-ready apps.",
    color: "var(--accent-amber)",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    href: "/ai-engine/project",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Career Portal",
    description: "AI mock interviews, resume builder, skill assessments, and direct connections with recruiters. Your career launchpad.",
    color: "var(--accent-rose)",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
    href: "/career",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Skill Graph",
    description: "Visual skill tree inspired by gaming. Track progress across languages, frameworks, and specializations with XP rewards.",
    color: "var(--accent-purple)",
    gradient: "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
    href: "/ai-engine/skill",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    gradient: string;
    href: string;
  };
  index: number;
}) {
  return (
    <Link href={feature.href} className="block h-full">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
        whileHover={{ y: -8, scale: 1.02 }}
        style={{ cursor: "pointer", height: "100%" }}
      >
        <div
          className={styles.iconWrap}
          style={{
            background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}08 100%)`,
            borderColor: `${feature.color}25`,
            color: feature.color,
          }}
        >
          {feature.icon}
        </div>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardDesc}>{feature.description}</p>
        <div className={styles.cardLine} style={{ background: feature.gradient }} />
      </motion.div>
    </Link>
  );
}

export default function Features() {
  return (
    <section className={`section ${styles.features}`} id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Platform Features
          </div>
          <h2 className="section-title">
            Everything You Need to
            <br />
            <span className="gradient-text">Master Development</span>
          </h2>
          <p className="section-subtitle">
            One platform, infinite possibilities. From your first &ldquo;Hello World&rdquo; to
            landing your dream job — CodeVerse has every tool you need.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
