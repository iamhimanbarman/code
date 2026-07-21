import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login with email and password" })
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  async refresh(@Body() dto: RefreshTokenDto) {
    const data = await this.authService.refreshToken(dto.refreshToken);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout and invalidate tokens" })
  async logout(@CurrentUser("id") userId: string) {
    const data = await this.authService.logout(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user profile" })
  async me(@CurrentUser("id") userId: string) {
    const data = await this.authService.getMe(userId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
