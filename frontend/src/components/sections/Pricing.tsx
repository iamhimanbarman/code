"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Pricing.module.css";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started and exploring the platform.",
    color: "#6366f1",
    popular: false,
    features: [
      "Learning Content & Tutorials",
      "Basic Coding Challenges",
      "Code Playground (5 languages)",
      "Community Forums",
      "Public Profile",
    ],
    cta: "Get Started Free",
    ctaStyle: "secondary",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious developers ready to accelerate their growth.",
    color: "#a855f7",
    popular: true,
    features: [
      "Everything in Free",
      "AI Mentor (Unlimited)",
      "All 50+ Languages",
      "Interview Simulator",
      "Advanced Analytics",
      "Priority Support",
      "Private Repositories",
      "Resume Builder",
    ],
    cta: "Start Pro Trial",
    ctaStyle: "primary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per org",
    description: "For teams, universities, and companies at scale.",
    color: "#f59e0b",
    popular: false,
    features: [
      "Everything in Pro",
      "Recruiter Dashboard",
      "University Partnerships",
      "Corporate Training",
      "Custom Assessments",
      "Dedicated Support",
      "SSO & Admin Controls",
      "API Access",
    ],
    cta: "Contact Sales",
    ctaStyle: "secondary",
  },
];

export default function Pricing() {
  return (
    <section className={`section ${styles.pricing}`} id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Pricing
          </div>
          <h2 className="section-title">
            Plans That Scale
            <br />
            <span className="gradient-text">With Your Growth</span>
          </h2>
          <p className="section-subtitle">
            Start for free and upgrade when you&apos;re ready. No hidden fees, no
            surprises. Cancel anytime.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${plan.popular ? styles.popular : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              <div className={styles.cardHeader}>
                <span
                  className={styles.planName}
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </span>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>/{plan.period}</span>
                </div>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={plan.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`btn ${plan.ctaStyle === "primary" ? "btn--primary" : "btn--secondary"} ${styles.planCta}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
