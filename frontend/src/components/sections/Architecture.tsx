"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Architecture.module.css";

const layers = [
  {
    name: "Layer 1 — Learning",
    color: "#6366f1",
    items: ["Documentation", "Tutorials", "Interactive Notes", "Visual Explanations", "AI Tutor"],
  },
  {
    name: "Layer 2 — Practice",
    color: "#06b6d4",
    items: ["Coding Challenges", "DSA Problems", "Quizzes", "Contests"],
  },
  {
    name: "Layer 3 — Building",
    color: "#10b981",
    items: ["Project Builder", "Project Templates", "AI Project Assistant"],
  },
  {
    name: "Layer 4 — Collaboration",
    color: "#f59e0b",
    items: ["Repositories", "Teams", "Code Reviews", "Pull Requests"],
  },
  {
    name: "Layer 5 — Career",
    color: "#f43f5e",
    items: ["Interview Prep", "Resume Builder", "Skill Assessment", "Hiring Portal"],
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["Next.js", "TypeScript", "Redux Toolkit", "Framer Motion"],
    color: "#6366f1",
  },
  {
    category: "Backend",
    items: ["NestJS", "PostgreSQL", "Redis", "WebSocket"],
    color: "#10b981",
  },
  {
    category: "AI Layer",
    items: ["OpenAI APIs", "RAG System", "Vector Database"],
    color: "#a855f7",
  },
  {
    category: "Infrastructure",
    items: ["Docker", "AWS", "GitHub Actions", "Kubernetes"],
    color: "#f59e0b",
  },
];

export default function Architecture() {
  return (
    <section className={`section ${styles.architecture}`} id="architecture">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Platform Architecture
          </div>
          <h2 className="section-title">
            Five Layers,
            <br />
            <span className="gradient-text">One Ecosystem</span>
          </h2>
          <p className="section-subtitle">
            A modular, scalable architecture designed to grow with you.
            Each layer builds upon the previous, creating a seamless developer experience.
          </p>
        </div>

        {/* Layer Visualization */}
        <div className={styles.layerStack}>
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              className={styles.layer}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.layerBar} style={{ background: layer.color }} />
              <div className={styles.layerContent}>
                <h4 className={styles.layerName} style={{ color: layer.color }}>
                  {layer.name}
                </h4>
                <div className={styles.layerItems}>
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className={styles.layerItem}
                      style={{
                        borderColor: `${layer.color}25`,
                        color: `${layer.color}`,
                        background: `${layer.color}08`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className={styles.techSection}>
          <h3 className={styles.techTitle}>
            Powered By <span className="gradient-text--secondary">Modern Stack</span>
          </h3>
          <div className={styles.techGrid}>
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                className={styles.techCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                <div
                  className={styles.techBadge}
                  style={{ color: tech.color, background: `${tech.color}10`, borderColor: `${tech.color}20` }}
                >
                  {tech.category}
                </div>
                <div className={styles.techItems}>
                  {tech.items.map((item) => (
                    <span key={item} className={styles.techItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
