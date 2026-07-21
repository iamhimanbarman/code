"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Map, BookOpen, Target, Code } from "lucide-react";
import styles from "./Navbar.module.css";

const JOURNEY_DROPDOWN = [
  { label: "Learning Roadmaps", href: "/journey/roadmaps", icon: Map },
  { label: "Documentation & Guides", href: "/journey/docs", icon: BookOpen },
  { label: "Practice Tracks", href: "/journey/tracks", icon: Target },
  { label: "Code Playground", href: "/playground", icon: Code },
];

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Challenges", href: "/challenges" },
  { label: "Journey", href: "/journey", hasDropdown: true },
  { label: "Architecture", href: "/architecture" },
  { label: "AI Engine", href: "/#ai-engine" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M4 8L14 2L24 8V20L14 26L4 20V8Z"
                  stroke="url(#logo-grad)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10 12L13 15L18 10"
                  stroke="url(#logo-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="logo-grad" x1="4" y1="2" x2="24" y2="26">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className={styles.logoText}>
              Code<span className={styles.logoAccent}>Verse</span>
            </span>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className={styles.dropdownWrapper}
                  ref={dropdownRef}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                    <svg
                      className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.dropdownArrow} />
                        <div className={styles.dropdownGrid}>
                          {JOURNEY_DROPDOWN.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={styles.dropdownItem}
                              onClick={() => setDropdownOpen(false)}
                            >
                              <item.icon className={styles.dropdownIcon} />
                              <span className={styles.dropdownLabel}>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                        <div className={styles.dropdownFooter}>
                          <Link
                            href="/journey"
                            className={styles.dropdownFooterLink}
                            onClick={() => setDropdownOpen(false)}
                          >
                            View full learning hub →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className={styles.actions}>
            <Link href="/login" className={styles.loginBtn}>
              Sign In
            </Link>
            <Link href="/register" className={`btn btn--primary btn--small ${styles.ctaBtn}`}>
              Get Started Free
            </Link>
          </div>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.active : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className={styles.mobileInner}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileHeader}>
                <span className={styles.mobileTitle}>Menu</span>
                <button
                  className={styles.mobileCloseBtn}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className={styles.mobileSubLinks}>
                      {JOURNEY_DROPDOWN.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          <sub.icon className={styles.mobileSubIcon} /> {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className={styles.mobileActions}>
                <Link href="/login" className={styles.loginBtn} onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/register" className="btn btn--primary" onClick={() => setMobileOpen(false)}>
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
