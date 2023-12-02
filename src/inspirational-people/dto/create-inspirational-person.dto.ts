import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateInspirationalPersonDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    inspirational_id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    occupation: string;

    @ApiProperty({ required: false })
    @IsOptional()
    education: string;

    @ApiProperty({ required: false })
    @IsOptional()
    career_path: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    image: string;
}

export enum SortByEntity {
    NAME = "NAME",
    OCCUPATION = "OCCUPATION",
  }
  export enum SortByType {
    ASC = "ASC",
    DESC = "DESC",
  }

export class FilterOrderBy {
@ApiProperty({
    enum: SortByEntity,
    required: false,
    default: SortByEntity.NAME,
    example: Object.values(SortByEntity),
  })
  @IsOptional()
  @IsEnum(SortByEntity)
  sort_by?: SortByEntity;

  @ApiProperty({
    enum: SortByType,
    required: false,
    default: SortByType.DESC,
    example: Object.values(SortByType),
  })
  @IsOptional()
  @IsEnum(SortByType)
  sort?: SortByType;

}