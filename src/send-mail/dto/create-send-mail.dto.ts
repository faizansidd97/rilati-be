import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { FlagEnum } from "../entities/send-mail.entity";

export class CreateSendMailDto {
   
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ enum: FlagEnum })
    @IsOptional()
    flag: typeof FlagEnum[keyof typeof FlagEnum];

}
