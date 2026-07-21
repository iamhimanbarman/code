import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { SubmitSolutionDto } from "./dto/submit-solution.dto";
import { CodeExecutor } from "./code-executor";

const LOCAL_CHALLENGES: Record<string, { id: string; slug: string; title: string; xpReward: number }> = {
  "concatenation-of-array": { id: "concatenation-of-array", slug: "concatenation-of-array", title: "Concatenation of Array", xpReward: 50 },
  "two-sum": { id: "two-sum", slug: "two-sum", title: "Two Sum", xpReward: 50 },
  "valid-parentheses": { id: "valid-parentheses", slug: "valid-parentheses", title: "Valid Parentheses", xpReward: 50 },
  "merge-two-sorted-lists": { id: "merge-two-sorted-lists", slug: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", xpReward: 50 },
  "longest-substring-no-repeat": { id: "longest-substring-no-repeat", slug: "longest-substring-no-repeat", title: "Longest Substring Without Repeating Characters", xpReward: 50 },
  "reverse-linked-list": { id: "reverse-linked-list", slug: "reverse-linked-list", title: "Reverse Linked List", xpReward: 50 }
};

@Injectable()
export class ChallengesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    difficulty?: string;
    category?: string;
    search?: string;
  }) {
    const { page = 1, limit = 20, difficulty, category, search } = params;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };
    if (difficulty) where.difficulty = difficulty;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    try {
      const [challenges, total] = await Promise.all([
        this.prisma.challenge.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            category: true,
            tags: true,
            solutionCount: true,
            acceptanceRate: true,
            xpReward: true,
          },
        }),
        this.prisma.challenge.count({ where }),
      ]);

      const mappedChallenges = challenges.map(c => {
        let parsedTags = [];
        try {
          parsedTags = typeof c.tags === "string" ? JSON.parse(c.tags) : c.tags;
        } catch (e) {
          parsedTags = [];
        }
        return { ...c, tags: parsedTags };
      });

      return {
        data: mappedChallenges,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (e) {
      // Fallback to local challenges if DB is offline
      const localList = Object.values(LOCAL_CHALLENGES);
      return {
        data: localList,
        meta: {
          page: 1,
          limit: 50,
          total: localList.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        }
      };
    }
  }

  async findBySlug(slug: string) {
    try {
      const challenge = await this.prisma.challenge.findUnique({
        where: { slug },
      });
      if (challenge) {
        // Don't expose test cases
        const { testCases, tags, examples, starterCode, ...rest } = challenge as Record<string, any>;
        
        let parsedTags = [];
        try {
          parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
        } catch (e) {
          parsedTags = [];
        }

        let parsedExamples = [];
        try {
          parsedExamples = typeof examples === "string" ? JSON.parse(examples) : examples;
        } catch (e) {
          parsedExamples = [];
        }

        let parsedStarterCode = {};
        try {
          parsedStarterCode = typeof starterCode === "string" ? JSON.parse(starterCode) : starterCode;
        } catch (e) {
          parsedStarterCode = {};
        }

        return {
          ...rest,
          tags: parsedTags,
          examples: parsedExamples,
          starterCode: parsedStarterCode,
        };
      }
    } catch (error) {
      // ignore and use fallback below
    }

    const fallback = Object.values(LOCAL_CHALLENGES).find(c => c.slug === slug);
    if (!fallback) {
      throw new NotFoundException("Challenge not found");
    }
    return fallback;
  }

  async submitSolution(
    userId: string,
    challengeId: string,
    dto: SubmitSolutionDto,
  ) {
    let challenge;
    try {
      challenge = await this.prisma.challenge.findUnique({
        where: { id: challengeId },
      });
    } catch (e) {
      console.warn("DB offline, using local fallback");
    }

    if (!challenge) {
      challenge = Object.values(LOCAL_CHALLENGES).find(c => c.id === challengeId || c.slug === challengeId);
    }

    if (!challenge) {
      throw new NotFoundException("Challenge not found");
    }

    // Evaluate using CodeExecutor
    const result = await CodeExecutor.execute(challenge.slug, dto.language, dto.code);

    const prismaStatus = result.status === "TIME_LIMIT_EXCEEDED" ? "TIME_LIMIT" : result.status;

    let updatedSubmission;
    try {
      const submission = await this.prisma.submission.create({
        data: {
          challengeId,
          userId,
          language: dto.language,
          code: dto.code,
          status: "PENDING",
          totalTestCases: result.total,
        },
      });

      updatedSubmission = await this.prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: prismaStatus as any,
          testCasesPassed: result.passed,
          totalTestCases: result.total,
          runtime: result.runtime,
          memory: Math.round(result.memory / 1024), // Convert to KB
          error: result.error || null,
        },
      });

      // Update challenge stats
      await this.prisma.challenge.update({
        where: { id: challengeId },
        data: { solutionCount: { increment: 1 } },
      }).catch(() => {});

      // Award XP
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: challenge.xpReward } },
      }).catch(() => {});

    } catch (e) {
      // If DB is offline, return simulated successful submission object
      updatedSubmission = {
        id: "offline-" + Math.random().toString(36).substring(2, 11),
        challengeId,
        userId,
        language: dto.language,
        code: dto.code,
        status: prismaStatus,
        runtime: result.runtime,
        memory: Math.round(result.memory / 1024),
        testCasesPassed: result.passed,
        totalTestCases: result.total,
        error: result.error || null,
        createdAt: new Date(),
      };
    }

    return updatedSubmission;
  }

  async runSolution(
    challengeId: string,
    dto: SubmitSolutionDto,
  ) {
    let challenge;
    try {
      challenge = await this.prisma.challenge.findUnique({
        where: { id: challengeId },
      });
    } catch (e) {
      console.warn("DB offline, using local fallback");
    }

    if (!challenge) {
      challenge = Object.values(LOCAL_CHALLENGES).find(c => c.id === challengeId || c.slug === challengeId);
    }

    if (!challenge) {
      throw new NotFoundException("Challenge not found");
    }

    const result = await CodeExecutor.execute(challenge.slug, dto.language, dto.code);
    return result;
  }

  async getSubmissions(userId: string, challengeId: string) {
    return this.prisma.submission.findMany({
      where: { userId, challengeId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  async getLeaderboard(limit = 20) {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
      orderBy: { xp: "desc" },
      take: limit,
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        xp: true,
        level: true,
        streak: true,
        _count: {
          select: {
            submissions: { where: { status: "ACCEPTED" } },
          },
        },
      },
    });

    return users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      score: user.xp,
      problemsSolved: user._count.submissions,
      streak: user.streak,
    }));
  }
}
