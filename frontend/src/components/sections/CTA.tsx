"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={`section ${styles.cta}`}>
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />

          <div className={styles.content}>
            <h2 className={styles.title}>
              Ready to Start Your
              <br />
              <span className="gradient-text">Developer Journey?</span>
            </h2>
            <p className={styles.subtitle}>
              Join thousands of developers who are already building their future
              with CodeVerse. Start for free — no credit card required.
            </p>

            <div className={styles.actions}>
              <a href="#" className="btn btn--primary btn--large">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Get Started Free
              </a>
              <a href="#" className="btn btn--secondary btn--large">
                Talk to Sales
              </a>
            </div>

            <div className={styles.trust}>
              <div className={styles.avatars}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.avatar}
                    style={{
                      background: [
                        "var(--gradient-primary)",
                        "var(--gradient-secondary)",
                        "var(--gradient-accent)",
                        "var(--gradient-success)",
                        "var(--gradient-primary)",
                      ][i],
                      zIndex: 5 - i,
                    }}
                  >
                    {["A", "S", "M", "K", "R"][i]}
                  </div>
                ))}
              </div>
              <p className={styles.trustText}>
                <strong>2,400+</strong> developers joined this month
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
