import { Controller, Get, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@ApiTags("dashboard")
@Controller("dashboard")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("stats")
  @ApiOperation({ summary: "Get dashboard statistics" })
  async getStats(@CurrentUser("id") userId: string) {
    const data = await this.dashboardService.getStats(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get("recent-activity")
  @ApiOperation({ summary: "Get recent activity feed" })
  async getRecentActivity(
    @CurrentUser("id") userId: string,
    @Query("limit") limit?: number,
  ) {
    const data = await this.dashboardService.getRecentActivity(
      userId,
      limit || 10,
    );
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get("recommendations")
  @ApiOperation({ summary: "Get personalized recommendations" })
  async getRecommendations(@CurrentUser("id") userId: string) {
    const data = await this.dashboardService.getRecommendations(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
