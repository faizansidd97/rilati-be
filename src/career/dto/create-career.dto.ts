import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from "class-validator";
import {
  CareerAtarSortType,
  CareerSortType,
  CategoryType,
} from "src/utilities/constant";

export class CreateCareerDto {
  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  career_number: string;

  @ApiProperty()
  @IsOptional()
  average_salary: string;

  @ApiProperty()
  @IsOptional()
  average_salary_aud: string;

  @ApiProperty()
  @IsOptional()
  job_description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  categories: string[];

  @ApiProperty()
  @IsOptional()
  education_category: string[];

  @ApiProperty()
  @IsOptional()
  career_category: string;

  @ApiProperty()
  @IsOptional()
  student_intrest: string;

  @ApiProperty()
  @IsOptional()
  skills_transferable: string;

  @ApiProperty()
  @IsOptional()
  years_needed: string;

  @ApiProperty()
  @IsOptional()
  description_study: string;

  @ApiProperty()
  @IsOptional()
  admission_rank: string;

  @ApiProperty()
  @IsOptional()
  average_gpa: string;

  @ApiProperty()
  @IsOptional()
  internship_needed: string;

  @ApiProperty()
  @IsOptional()
  cost_course: number;

  @ApiProperty()
  @IsOptional()
  precision_work: string;

  @ApiProperty()
  @IsOptional()
  job_satisfaction: string;

  @ApiProperty()
  @IsOptional()
  job_stress: string;

  @ApiProperty()
  @IsOptional()
  work_hours: string;

  @ApiProperty()
  @IsOptional()
  work_life_balance: string;

  @ApiProperty()
  @IsOptional()
  scope_of_skill: string;

  @ApiProperty()
  @IsOptional()
  autonomy: string;

  @ApiProperty()
  @IsOptional()
  repetitive_tedious: string;

  @ApiProperty()
  @IsOptional()
  physical_stress: string;

  @ApiProperty()
  @IsOptional()
  mental_stress: string;

  @ApiProperty()
  @IsOptional()
  team_reliance: string;

  @ApiProperty()
  @IsOptional()
  status_in_company: string;

  @ApiProperty()
  @IsOptional()
  risk_to_health: string;

  @ApiProperty()
  @IsOptional()
  risk_to_life: string;

  @ApiProperty()
  @IsOptional()
  people_interaction: string;

  @ApiProperty()
  @IsOptional()
  job_help_people: string;

  @ApiProperty()
  @IsOptional()
  job_help_environment: string;

  @ApiProperty()
  @IsOptional()
  potential: string;

  @ApiProperty()
  @IsOptional()
  study_for_australia: string;

  @ApiProperty()
  @IsOptional()
  fastest_growing: string;

  @ApiProperty()
  @IsOptional()
  tags: string;

  @ApiProperty()
  @IsOptional()
  youtube: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  image: string;
}

export enum CountTypeEnum {
  LIKE_COUNT = "LIKE_COUNT",
  SHARE_COUNT = "SHARE_COUNT",
  VIEW_COUNT = "VIEW_COUNT",
}
export class UpdateCountDto {
  @ApiProperty({
    enum: CountTypeEnum,
    required: true,
    default: CountTypeEnum.SHARE_COUNT,
    example: Object.values(CountTypeEnum),
  })
  @IsNotEmpty()
  @MaxLength(255)
  @IsEnum(CountTypeEnum)
  count_type: CountTypeEnum;
}

export class FilterCareerDto {
  @ApiProperty({ required: false, description: " filter by title" })
  @IsOptional()
  title?: string;

  @ApiProperty({
    required: false,
    description: "send current user id to check Like|Unlike",
  })
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    required: false,
    description: "filter by Course Duration",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  years_needed?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by ATAR",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  atar?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Course Cost",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  course_cost?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Status in Company",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  status_in_company?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Scope of Skill",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  scope_of_skill?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Job help Environment",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  job_help_environment?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Job help People",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  job_help_people?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Work Life Balance",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  work_life_balance?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by Potential To Switch",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  potential?: CareerSortType;

  @ApiProperty({
    required: false,
    description: "filter by ASC DESC",
    enum: CareerSortType,
  })
  @IsOptional()
  @IsEnum(CareerSortType)
  sort_by?: CareerSortType;
  @ApiProperty({
    required: false,
    description: "filter by Category",
  })
  @IsOptional()
  categoryId?: number;
}
