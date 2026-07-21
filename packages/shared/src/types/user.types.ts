// ============================================
// CodeVerse Shared Types — User & Auth
// ============================================

export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
  RECRUITER = "RECRUITER",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  provider: AuthProvider;
  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  xp: number;
  level: number;
  streak: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProfile extends IUser {
  skills: ISkill[];
  stats: IUserStats;
}

export interface IUserStats {
  problemsSolved: number;
  projectsBuilt: number;
  coursesCompleted: number;
  contestsParticipated: number;
  contributions: number;
  rank: number;
}

export interface ISkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  xp: number;
  maxXp: number;
}

export enum SkillCategory {
  LANGUAGE = "LANGUAGE",
  FRAMEWORK = "FRAMEWORK",
  DATABASE = "DATABASE",
  DEVOPS = "DEVOPS",
  DSA = "DSA",
  SYSTEM_DESIGN = "SYSTEM_DESIGN",
}
