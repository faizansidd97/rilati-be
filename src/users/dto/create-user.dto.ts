import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import {
  EducationStageEnum,
  MaritalStatusEnum,
  MyAtarEnum,
  PersonaTraitEnum,
  StartWorkingEnum,
} from "../auth/auth-role.enum";
import { MaritalStatus } from "../auth/auth.controller";
import { RoleType } from "src/utilities/constant";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  phone: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(15)
  password: string;

  @ApiProperty({ default: "test@twa.com" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: Object.keys(RoleType),
    enum: RoleType,
    default: RoleType.USER,
  })
  @IsOptional()
  @IsEnum(RoleType)
  role_id: RoleType;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  address: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  city: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  state: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  country: string;

  @ApiProperty()
  @IsOptional()
  favorite_subject?: number[];

  @ApiProperty()
  @IsOptional()
  least_favorite_subject?: number[];

  @ApiProperty()
  @IsOptional()
  industries_interest?: number[];

  @ApiProperty()
  @IsOptional()
  least_industries_interest?: number[];

  @ApiProperty({
    example: Object.keys(MyAtarEnum),
    enum: MyAtarEnum,
    default: MyAtarEnum.BETWEEN_0_10,
  })
  @IsOptional()
  @IsEnum(MyAtarEnum)
  my_atar?: MyAtarEnum;

  @ApiProperty({
    example: Object.keys(PersonaTraitEnum),
    enum: PersonaTraitEnum,
    default: PersonaTraitEnum.EXTROVERT
    })
    @IsOptional()
    @IsEnum(PersonaTraitEnum)
    personal_trait: PersonaTraitEnum;

    @ApiProperty({
        example: Object.keys(EducationStageEnum),
        enum: EducationStageEnum,
        default: EducationStageEnum.HIGH_SCHOOL
    })
    @IsOptional()
    @IsEnum(EducationStageEnum)
    education_stage: EducationStageEnum;

  @ApiProperty({
    example: Object.keys(StartWorkingEnum),
    enum: StartWorkingEnum,
    default: StartWorkingEnum.NO,
  })
  @IsOptional()
  @IsEnum(StartWorkingEnum)
  start_working?: StartWorkingEnum;

  @ApiProperty({
    example: [true, false], // Set example to true for a boolean value
    default: false, // Set default to true if needed
  })
  @IsOptional()
  @IsBoolean()
  newsletter?: boolean;
}

export class CreateAdminDto {
  @ApiProperty({
    default: 1,
  })
  role_id: 0;

  @ApiProperty({
    default: "test@mailinator.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: "hphs86",
  })
  @IsString()
  password: string;
}

export class AddStateAuditorPermission {
  @ApiProperty()
  @IsNotEmpty()
  auditor_id: number;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  document_ids: number[];

  @ApiProperty()
  @IsOptional()
  document_type: number;
}

export class ImportUserDto {
  @ApiProperty()
  @IsNotEmpty()
  role_id: number;
}

export class FilterUserListingAuditor {
  @ApiProperty({ required: false, description: "User filter by first_name" })
  @IsOptional()
  first_name?: string;

  @ApiProperty({ required: false, description: "User filter by last_name" })
  @IsOptional()
  last_name?: string;

  @ApiProperty({ required: false, description: "User filter by email" })
  @IsOptional()
  email?: string;
}

export class UpdateStatusAndEnvelopeDto {
  @ApiProperty({ required: true })
  @IsOptional()
  envelope_id: string;
}
