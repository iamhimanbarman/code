import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, level: true, streak: true },
    });

    const [
      problemsSolved,
      coursesEnrolled,
      coursesCompleted,
      totalSubmissions,
    ] = await Promise.all([
      this.prisma.submission.count({
        where: { userId, status: "ACCEPTED" },
      }),
      this.prisma.enrollment.count({ where: { userId } }),
      this.prisma.enrollment.count({
        where: { userId, completedAt: { not: null } },
      }),
      this.prisma.submission.count({ where: { userId } }),
    ]);

    return {
      xp: user?.xp || 0,
      level: user?.level || 1,
      streak: user?.streak || 0,
      problemsSolved,
      coursesEnrolled,
      coursesCompleted,
      totalSubmissions,
    };
  }

  async getRecentActivity(userId: string, limit = 10) {
    const activities = await this.prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return activities.map(act => {
      let parsedMeta = null;
      if (act.metadata && typeof act.metadata === "string") {
        try {
          parsedMeta = JSON.parse(act.metadata);
        } catch (e) {
          parsedMeta = act.metadata;
        }
      } else {
        parsedMeta = act.metadata;
      }
      return { ...act, metadata: parsedMeta };
    });
  }

  async getRecommendations(userId: string) {
    // Get user's skills to recommend courses
    const skills = await this.prisma.userSkill.findMany({
      where: { userId },
      orderBy: { xp: "asc" },
      take: 3,
    });

    // Recommend courses user hasn't enrolled in
    const enrolledCourseIds = await this.prisma.enrollment.findMany({
      where: { userId },
      select: { courseId: true },
    });

    const courses = await this.prisma.course.findMany({
      where: {
        isPublished: true,
        id: { notIn: enrolledCourseIds.map((e) => e.courseId) },
      },
      take: 5,
      orderBy: { enrolledCount: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        level: true,
        category: true,
        enrolledCount: true,
        rating: true,
      },
    });

    // Recommend challenges
    const solvedChallengeIds = await this.prisma.submission.findMany({
      where: { userId, status: "ACCEPTED" },
      select: { challengeId: true },
      distinct: ["challengeId"],
    });

    const challenges = await this.prisma.challenge.findMany({
      where: {
        isPublished: true,
        id: { notIn: solvedChallengeIds.map((s) => s.challengeId) },
      },
      take: 5,
      orderBy: { solutionCount: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        category: true,
        xpReward: true,
      },
    });

    return {
      weakSkills: skills,
      recommendedCourses: courses,
      recommendedChallenges: challenges,
    };
  }
}
