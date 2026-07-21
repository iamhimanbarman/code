import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { ChallengesModule } from "./modules/challenges/challenges.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { HealthModule } from "./modules/health/health.module";
import { AiModule } from "./modules/ai/ai.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 10,
      },
      {
        name: "long",
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    CoursesModule,
    ChallengesModule,
    DashboardModule,
    HealthModule,
    AiModule,
  ],
})
export class AppModule {}
