// ============================================
// CodeVerse API Services — Users & Profile
// ============================================

import api from "../api-client";
import type { ApiResponse } from "@codeverse/shared";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: string;
  provider: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  xp: number;
  level: number;
  streak: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  stats: {
    problemsSolved: number;
    coursesCompleted: number;
    coursesEnrolled: number;
    totalSubmissions: number;
    projectsBuilt: number;
    contributions: number;
  };
  skills: Array<{
    id: string;
    name: string;
    level: number;
    xp: number;
    maxXp: number;
  }>;
}

export const usersService = {
  async getMyProfile() {
    const response = await api.get<ApiResponse<UserProfile>>("/users/me");
    return response.data;
  },

  async updateProfile(data: {
    displayName?: string;
    bio?: string;
    location?: string;
    website?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    avatar?: string;
  }) {
    const response = await api.put<ApiResponse<UserProfile>>("/users/me", data);
    return response.data;
  },

  async getLeaderboard(limit?: number) {
    const response = await api.get<ApiResponse<any[]>>("/users/leaderboard", { limit });
    return response.data;
  },

  async getPublicProfile(username: string) {
    const response = await api.get<ApiResponse<any>>(`/users/${username}`);
    return response.data;
  },

  async changePassword(data: any) {
    const response = await api.put<ApiResponse<any>>("/users/me/password", data);
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete<ApiResponse<any>>("/users/me");
    return response.data;
  },

  async getMyActivities(page?: number, limit?: number) {
    const response = await api.get<ApiResponse<any>>("/users/me/activities", { page, limit });
    return response.data;
  }
};
