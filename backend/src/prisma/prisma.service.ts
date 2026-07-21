import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("✅ Database connected successfully");
    } catch (error) {
      this.logger.warn(
        "⚠️ Database connection failed. API will start without DB. " +
        "Run PostgreSQL and update DATABASE_URL in .env",
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
