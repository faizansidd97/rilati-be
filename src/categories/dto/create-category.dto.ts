import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { CategoryType } from "src/utilities/constant";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({
        required: false,
        description: "Category filter by type",
        enum: [CategoryType],
    })
    @IsNotEmpty()
    @IsEnum(CategoryType)
    type: CategoryType;
}


export class FilterCategoryDto {

    @ApiProperty({ required: false, description: ' filter by name' })
    @IsOptional()
    name?: string;

    @ApiProperty({
        required: false,
        description: "Category filter by type",
        enum: CategoryType,
    })
    @IsOptional()
    @IsEnum(CategoryType)
    type?: CategoryType;

}