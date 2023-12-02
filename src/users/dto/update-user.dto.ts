import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  ValidateNested,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  isDate,
  IsDateString,
  isEnum,
  isNotEmpty,
  IsBoolean,
} from "class-validator";
import { EducationStageEnum, MaritalStatusEnum, MyAtarEnum, PersonaTraitEnum, SkillsConfident, StartWorkingEnum } from "../auth/auth-role.enum";

export enum UserGuardianEnum {
  ADULT = "ADULT",
  MINOR = "MINOR",
  GUARDIANSHIP = "GUARDIANSHIP",
}

export class AttributesDtoClassUpdate {
  @ApiProperty({
    default: "test@mailinator.com",
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  last_name: string;

  @ApiProperty({
    default: 100,
  })
  @ApiProperty()
  role_id: number;
}

export class DataDtoClassUpdate {
  @ApiProperty({
    default: "users",
  })
  type: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AttributesDtoClassUpdate)
  attributes: AttributesDtoClassUpdate;

  @ApiProperty()
  id: number;
}

export class PatchUserDtoClassUpdate {
  @ApiProperty({
    enum: UserGuardianEnum,
    required: true,
    default: UserGuardianEnum.ADULT,
  })
  @IsNotEmpty()
  @MaxLength(255)
  @IsEnum(UserGuardianEnum)
  guardian_type: UserGuardianEnum;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  guardian_expiry: Date;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  guardian_name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  guardian_email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  guardian_contact: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  guardian_fax: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  guardian_address: string;
  
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  name: string;
  
  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  phone: string;

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
  email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  role_id: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  password: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  state: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  country: string;

  @ApiProperty({
    example: MaritalStatusEnum.MARRIED,
    enum: MaritalStatusEnum,
  })
  @IsOptional()
  @IsEnum(MaritalStatusEnum)
  marital_status: MaritalStatusEnum;

  @ApiProperty({ required: false, description: 'User status', enum: ['1', '0'] })
  @IsOptional()
  status: string;

  @ApiProperty({ required: false, description: 'User notification', enum: ['1', '0'] })
  @IsOptional()
  notification: string;

  @ApiProperty()
  @IsOptional()
  favorite_subject: number[];
  
  @ApiProperty()
  @IsOptional()
  least_favorite_subject: number[];
  
  @ApiProperty()
  @IsOptional()
  industries_interest: number[];
  
  @ApiProperty()
  @IsOptional()
  least_industries_interest: number[];

  @ApiProperty({
    example: Object.keys(MyAtarEnum),
    enum: MyAtarEnum,
    default: MyAtarEnum.BETWEEN_0_10
  })
    @IsOptional()
    @IsEnum(MyAtarEnum)
    my_atar: MyAtarEnum;

    // @ApiProperty({
    //     example: Object.keys(SkillsConfident),
    //     enum: SkillsConfident,
    //     default: SkillsConfident.COMMUNICATION
    // })
    // @IsOptional()
    // @IsEnum(SkillsConfident)
    // confident_skills: SkillsConfident;

    @ApiProperty({ required: false, description: "Send Confident Skills Array" })
    @IsOptional()
    confident_skills?: string[];

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
        default: StartWorkingEnum.NO
    })
    @IsOptional()
  @IsEnum(StartWorkingEnum)
  start_working: StartWorkingEnum;

  @ApiProperty({
  example: [true,false], // Set example to true for a boolean value
  default: false, // Set default to true if needed
  })
  @IsOptional()
  @IsBoolean()
  newsletter: boolean;

}

export class FilterAuditorUserTypeDto {
  @ApiProperty({ required: false, description: "Send User Id" })
  @IsOptional()
  user_id?: string;

}
