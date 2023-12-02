import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCareerLikeDto {
    @ApiProperty()
    @IsNotEmpty()
    career_id: number;
}
