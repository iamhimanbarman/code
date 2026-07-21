"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usersService, type UserProfile } from "@/lib/services/users.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();

  // Tab State: 'edit' | 'stats' | 'skills' | 'activities'
  const [activeTab, setActiveTab] = useState<"edit" | "stats" | "skills" | "activities">("edit");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Edit fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [avatar, setAvatar] = useState("");

  // Activities State
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Delete Account State
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Predefined gorgeous premium developer avatars
  const avatars = [
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80", // Cyber Boy
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", // Cyber Girl
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", // Dev 3d avatar
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", // Dev glasses
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const prof = await usersService.getMyProfile();
        if (prof) {
          setProfile(prof);
          setDisplayName(prof.displayName || "");
          setBio(prof.bio || "");
          setLocation(prof.location || "");
          setWebsite(prof.website || "");
          setGithubUrl(prof.githubUrl || "");
          setLinkedinUrl(prof.linkedinUrl || "");
          setAvatar(prof.avatar || avatars[0]);
        }
      } catch (err: any) {
        console.error("Failed to load user profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === "activities" && isAuthenticated) {
      const loadActivities = async () => {
        setActivitiesLoading(true);
        try {
          const res = await usersService.getMyActivities(1, 20);
          if (res && res.success && res.data) {
            setActivities(res.data.data || []);
          }
        } catch (err) {
          console.error("Failed to load activities", err);
        } finally {
          setActivitiesLoading(false);
        }
      };
      loadActivities();
    }
  }, [activeTab, isAuthenticated]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage("");
    setPasswordError("");
    try {
      await usersService.changePassword({ currentPassword, newPassword });
      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || "Failed to change password. Check your current password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("ARE YOU ABSOLUTELY SURE? This will permanently delete your account, including all progress, XP, solved challenges, and settings. This action is irreversible!")) {
      return;
    }
    setDeleting(true);
    setDeleteError("");
    try {
      await usersService.deleteAccount();
      await logout();
      router.push("/");
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Failed to delete account.");
      setDeleting(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updated = await usersService.updateProfile({
        displayName,
        bio,
        location,
        website,
        githubUrl,
        linkedinUrl,
        avatar
      });

      if (updated) {
        setMessage("Profile updated successfully!");
        setProfile(prev => prev ? { ...prev, ...updated } : null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div style={loaderContainer}>
        <div style={spinnerStyle} />
        <p style={{ marginTop: "16px", color: "#94a3b8" }}>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div style={containerStyle}>
      <div style={glowLeft} />
      <div style={glowRight} />

      {/* Header Navigation */}
      <nav style={headerNav}>
        <Link href="/" style={logoLink}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path
              d="M4 8L14 2L24 8V20L14 26L4 20V8Z"
              stroke="url(#logo-grad-profile)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="logo-grad-profile" x1="4" y1="2" x2="24" y2="26">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontWeight: 700, fontSize: "18px" }}>CodeVerse</span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/challenges" style={navLinkStyle}>Challenges</Link>
          <button onClick={handleLogout} style={logoutBtnStyle}>Sign Out</button>
        </div>
      </nav>

      <div style={layoutGrid}>
        {/* Left Card: Sidebar info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={sidebarCard}
        >
          <div style={avatarSection}>
            <img
              src={avatar}
              alt={profile.displayName}
              style={avatarImgStyle}
            />
            <h2 style={sidebarName}>{profile.displayName}</h2>
            <p style={sidebarUsername}>@{profile.username}</p>
            <div style={roleBadgeStyle}>{profile.role}</div>
          </div>

          <div style={xpStatusSection}>
            <div style={xpHeader}>
              <span>Level {profile.level}</span>
              <span>{profile.xp} XP</span>
            </div>
            <div style={xpBarBg}>
              <div
                style={{
                  ...xpBarFill,
                  width: `${Math.min(100, (profile.xp / 1000) * 100)}%`,
                }}
              />
            </div>
            <p style={xpHintStyle}>Next level in {1000 - (profile.xp % 1000)} XP</p>
          </div>

          <div style={sidebarMetaList}>
            {profile.location && (
              <div style={metaItemStyle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div style={metaItemStyle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <a href={profile.website} target="_blank" rel="noopener noreferrer" style={metaLinkStyle}>{profile.website.replace(/^https?:\/\//, "")}</a>
              </div>
            )}
          </div>

          {/* Sidebar Tab Triggers */}
          <div style={tabTriggerList}>
            <button
              onClick={() => setActiveTab("edit")}
              style={{
                ...tabTriggerStyle,
                ...(activeTab === "edit" ? activeTabTriggerStyle : {}),
              }}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              style={{
                ...tabTriggerStyle,
                ...(activeTab === "stats" ? activeTabTriggerStyle : {}),
              }}
            >
              Developer Stats
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              style={{
                ...tabTriggerStyle,
                ...(activeTab === "skills" ? activeTabTriggerStyle : {}),
              }}
            >
              My Skills
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              style={{
                ...tabTriggerStyle,
                ...(activeTab === "activities" ? activeTabTriggerStyle : {}),
              }}
            >
              Activity Feed
            </button>
          </div>
        </motion.div>

        {/* Right Card: Tab Contents */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={contentCard}
        >
          {activeTab === "edit" && (
            <div>
              <h3 style={tabTitle}>Edit Profile Settings</h3>
              <p style={tabSubtitle}>Keep your developer profile details up to date</p>

              {message && <div style={successMessageStyle}>{message}</div>}
              {error && <div style={errorMessageStyle}>{error}</div>}

              {/* Avatar Selector */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Select Avatar</label>
                <div style={avatarSelectorGrid}>
                  {avatars.map((av, index) => (
                    <img
                      key={index}
                      src={av}
                      onClick={() => setAvatar(av)}
                      style={{
                        ...avatarSelectorImg,
                        border: avatar === av ? "2px solid #6366f1" : "2px solid transparent",
                        opacity: avatar === av ? 1 : 0.6,
                      }}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveProfile} style={formStyle}>
                <div style={inputRow}>
                  <div style={inputGroupHalf}>
                    <label style={labelStyle}>Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div style={inputGroupHalf}>
                    <label style={labelStyle}>Location</label>
                    <input
                      type="text"
                      value={location}
                      placeholder="e.g. San Francisco, CA"
                      onChange={(e) => setLocation(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>Bio / Pitch</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    style={textareaStyle}
                  />
                </div>

                <div style={inputRow}>
                  <div style={inputGroupHalf}>
                    <label style={labelStyle}>Personal Website</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      style={inputStyle}
                    />
                  </div>
                  <div style={inputGroupHalf}>
                    <label style={labelStyle}>GitHub Profile</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>LinkedIn URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={saveButtonStyle}
                >
                  {saving ? "Saving changes..." : "Save Profile Details"}
                </button>
              </form>

              {/* Change Password Section */}
              <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>Change Account Password</h4>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>Ensure your account is using a long, secure password</p>

                {passwordMessage && <div style={successMessageStyle}>{passwordMessage}</div>}
                {passwordError && <div style={errorMessageStyle}>{passwordError}</div>}

                <form onSubmit={handleChangePassword} style={formStyle}>
                  <div style={inputRow}>
                    <div style={inputGroupHalf}>
                      <label style={labelStyle}>Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div style={inputGroupHalf}>
                      <label style={labelStyle}>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={passwordSaving}
                    style={{ ...saveButtonStyle, background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "#fff" }}
                  >
                    {passwordSaving ? "Updating Password..." : "Update Password"}
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(239, 68, 68, 0.15)" }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#ef4444", marginBottom: "6px" }}>Danger Zone</h4>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>Permanently delete your account and all associated data.</p>

                {deleteError && <div style={errorMessageStyle}>{deleteError}</div>}

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    padding: "12px 24px",
                    fontSize: "14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {deleting ? "Deleting Account..." : "Delete Account"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h3 style={tabTitle}>Developer Statistics</h3>
              <p style={tabSubtitle}>Your achievements and metrics on CodeVerse</p>

              <div style={statsGrid}>
                <div style={statCard}>
                  <div style={statHeader}>Problems Solved</div>
                  <div style={statVal}>{profile.stats.problemsSolved}</div>
                </div>
                <div style={statCard}>
                  <div style={statHeader}>Streak Active</div>
                  <div style={statVal}>{profile.streak} Days</div>
                </div>
                <div style={statCard}>
                  <div style={statHeader}>Courses Completed</div>
                  <div style={statVal}>{profile.stats.coursesCompleted}</div>
                </div>
                <div style={statCard}>
                  <div style={statHeader}>Submissions Made</div>
                  <div style={statVal}>{profile.stats.totalSubmissions}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <h3 style={tabTitle}>Skill Proficiency</h3>
              <p style={tabSubtitle}>Earn XP by completing challenges in multiple languages</p>

              {profile.skills.length === 0 ? (
                <div style={noDataContainer}>
                  <p style={{ color: "#64748b" }}>No skill points earned yet. Solve challenges to gain proficiency points!</p>
                  <Link href="/challenges" style={ctaButtonInside}>Browse Challenges</Link>
                </div>
              ) : (
                <div style={skillsListStyle}>
                  {profile.skills.map((skill) => (
                    <div key={skill.id} style={skillRowStyle}>
                      <div style={skillHeaderRow}>
                        <span style={skillNameStyle}>{skill.name}</span>
                        <span style={skillLevelStyle}>Level {skill.level}</span>
                      </div>
                      <div style={skillBarBg}>
                        <div style={{ ...skillBarFill, width: `${(skill.xp / skill.maxXp) * 100}%` }} />
                      </div>
                      <div style={skillXpText}>{skill.xp} / {skill.maxXp} XP</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "activities" && (
            <div>
              <h3 style={tabTitle}>Activity History</h3>
              <p style={tabSubtitle}>A timeline of your educational journey and code submissions on CodeVerse</p>

              {activitiesLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
                  <div style={spinnerStyle} />
                </div>
              ) : activities.length === 0 ? (
                <div style={noDataContainer}>
                  <p style={{ color: "#64748b" }}>No activities recorded yet. Complete lessons or solve challenges to build your history timeline!</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "16px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              padding: "2px 8px",
                              borderRadius: "20px",
                              background: act.type.includes("COMPLETED") || act.type.includes("ACCEPTED") ? "rgba(16, 185, 129, 0.1)" : "rgba(99, 102, 241, 0.1)",
                              color: act.type.includes("COMPLETED") || act.type.includes("ACCEPTED") ? "#34d399" : "#818cf8",
                            }}
                          >
                            {act.type.replace(/_/g, " ")}
                          </span>
                        </div>
                        <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{act.title}</h4>
                        {act.metadata && (
                          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                            {act.metadata.challengeTitle && `Challenge: ${act.metadata.challengeTitle}`}
                            {act.metadata.courseTitle && `Course: ${act.metadata.courseTitle}`}
                            {act.metadata.xpEarned && ` (+${act.metadata.xpEarned} XP)`}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {new Date(act.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Styles
const loaderContainer: React.CSSProperties = {
  minHeight: "100vh",
  background: "#08070b",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const spinnerStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  border: "3px solid rgba(99, 102, 241, 0.1)",
  borderTop: "3px solid #6366f1",
  borderRadius: "50%",
  boxSizing: "border-box",
};

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#08070b",
  color: "#fff",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  padding: "32px clamp(16px, 4vw, 80px)",
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
  background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 75%)",
  top: "10%",
  left: "5%",
  pointerEvents: "none",
};

const glowRight: React.CSSProperties = {
  position: "absolute",
  width: "350px",
  maxWidth: "80vw",
  height: "350px",
  maxHeight: "80vw",
  background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 75%)",
  bottom: "10%",
  right: "5%",
  pointerEvents: "none",
};

const headerNav: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
  paddingBottom: "16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  width: "100%",
};

const logoLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#fff",
  textDecoration: "none",
};

const navLinkStyle: React.CSSProperties = {
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
};

const logoutBtnStyle: React.CSSProperties = {
  background: "rgba(239, 68, 68, 0.1)",
  color: "#ef4444",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  padding: "6px 14px",
  fontSize: "13px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 500,
};

const layoutGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "32px",
  maxWidth: "1280px",
  margin: "0 auto",
};

const sidebarCard: React.CSSProperties = {
  background: "rgba(18, 17, 24, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "clamp(20px, 4vw, 30px)",
  alignSelf: "start",
};

const avatarSection: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "30px",
};

const avatarImgStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #6366f1",
  boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
  marginBottom: "16px",
};

const sidebarName: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "4px",
};

const sidebarUsername: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "12px",
};

const roleBadgeStyle: React.CSSProperties = {
  background: "rgba(99, 102, 241, 0.15)",
  color: "#818cf8",
  fontSize: "11px",
  fontWeight: 600,
  padding: "4px 10px",
  borderRadius: "20px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const xpStatusSection: React.CSSProperties = {
  marginBottom: "30px",
};

const xpHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "8px",
};

const xpBarBg: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "6px",
  height: "8px",
  overflow: "hidden",
  marginBottom: "6px",
};

const xpBarFill: React.CSSProperties = {
  background: "linear-gradient(to right, #6366f1, #a855f7)",
  height: "100%",
  borderRadius: "6px",
  transition: "width 0.4s ease",
};

const xpHintStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#64748b",
};

const sidebarMetaList: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  paddingTop: "20px",
  marginBottom: "30px",
};

const metaItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
  color: "#cbd5e1",
};

const metaLinkStyle: React.CSSProperties = {
  color: "#818cf8",
  textDecoration: "none",
};

const tabTriggerList: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  paddingTop: "20px",
};

const tabTriggerStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#94a3b8",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const activeTabTriggerStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  fontWeight: 600,
  borderLeft: "3px solid #6366f1",
  borderRadius: "0 10px 10px 0",
};

const contentCard: React.CSSProperties = {
  background: "rgba(18, 17, 24, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "clamp(20px, 4vw, 40px)",
};

const tabTitle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "6px",
  letterSpacing: "-0.5px",
};

const tabSubtitle: React.CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
  marginBottom: "30px",
};

