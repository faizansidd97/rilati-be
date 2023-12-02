import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    code: string;
}

export class UpdateSubjectDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;
 
    @ApiProperty({ required: false })
    @IsOptional()
    code: string;
}
