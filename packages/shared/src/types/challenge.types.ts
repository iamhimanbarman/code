// ============================================
// CodeVerse Shared Types — Challenges & Problems
// ============================================

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  EXPERT = "EXPERT",
}

export enum SubmissionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  ACCEPTED = "ACCEPTED",
  WRONG_ANSWER = "WRONG_ANSWER",
  TIME_LIMIT = "TIME_LIMIT",
  MEMORY_LIMIT = "MEMORY_LIMIT",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  COMPILATION_ERROR = "COMPILATION_ERROR",
}

export interface IChallenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  examples: IChallengeExample[];
  starterCode: Record<string, string>; // language -> code
  solutionCount: number;
  acceptanceRate: number;
  xpReward: number;
  isPublished: boolean;
  createdAt: string;
}

export interface IChallengeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ISubmission {
  id: string;
  challengeId: string;
  userId: string;
  language: string;
  code: string;
  status: SubmissionStatus;
  runtime?: number; // ms
  memory?: number; // KB
  testCasesPassed: number;
  totalTestCases: number;
  output?: string;
  error?: string;
  createdAt: string;
}

export interface ILeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  streak: number;
}
