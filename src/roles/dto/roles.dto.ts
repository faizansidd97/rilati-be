import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  Equals,
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { RoleType } from "src/utilities/constant";

export class CreateRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "type must be user or employee",
    example: Object.keys(RoleType),
    enum: RoleType,
  })
  @IsNotEmpty()
  @IsEnum(RoleType)
  type: RoleType;

}

export class RoleUpdateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "type must be user or employee",
  })
  @IsOptional()
  @IsEnum(RoleType)
  type: RoleType;

}

export class FilterRoleDto {
  @ApiProperty({
    required: false,
    description: "Role filter by type",
    enum: [RoleType],
  })
  @IsOptional()
  @IsEnum(RoleType)
  type?: RoleType;

}

export class ResponseRolesDto {
  attributes: {
    name: string;
    type: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}
