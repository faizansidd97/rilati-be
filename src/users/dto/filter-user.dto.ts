import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayUnique, IsEnum, IsOptional } from "class-validator";
import { RoleType } from "src/utilities/constant";

export class FilterUserDto {

    @ApiProperty({ required: false, description: 'User filter by status', enum: ['1', '0'] })
    @IsOptional()
    status?: string;

    @ApiProperty({ required: false, description: 'User filter by first_name' })
    @IsOptional()
    first_name?: string;

    @ApiProperty({ required: false, description: 'User filter by last_name' })
    @IsOptional()
    last_name?: string;

    @ApiProperty({ required: false, description: 'User filter by type', enum: RoleType })
    @IsOptional()
    @IsEnum(RoleType)
    type?: RoleType;

    @ApiProperty({ required: false, description: 'User filter by role_id' })
    @IsOptional()
    role_id?: string;

}

