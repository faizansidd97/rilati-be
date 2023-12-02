import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, IsOptional, IsEmail, isEnum, IsEnum, IsBoolean } from "class-validator";
import { EducationStageEnum, MaritalStatusEnum, MyAtarEnum, PersonaTraitEnum, SkillsConfident, StartWorkingEnum } from "../auth/auth-role.enum";
import { RoleType } from "src/utilities/constant";

export class RegisterDto {

    @ApiProperty()
    @IsOptional()
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

    @ApiProperty({ default: "test@twa.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    @MaxLength(255)
    phone: string;

    @ApiProperty({
        example: Object.keys(RoleType),
        enum: RoleType,
        default: RoleType.USER
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
    
    @ApiProperty()
    @IsOptional()
    confident_skills: string[];
   
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