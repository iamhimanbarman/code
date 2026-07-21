import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "developer@codeverse.dev" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "devmaster" })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: "Username can only contain letters, numbers, underscores, and hyphens",
  })
  username: string;

  @ApiProperty({ example: "SecureP@ss123" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({ example: "Dev Master" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  displayName: string;
}
