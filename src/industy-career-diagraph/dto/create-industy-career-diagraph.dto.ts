import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateIndustyCareerDiagraphDto {
    @ApiProperty()
    @IsOptional()
    career_category_id: string;
    
    @ApiProperty()
    @IsOptional()
    industry_id: string;
}
