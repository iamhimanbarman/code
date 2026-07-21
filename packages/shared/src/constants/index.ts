// ============================================
// CodeVerse Shared Constants
// ============================================

export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    GOOGLE: "/auth/google",
    GITHUB: "/auth/github",
  },
  USERS: {
    BASE: "/users",
    PROFILE: (id: string) => `/users/${id}/profile`,
    STATS: (id: string) => `/users/${id}/stats`,
    SKILLS: (id: string) => `/users/${id}/skills`,
    UPDATE: "/users/me",
  },
  COURSES: {
    BASE: "/courses",
    DETAIL: (slug: string) => `/courses/${slug}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
    PROGRESS: (id: string) => `/courses/${id}/progress`,
    LESSONS: (courseId: string) => `/courses/${courseId}/lessons`,
    LESSON: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}`,
  },
  CHALLENGES: {
    BASE: "/challenges",
    DETAIL: (slug: string) => `/challenges/${slug}`,
    SUBMIT: (id: string) => `/challenges/${id}/submit`,
    SUBMISSIONS: (id: string) => `/challenges/${id}/submissions`,
    LEADERBOARD: "/challenges/leaderboard",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
    RECENT_ACTIVITY: "/dashboard/recent-activity",
    RECOMMENDATIONS: "/dashboard/recommendations",
  },
} as const;

export const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "csharp",
  "ruby",
  "php",
  "swift",
  "kotlin",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const XP_PER_LEVEL = 1000;
export const MAX_LEVEL = 100;

export const DIFFICULTY_XP = {
  EASY: 50,
  MEDIUM: 100,
  HARD: 200,
  EXPERT: 500,
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
