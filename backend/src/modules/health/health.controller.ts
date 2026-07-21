import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../../prisma/prisma.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Health check" })
  async check() {
    let dbStatus = "up";
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = "down";
    }

    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: {
        api: "up",
        database: dbStatus,
      },
    };
  }
}
