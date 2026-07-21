// ============================================
// CodeVerse API Services — Dashboard
// ============================================

import api from "../api-client";
import type { ApiResponse } from "@codeverse/shared";

interface DashboardStats {
  xp: number;
  level: number;
  streak: number;
  problemsSolved: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalSubmissions: number;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

interface Recommendations {
  weakSkills: { name: string; level: number; xp: number }[];
  recommendedCourses: {
    id: string;
    title: string;
    slug: string;
    level: string;
    category: string;
  }[];
  recommendedChallenges: {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    xpReward: number;
  }[];
}

export const dashboardService = {
  async getStats() {
    return api.get<ApiResponse<DashboardStats>>("/dashboard/stats");
  },

  async getRecentActivity(limit = 10) {
    return api.get<ApiResponse<Activity[]>>("/dashboard/recent-activity", {
      limit,
    });
  },

  async getRecommendations() {
    return api.get<ApiResponse<Recommendations>>("/dashboard/recommendations");
  },
};
