import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {
    Equals,
    IsEmpty,
    IsNotEmpty,
    IsOptional,
    IsNotEmptyObject,
    IsString,
    IsUrl,
    MaxLength,
    ValidateIf,
    ValidateNested
} from 'class-validator';

export class CreateUserDetailDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    contact_type : string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    first_name : string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    last_name : string;
}


// export class ResponseDetailsDto {
//     attributes : {
//         organization_name: string;
//         contact_name: string;
//         work_email: string;
//         date_of_birth: string;
//         location_code: string;
//         ssn: string;
//         last_nursing_assessment: string;
//         waiver: string;
//         contract: string;
//         county: string;
//         care_id: string;
//         medicaid_id: string;
//         medicare_id: string;
//         service_cord: string;
//         ipc_starts: string;
//         ipc_ends: string;
//         icap_ends: string;
//         idrc_ends: string;
//         lon: string;
//         lcn: string;
//         include_reference: string;
//         pay_rate: string;
//         driver_license: string;
//         insurance: string;
//         insurance_expiry: string;
//         direct_deposit: string;
//         annual_training: string;
//         ein: string;
//         nurse_license: string;
//         created_at: Date;
//         updated_at: Date;
//     };
//     id : string;
// }


export class ResponseDetailsDto {
  attributes: {
        createdAt: Date;
        updatedAt: Date;
  };
  id: number;
}

