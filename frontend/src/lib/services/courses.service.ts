// ============================================
// CodeVerse API Services — Courses
// ============================================

import api from "../api-client";
import type { ApiResponse, PaginatedResponse } from "@codeverse/shared";

interface CourseListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  level: string;
  category: string;
  tags: string[];
  duration: number;
  lessonsCount: number;
  enrolledCount: number;
  rating: number;
  isFree: boolean;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
}

interface CourseDetail extends CourseListItem {
  lessons: {
    id: string;
    title: string;
    slug: string;
    contentType: string;
    order: number;
    duration: number;
  }[];
}

export const coursesService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    search?: string;
  }) {
    return api.get<PaginatedResponse<CourseListItem>>("/courses", params);
  },

  async getBySlug(slug: string) {
    return api.get<ApiResponse<CourseDetail>>(`/courses/${slug}`);
  },

  async enroll(courseId: string) {
    return api.post(`/courses/${courseId}/enroll`);
  },

  async getProgress(courseId: string) {
    return api.get(`/courses/${courseId}/progress`);
  },

  async getMyEnrollments() {
    return api.get("/courses/my-enrollments");
  },
};
