import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";


export class ResetPasswordPostDataDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  password: string;
}
export class ResetPasswordApiDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  code: number;
}

export class ChangePasswordApiDto {
  @IsString()
  @ApiProperty()
  current_password: string;

  @IsString()
  @ApiProperty()
  new_password: string;

}

export class AuthChangePasswordApiDto {
  @IsString()
  @ApiProperty()
  old_password: string;

  @IsString()
  @ApiProperty()
  new_password: string;

  @IsString()
  @ApiProperty()
  confirm_password: string;

}