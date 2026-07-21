import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user profile with stats" })
  async getMyProfile(@CurrentUser("id") userId: string) {
    const data = await this.usersService.getProfile(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Put("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current user profile" })
  async updateProfile(
    @CurrentUser("id") userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    const data = await this.usersService.updateProfile(userId, dto);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get("leaderboard")
  @ApiOperation({ summary: "Get top users leaderboard" })
  async getLeaderboard(@Query("limit") limit?: number) {
    const data = await this.usersService.getLeaderboard(limit || 20);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":username")
  @ApiOperation({ summary: "Get user public profile" })
  async getUserProfile(@Param("username") username: string) {
    const data = await this.usersService.findByUsername(username);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":id/stats")
  @ApiOperation({ summary: "Get user statistics" })
  async getUserStats(@Param("id") id: string) {
    const data = await this.usersService.getUserStats(id);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":id/skills")
  @ApiOperation({ summary: "Get user skills" })
  async getUserSkills(@Param("id") id: string) {
    const data = await this.usersService.getUserSkills(id);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Put("me/password")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change current user password" })
  async changePassword(
    @CurrentUser("id") userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    const data = await this.usersService.changePassword(userId, dto);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Delete("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete current user account" })
  async deleteAccount(@CurrentUser("id") userId: string) {
    const data = await this.usersService.deleteAccount(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get("me/activities")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user activity feed" })
  async getMyActivities(
    @CurrentUser("id") userId: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    const data = await this.usersService.getUserActivities(userId, page || 1, limit || 10);
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
