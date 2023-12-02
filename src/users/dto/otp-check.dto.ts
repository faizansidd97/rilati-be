import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, ValidateNested, IsNotEmpty } from "class-validator";

export class OtpCheckApiDto {
    @IsNotEmpty()
    @ApiProperty()
    code: number;
  }