import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateSubjectCareerDiagraphDto {

    @ApiProperty()
    @IsOptional()
    career_category_id: string;
    
    @ApiProperty()
    @IsOptional()
    subject_id: string;
}
