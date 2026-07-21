// ============================================
// CodeVerse API Services — Challenges
// ============================================

import api from "../api-client";
import type { ApiResponse, PaginatedResponse } from "@codeverse/shared";

interface ChallengeListItem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  tags: string[];
  solutionCount: number;
  acceptanceRate: number;
  xpReward: number;
}

interface ChallengeDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  constraints?: string;
  inputFormat?: string;
  outputFormat?: string;
  examples: { input: string; output: string; explanation?: string }[];
  starterCode: Record<string, string>;
  xpReward: number;
}

interface Submission {
  id: string;
  challengeId: string;
  language: string;
  status: string;
  runtime?: number;
  memory?: number;
  testCasesPassed: number;
  totalTestCases: number;
  error?: string;
  output?: string;
  createdAt: string;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  streak: number;
}

export const challengesService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    difficulty?: string;
    category?: string;
    search?: string;
  }) {
    return api.get<PaginatedResponse<ChallengeListItem>>("/challenges", params);
  },

  async getBySlug(slug: string) {
    return api.get<ApiResponse<ChallengeDetail>>(`/challenges/${slug}`);
  },

  async submit(challengeId: string, data: { language: string; code: string }) {
    return api.post<ApiResponse<Submission>>(
      `/challenges/${challengeId}/submit`,
      data,
    );
  },

  async run(challengeId: string, data: { language: string; code: string }) {
    return api.post<ApiResponse<any>>(
      `/challenges/${challengeId}/run`,
      data,
    );
  },

  async getSubmissions(challengeId: string) {
    return api.get<ApiResponse<Submission[]>>(
      `/challenges/${challengeId}/submissions`,
    );
  },

  async getLeaderboard(limit = 20) {
    return api.get<ApiResponse<LeaderboardEntry[]>>("/challenges/leaderboard", {
      limit,
    });
  },
};
