"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const floatingIcons = [
  { icon: "⚛️", x: "10%", y: "20%", delay: 0, dur: 6 },
  { icon: "🐍", x: "85%", y: "15%", delay: 1.2, dur: 7 },
  { icon: "☕", x: "75%", y: "70%", delay: 0.5, dur: 5.5 },
  { icon: "🦀", x: "15%", y: "75%", delay: 2, dur: 8 },
  { icon: "🚀", x: "50%", y: "80%", delay: 0.8, dur: 6.5 },
  { icon: "⚡", x: "90%", y: "45%", delay: 1.5, dur: 7.5 },
];

const stats = [
  { value: "50+", label: "Languages" },
  { value: "10K+", label: "Challenges" },
  { value: "AI", label: "Powered" },
  { value: "∞", label: "Possibilities" },
];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Animated orbs */}
      <div className={styles.orbContainer}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Floating language icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={styles.floatingIcon}
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          <span>Now in Early Access — Join the Revolution</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          The Complete
          <br />
          <span className="gradient-text">Developer Ecosystem</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Learn, Practice, Build, Collaborate, Showcase &amp; Get Hired — all on one
          AI-powered platform. No more juggling between disconnected tools.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <a href="#" className="btn btn--primary btn--large">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Start Building Free
          </a>
          <a href="#features" className="btn btn--secondary btn--large">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Watch Demo
          </a>
        </motion.div>

        {/* Code Preview Window */}
        <motion.div
          className={styles.codePreview}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>codeverse-ai.ts</span>
              <div className={styles.windowActions}>
                <span className={styles.windowTab}>main.py</span>
                <span className={`${styles.windowTab} ${styles.active}`}>codeverse-ai.ts</span>
              </div>
            </div>
            <div className={styles.codeBody}>
              <pre className="mono">
                <code>
                  <span className={styles.lineNum}> 1</span>
                  <span className={styles.keyword}>import</span>
                  {" { "}
                  <span className={styles.type}>CodeVerse</span>
                  {", "}
                  <span className={styles.type}>AITutor</span>
                  {" } "}
                  <span className={styles.keyword}>from</span>
                  {" "}
                  <span className={styles.string}>&quot;@codeverse/sdk&quot;</span>
                  {"\n"}
                  <span className={styles.lineNum}> 2</span>{"\n"}
                  <span className={styles.lineNum}> 3</span>
                  <span className={styles.keyword}>const</span>
                  {" "}
                  <span className={styles.variable}>journey</span>
                  {" = "}
                  <span className={styles.keyword}>await</span>
                  {" "}
                  <span className={styles.type}>CodeVerse</span>
                  {"."}
                  <span className={styles.func}>createJourney</span>
                  {"({"}{"\n"}
                  <span className={styles.lineNum}> 4</span>
                  {"  "}
                  <span className={styles.prop}>path</span>
                  {": "}
                  <span className={styles.string}>&quot;fullstack-developer&quot;</span>
                  {","}{"\n"}
                  <span className={styles.lineNum}> 5</span>
                  {"  "}
                  <span className={styles.prop}>ai</span>
                  {": "}
                  <span className={styles.keyword}>true</span>
                  {","}{"\n"}
                  <span className={styles.lineNum}> 6</span>
                  {"  "}
                  <span className={styles.prop}>mentor</span>
                  {": "}
                  <span className={styles.keyword}>new</span>
                  {" "}
                  <span className={styles.type}>AITutor</span>
                  {"({ "}
                  <span className={styles.prop}>level</span>
                  {": "}
                  <span className={styles.string}>&quot;senior&quot;</span>
                  {" }),"}{"\n"}
                  <span className={styles.lineNum}> 7</span>
                  {"});"}{"\n"}
                  <span className={styles.lineNum}> 8</span>{"\n"}
                  <span className={styles.lineNum}> 9</span>
                  <span className={styles.comment}>{"// Your AI mentor is ready 🚀"}</span>{"\n"}
                  <span className={styles.lineNum}>10</span>
                  <span className={styles.keyword}>await</span>
                  {" "}
                  <span className={styles.variable}>journey</span>
                  {"."}
                  <span className={styles.func}>start</span>
                  {"();"}
                  <span className={styles.cursor}>|</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Glow effects around code */}
          <div className={styles.codeGlow} />
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
