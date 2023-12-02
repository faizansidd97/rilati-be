import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, MaxLength, isNotEmpty } from "class-validator";

export class CreateUniversityDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    uni_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    link: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    category_id: string[];
}


export class FilterUniversityDto {

    @ApiProperty({ required: false, description: ' filter by name' })
    @IsOptional()
    name?: string;

}