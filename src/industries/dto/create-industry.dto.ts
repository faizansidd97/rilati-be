import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateIndustryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    code: string;
}

export class UpdateIndustryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    code: string;
}
