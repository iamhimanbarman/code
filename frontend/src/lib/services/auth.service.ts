// ============================================
// CodeVerse API Services — Auth
// ============================================

import api from "../api-client";
import type { ApiResponse } from "@codeverse/shared";

interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: string;
}

interface AuthTokens {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(data: {
    email: string;
    username: string;
    password: string;
    displayName: string;
  }) {
    const response = await api.post<ApiResponse<AuthTokens>>(
      "/auth/register",
      data,
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post<ApiResponse<AuthTokens>>(
      "/auth/login",
      data,
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await api.post<ApiResponse<AuthTokens>>(
      "/auth/refresh",
      { refreshToken },
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  async getMe() {
    const response = await api.get<ApiResponse<AuthUser>>("/auth/me");
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  },
};
