"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Journey.module.css";

const steps = [
  {
    number: "01",
    title: "Learn",
    subtitle: "Master Fundamentals",
    description:
      "AI-curated learning paths with interactive tutorials, visual explanations, and real-time feedback. Start from zero and build solid foundations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: "#6366f1",
    skills: ["Documentation", "Tutorials", "AI Tutor", "Visual Concepts"],
  },
  {
    number: "02",
    title: "Practice",
    subtitle: "Sharpen Your Skills",
    description:
      "10,000+ coding challenges across all difficulty levels. Real-time leaderboards, weekly contests, and competitive programming ecosystem.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#06b6d4",
    skills: ["DSA Problems", "Contests", "Quizzes", "Code Battles"],
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Create Real Projects",
    description:
      "AI generates project specs, architecture, database schemas, and guides you through building production-ready applications step by step.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    color: "#10b981",
    skills: ["AI Projects", "Templates", "Architecture", "Deployment"],
  },
  {
    number: "04",
    title: "Collaborate",
    subtitle: "Work With Teams",
    description:
      "Built-in Git ecosystem with repositories, branches, pull requests, code reviews, and team management. Contribute to open-source.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#f59e0b",
    skills: ["Git Repos", "PRs", "Code Reviews", "Teams"],
  },
  {
    number: "05",
    title: "Showcase",
    subtitle: "Build Your Portfolio",
    description:
      "Auto-generated developer portfolio showcasing your projects, skills, contributions, and achievements. Keep it always up-to-date.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: "#a855f7",
    skills: ["Portfolio", "Skill Graph", "Achievements", "Resume"],
  },
  {
    number: "06",
    title: "Get Hired",
    subtitle: "Launch Your Career",
    description:
      "AI-powered interview simulator, mock interviews, company assessments, and direct recruiter connections. Your career starts here.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    color: "#f43f5e",
    skills: ["Interviews", "Mock Tests", "Assessments", "Hiring"],
  },
];

function JourneyStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  return (
    <motion.div
      className={styles.step}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className={styles.stepConnector}>
        <div
          className={styles.stepDot}
          style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}40` }}
        />
        {index < steps.length - 1 && <div className={styles.stepLine} />}
      </div>

      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <span className={styles.stepNumber} style={{ color: step.color }}>
            {step.number}
          </span>
          <div
            className={styles.stepIcon}
            style={{
              color: step.color,
              background: `${step.color}10`,
              borderColor: `${step.color}25`,
            }}
          >
            {step.icon}
          </div>
        </div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepSubtitle} style={{ color: step.color }}>
          {step.subtitle}
        </p>
        <p className={styles.stepDesc}>{step.description}</p>
        <div className={styles.stepSkills}>
          {step.skills.map((skill) => (
            <span
              key={skill}
              className={styles.skillTag}
              style={{
                background: `${step.color}08`,
                borderColor: `${step.color}20`,
                color: step.color,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section className={`section ${styles.journey}`} id="journey">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Developer Journey
          </div>
          <h2 className="section-title">
            From Zero to
            <br />
            <span className="gradient-text--secondary">Professional Developer</span>
          </h2>
          <p className="section-subtitle">
            A structured, AI-guided journey that takes you from writing your first line
            of code to landing your dream developer role.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, i) => (
            <JourneyStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
