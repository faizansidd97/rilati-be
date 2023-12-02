import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
    attributes: {
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        details: Object;
        role: Object;
        subject: Object;
        industry: Object;
        userPermissions?: Array<Object>;
    };
    id: number;
}


export class exampleJsonObjectForService {
    
    services :[{

        name: string,
        rate:number
    },
    {
        name: string,
        rate:number
    }]
}

  
