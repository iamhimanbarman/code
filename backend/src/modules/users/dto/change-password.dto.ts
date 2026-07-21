import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ description: "The current password of the user" })
  @IsString()
  currentPassword!: string;

  @ApiProperty({ description: "The new password to set", minLength: 6 })
  @IsString()
  @MinLength(6, { message: "New password must be at least 6 characters long" })
  newPassword!: string;
}
