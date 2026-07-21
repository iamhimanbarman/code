import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatar: true,
        role: true,
        provider: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        xp: true,
        level: true,
        streak: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        xp: true,
        level: true,
        streak: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);

    const [stats, skills] = await Promise.all([
      this.getUserStats(userId),
      this.getUserSkills(userId),
    ]);

    return { ...user, stats, skills };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getUserStats(userId: string) {
    const [
      problemsSolved,
      coursesCompleted,
      enrollments,
      submissions,
    ] = await Promise.all([
      this.prisma.submission.count({
        where: { userId, status: "ACCEPTED" },
      }),
      this.prisma.enrollment.count({
        where: { userId, completedAt: { not: null } },
      }),
      this.prisma.enrollment.count({
        where: { userId },
      }),
      this.prisma.submission.count({
        where: { userId },
      }),
    ]);

    return {
      problemsSolved,
      coursesCompleted,
      coursesEnrolled: enrollments,
      totalSubmissions: submissions,
      projectsBuilt: 0, // placeholder
      contributions: 0, // placeholder
    };
  }

  async getUserSkills(userId: string) {
    return this.prisma.userSkill.findMany({
      where: { userId },
      orderBy: { xp: "desc" },
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
      },
    });

    return users.map((user, index) => ({
      rank: index + 1,
      ...user,
    }));
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.passwordHash) {
      const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new BadRequestException("Incorrect current password");
      }
    }

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashedNewPassword },
    });

    return { message: "Password updated successfully" };
  }

  async deleteAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: "Account deleted successfully" };
  }

  async getUserActivities(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      this.prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.activity.count({
        where: { userId },
      }),
    ]);

    const mappedActivities = activities.map((act) => {
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

    return {
      data: mappedActivities,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
