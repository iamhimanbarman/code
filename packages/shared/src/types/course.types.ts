// ============================================
// CodeVerse Shared Types — Course & Learning
// ============================================

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum ContentType {
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  INTERACTIVE = "INTERACTIVE",
  QUIZ = "QUIZ",
  PROJECT = "PROJECT",
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  level: CourseLevel;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  duration: number; // minutes
  lessonsCount: number;
  enrolledCount: number;
  rating: number;
  isPublished: boolean;
  isFree: boolean;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ILesson {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  content: string;
  contentType: ContentType;
  order: number;
  duration: number; // minutes
  isPublished: boolean;
  createdAt: string;
}

export interface ICourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  totalLessons: number;
  progressPercent: number;
  lastAccessedAt: string;
  startedAt: string;
  completedAt?: string;
}

export interface IEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: ICourseProgress;
  enrolledAt: string;
}
