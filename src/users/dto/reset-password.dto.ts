import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, ValidateNested } from "class-validator";


export class ResetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDataDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ResetPasswordDto)
  data: ResetPasswordDto
}