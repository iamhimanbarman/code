"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ email, username, displayName, password });
      router.push("/challenges");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Username or email might be taken."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={glowLeft} />
      <div style={glowRight} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={cardStyle}
      >
        <div style={logoContainer}>
          <Link href="/" style={logoLink}>
            <div style={logoIcon}>
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <path
                  d="M4 8L14 2L24 8V20L14 26L4 20V8Z"
                  stroke="url(#logo-grad-register)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M10 12L13 15L18 10"
                  stroke="url(#logo-grad-register)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="logo-grad-register" x1="4" y1="2" x2="24" y2="26">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span style={logoText}>
              Code<span style={logoAccent}>Verse</span>
            </span>
          </Link>
        </div>

        <h1 style={titleStyle}>Create your account</h1>
        <p style={subtitleStyle}>Join CodeVerse to master skills, build projects, and solve challenges</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputRow}>
            <div style={inputGroupHalf}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupHalf}>
              <label style={labelStyle}>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={submitButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {loading ? "Creating account..." : "Get Started Free"}
          </button>
        </form>

        <p style={footerTextStyle}>
          Already have an account?{" "}
          <Link href="/login" style={loginLinkStyle}>
            Sign in instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// Reuse layout style structure
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#08070b",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  padding: "16px",
  position: "relative",
  overflow: "hidden",
  width: "100%",
};

const glowLeft: React.CSSProperties = {
  position: "absolute",
  width: "350px",
  maxWidth: "80vw",
  height: "350px",
  maxHeight: "80vw",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
  top: "15%",
  left: "10%",
  pointerEvents: "none",
};

const glowRight: React.CSSProperties = {
  position: "absolute",
  width: "400px",
  maxWidth: "80vw",
  height: "400px",
  maxHeight: "80vw",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
  bottom: "15%",
  right: "10%",
  pointerEvents: "none",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(18, 17, 24, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "500px",
  padding: "clamp(24px, 5vw, 40px)",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
  zIndex: 2,
};

const logoContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
};

const logoLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
};

const logoIcon: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoText: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 800,
  color: "#fff",
  letterSpacing: "-0.5px",
};

const logoAccent: React.CSSProperties = {
  color: "#6366f1",
  background: "linear-gradient(to right, #6366f1, #a855f7)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "8px",
  letterSpacing: "-0.5px",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
  textAlign: "center",
  marginBottom: "32px",
  lineHeight: "1.5",
};

const errorStyle: React.CSSProperties = {
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#f87171",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "13px",
  marginBottom: "24px",
  lineHeight: "1.4",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
};

const inputGroupHalf: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: "1 1 180px",
};

const inputGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#cbd5e1",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#fff",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
};

const submitButtonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  border: "none",
  borderRadius: "10px",
  padding: "14px",
  fontSize: "15px",
  fontWeight: 600,
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  marginTop: "10px",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
  textAlign: "center",
  marginTop: "24px",
};

const loginLinkStyle: React.CSSProperties = {
  color: "#818cf8",
  fontWeight: 500,
  textDecoration: "none",
};
