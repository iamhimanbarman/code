import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    search?: string;
  }) {
    const { page = 1, limit = 20, category, level, search } = params;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;
    if (level) where.level = level;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: { id: true, username: true, displayName: true, avatar: true },
          },
        },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      data: courses,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async findBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatar: true },
        },
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            slug: true,
            contentType: true,
            order: true,
            duration: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException("Course not found");
    }

    return course;
  }

  async enroll(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException("Course not found");
    }

    const enrollment = await this.prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { lastAccessedAt: new Date() },
      create: { userId, courseId },
    });

    // Increment enrolled count
    await this.prisma.course.update({
      where: { id: courseId },
      data: { enrolledCount: { increment: 1 } },
    });

    return enrollment;
  }

  async getProgress(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      include: {
        completions: {
          select: { lessonId: true, completedAt: true },
        },
        course: {
          select: { lessonsCount: true },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException("Enrollment not found");
    }

    return {
      courseId,
      userId,
      completedLessons: enrollment.completions.map((c) => c.lessonId),
      totalLessons: enrollment.course.lessonsCount,
      progressPercent: enrollment.progressPercent,
      lastAccessedAt: enrollment.lastAccessedAt,
      enrolledAt: enrollment.enrolledAt,
      completedAt: enrollment.completedAt,
    };
  }

  async getMyEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            level: true,
            category: true,
            lessonsCount: true,
          },
        },
      },
      orderBy: { lastAccessedAt: "desc" },
    });
  }
}
