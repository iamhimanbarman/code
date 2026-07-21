"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./AIEngine.module.css";

const aiFeatures = [
  {
    id: "tutor",
    title: "AI Pair Programmer",
    description:
      "Acts like a senior developer. Provides hints, refactoring suggestions, optimization tips, and detailed code reviews in real-time.",
    demo: {
      prompt: '> "How do I optimize this database query?"',
      response: `The query has an N+1 problem. Here's the optimized version using JOIN:

\`\`\`sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.created_at > '2025-01-01'
\`\`\`

This reduces 100+ queries to just 1. 
Performance gain: ~95% faster ⚡`,
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "project",
    title: "AI Project Generator",
    description:
      'Input: "Build a Hospital Management System". Output: Complete requirements, architecture diagrams, database schemas, API endpoints, and task breakdown.',
    demo: {
      prompt: '> "Build a Hospital Management System"',
      response: `📋 Requirements Generated (12 modules)
🏗️ Architecture: Microservices + API Gateway
🗃️ Database: 24 tables designed
🔌 API Endpoints: 86 routes mapped
📋 Tasks: 142 tasks created
⏱️ Estimated: 12 weeks (solo dev)

Ready to start? Let's begin with auth module →`,
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "skill",
    title: "AI Skill Graph",
    description:
      "Visual representation of your developer DNA. Track progress across languages, frameworks, DSA skills, and project experience with detailed analytics.",
    demo: {
      prompt: "> Show my skill analysis",
      response: `🐍 Python ████████████░░ 82%  (+12% this month)
⚛️ React  ██████████░░░░ 71%  (+8% this month)
🗃️ SQL    █████████░░░░░ 65%  (↑ trending)
📊 DSA    ████████░░░░░░ 58%  (needs focus)
🐳 Docker ██████░░░░░░░░ 43%  (new skill)

Recommendation: Focus on DSA patterns 
to unlock "Algorithm Master" badge 🏆`,
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
  {
    id: "interview",
    title: "AI Interview Simulator",
    description:
      "Practice with AI-powered mock interviews tailored to specific companies and roles. Get instant feedback on technical accuracy, communication, and approach.",
    demo: {
      prompt: '> "Mock interview: Google L4 Frontend"',
      response: `🎯 Interview Mode: Google L4 Frontend
⏱️ Duration: 45 minutes
📝 Format: System Design + Coding

Q1: Design a real-time collaborative
    text editor like Google Docs.

Consider: CRDTs vs OT, WebSocket 
architecture, conflict resolution...

Ready when you are. Timer starts on 
your first response. Good luck! 🍀`,
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function AIEngine() {
  const [activeTab, setActiveTab] = useState("tutor");
  const activeFeature = aiFeatures.find((f) => f.id === activeTab)!;

  return (
    <section className={`section ${styles.aiEngine}`} id="ai-engine">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            AI Engine
          </div>
          <h2 className="section-title">
            Your AI-Powered
            <br />
            <span className="gradient-text--accent">Development Partner</span>
          </h2>
          <p className="section-subtitle">
            Advanced AI that understands code, architecture, and career growth.
            Not just a chatbot — a true development companion.
          </p>
        </div>

        <motion.div
          className={styles.showcase}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tabs */}
          <div className={styles.tabs}>
            {aiFeatures.map((feature) => (
              <button
                key={feature.id}
                className={`${styles.tab} ${activeTab === feature.id ? styles.active : ""}`}
                onClick={() => setActiveTab(feature.id)}
              >
                {feature.icon}
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>{activeFeature.title}</h3>
              <p className={styles.infoDesc}>{activeFeature.description}</p>

              <div className={styles.infoCta}>
                <Link href={`/ai-engine/${activeFeature.id}`} className="btn btn--primary btn--small">
                  Try It Now
                </Link>
                <Link href={`/ai-engine/${activeFeature.id}`} className="btn btn--secondary btn--small">
                  Learn More
                </Link>
              </div>
            </div>

            <div className={styles.demo}>
              <div className={styles.demoWindow}>
                <div className={styles.demoBar}>
                  <div className={styles.demoBarDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={styles.demoBarTitle}>CodeVerse AI</span>
                </div>
                <div className={styles.demoBody}>
                  <div className={styles.demoPrompt}>
                    {activeFeature.demo.prompt}
                  </div>
                  <div className={styles.demoResponse}>
                    <div className={styles.aiAvatar}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
                      </svg>
                    </div>
                    <pre className={styles.responseText}>
                      {activeFeature.demo.response}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
