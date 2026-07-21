import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ChallengesService } from "./challenges.service";
import { SubmitSolutionDto } from "./dto/submit-solution.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@ApiTags("challenges")
@Controller("challenges")
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @ApiOperation({ summary: "List coding challenges" })
  async findAll(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("difficulty") difficulty?: string,
    @Query("category") category?: string,
    @Query("search") search?: string,
  ) {
    const result = await this.challengesService.findAll({
      page, limit, difficulty, category, search,
    });
    return { success: true, ...result, timestamp: new Date().toISOString() };
  }

  @Get("leaderboard")
  @ApiOperation({ summary: "Get challenge leaderboard" })
  async getLeaderboard(@Query("limit") limit?: number) {
    const data = await this.challengesService.getLeaderboard(limit || 20);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get challenge details" })
  async findBySlug(@Param("slug") slug: string) {
    const data = await this.challengesService.findBySlug(slug);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post(":id/submit")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Submit solution to a challenge" })
  async submitSolution(
    @CurrentUser("id") userId: string,
    @Param("id") challengeId: string,
    @Body() dto: SubmitSolutionDto,
  ) {
    const data = await this.challengesService.submitSolution(
      userId,
      challengeId,
      dto,
    );
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post(":id/run")
  @ApiOperation({ summary: "Run/test solution to a challenge" })
  async runSolution(
    @Param("id") challengeId: string,
    @Body() dto: SubmitSolutionDto,
  ) {
    const data = await this.challengesService.runSolution(
      challengeId,
      dto,
    );
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get(":id/submissions")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user submissions for a challenge" })
  async getSubmissions(
    @CurrentUser("id") userId: string,
    @Param("id") challengeId: string,
  ) {
    const data = await this.challengesService.getSubmissions(
      userId,
      challengeId,
    );
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
