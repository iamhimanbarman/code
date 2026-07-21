import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SubmitSolutionDto {
  @ApiProperty({ example: "javascript" })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ example: "function twoSum(nums, target) { ... }" })
  @IsString()
  @IsNotEmpty()
  code: string;
}
