import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { CoursesService } from "./courses.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@ApiTags("courses")
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: "List all published courses" })
  async findAll(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("category") category?: string,
    @Query("level") level?: string,
    @Query("search") search?: string,
  ) {
    const result = await this.coursesService.findAll({
      page, limit, category, level, search,
    });
    return { success: true, ...result, timestamp: new Date().toISOString() };
  }

  @Get("my-enrollments")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user enrollments" })
  async getMyEnrollments(@CurrentUser("id") userId: string) {
    const data = await this.coursesService.getMyEnrollments(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get course details by slug" })
  async findBySlug(@Param("slug") slug: string) {
    const data = await this.coursesService.findBySlug(slug);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post(":id/enroll")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Enroll in a course" })
  async enroll(
    @CurrentUser("id") userId: string,
    @Param("id") courseId: string,
  ) {
    const data = await this.coursesService.enroll(userId, courseId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":id/progress")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get course progress" })
  async getProgress(
    @CurrentUser("id") userId: string,
    @Param("id") courseId: string,
  ) {
    const data = await this.coursesService.getProgress(userId, courseId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