const successMessageStyle: React.CSSProperties = {
  background: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.2)",
  color: "#34d399",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "13px",
  marginBottom: "24px",
};

const errorMessageStyle: React.CSSProperties = {
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#f87171",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "13px",
  marginBottom: "24px",
};

const avatarSelectorGrid: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "8px",
};

const avatarSelectorImg: React.CSSProperties = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  objectFit: "cover",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const inputRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const inputGroupHalf: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: "1 1 200px",
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
};

const textareaStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#fff",
  outline: "none",
  resize: "vertical",
  width: "100%",
  boxSizing: "border-box",
};

const saveButtonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  border: "none",
  borderRadius: "10px",
  padding: "14px 28px",
  fontSize: "15px",
  fontWeight: 600,
  color: "#fff",
  cursor: "pointer",
  alignSelf: "start",
  transition: "all 0.2s ease",
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
};

const statCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "24px",
};

const statHeader: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "8px",
};

const statVal: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#fff",
};

const noDataContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  textAlign: "center",
};

const ctaButtonInside: React.CSSProperties = {
  marginTop: "16px",
  background: "rgba(99, 102, 241, 0.1)",
  color: "#818cf8",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  padding: "10px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
};

const skillsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const skillRowStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "20px",
};

const skillHeaderRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const skillNameStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#fff",
};

const skillLevelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#818cf8",
  background: "rgba(99, 102, 241, 0.1)",
  padding: "2px 8px",
  borderRadius: "20px",
};

const skillBarBg: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "6px",
  height: "6px",
  overflow: "hidden",
  marginBottom: "6px",
};

const skillBarFill: React.CSSProperties = {
  background: "#6366f1",
  height: "100%",
  borderRadius: "6px",
};

const skillXpText: React.CSSProperties = {
  fontSize: "11px",
  color: "#64748b",
  textAlign: "right",
};
