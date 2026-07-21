"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Roadmap.module.css";

const phases = [
  {
    phase: "Phase 1",
    timeline: "Months 1–4",
    title: "Foundation MVP",
    status: "active",
    color: "#6366f1",
    deliverables: [
      "User Authentication & Profiles",
      "Learning Hub & Documentation",
      "Code Playground (50+ Languages)",
      "Basic Challenges & Leaderboards",
      "User Dashboard",
    ],
  },
  {
    phase: "Phase 2",
    timeline: "Months 5–8",
    title: "AI Learning System",
    status: "upcoming",
    color: "#8b5cf6",
    deliverables: [
      "AI Tutor & Mentor",
      "Personalized Learning Roadmaps",
      "Learning Analytics Dashboard",
      "Smart Skill Recommendations",
      "Daily Learning Plans",
    ],
  },
  {
    phase: "Phase 3",
    timeline: "Months 9–12",
    title: "Git Ecosystem",
    status: "upcoming",
    color: "#06b6d4",
    deliverables: [
      "Repository Creation & Management",
      "Commits & Branches",
      "Pull Requests & Code Reviews",
      "Team Projects & Collaboration",
      "Open Source Contributions",
    ],
  },
  {
    phase: "Phase 4",
    timeline: "Months 13–16",
    title: "Project-Based Learning",
    status: "planned",
    color: "#10b981",
    deliverables: [
      "AI Project Generator",
      "Guided Project Workflows",
      "Architecture & DB Design Assistant",
      "Deployment Automation",
      "Project Templates Gallery",
    ],
  },
  {
    phase: "Phase 5",
    timeline: "Months 17–20",
    title: "Competitive Programming",
    status: "planned",
    color: "#f59e0b",
    deliverables: [
      "Weekly Coding Contests",
      "Live Rankings & Ratings",
      "Team Competitions",
      "AI Challenge Creator",
      "1v1 Code Battles",
    ],
  },
  {
    phase: "Phase 6",
    timeline: "Months 21–24",
    title: "Career Platform",
    status: "planned",
    color: "#f43f5e",
    deliverables: [
      "AI Interview Simulator",
      "Resume & Portfolio Builder",
      "Mock Interview Sessions",
      "Company Assessment Tests",
      "Recruiter Portal & Hiring",
    ],
  },
];

export default function Roadmap() {
  return (
    <section className={`section ${styles.roadmap}`} id="roadmap">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            Development Roadmap
          </div>
          <h2 className="section-title">
            24-Month Plan to
            <br />
            <span className="gradient-text">Build the Future</span>
          </h2>
          <p className="section-subtitle">
            A meticulously planned roadmap from MVP to the world&apos;s most complete
            developer ecosystem. Transparent milestones, clear deliverables.
          </p>
        </div>

        <div className={styles.grid}>
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${styles[phase.status]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
            >
              <div className={styles.cardTop}>
                <div className={styles.phaseMeta}>
                  <span
                    className={styles.phaseLabel}
                    style={{ color: phase.color, background: `${phase.color}12`, borderColor: `${phase.color}25` }}
                  >
                    {phase.phase}
                  </span>
                  <span className={styles.timeline}>{phase.timeline}</span>
                </div>
                {phase.status === "active" && (
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    In Progress
                  </span>
                )}
              </div>

              <h3 className={styles.cardTitle}>{phase.title}</h3>

              <ul className={styles.deliverables}>
                {phase.deliverables.map((d) => (
                  <li key={d} className={styles.deliverable}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={phase.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>

              <div className={styles.cardAccent} style={{ background: phase.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
