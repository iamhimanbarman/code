import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "developer@codeverse.dev" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecureP@ss123" })
  @IsString()
  @MinLength(8)
  password: string;
}
