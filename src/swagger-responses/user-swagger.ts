import { ApiProperty } from "@nestjs/swagger";

export class ResponseDetailsBody {
  @ApiProperty()
  organizationName: string;
  @ApiProperty()
  contactName: string;
  @ApiProperty()
  worlEmail: string;
  @ApiProperty()
  dateOfBirth: string;
  @ApiProperty()
  locationCode: string;
  @ApiProperty()
  ssn: string;
  @ApiProperty()
  lastNursingAssessment: string;
  @ApiProperty()
  waiver: string;
  @ApiProperty()
  contract: string;
  @ApiProperty()
  county: string;
  @ApiProperty()
  careId: string;
  @ApiProperty()
  medicaidId: string;
  @ApiProperty()
  medicareId: string;
  @ApiProperty()
  serviceCord: string;
  @ApiProperty()
  ipcStarts: string;
  @ApiProperty()
  ipcEnds: string;
  @ApiProperty()
  icapEnds: string;
  @ApiProperty()
  idrcEnds: string;
  @ApiProperty()
  lon: string;
  @ApiProperty()
  lcn: string;
  @ApiProperty()
  includeReference: string;
  @ApiProperty()
  payRate: string;
  @ApiProperty()
  driversLicence: string;
  @ApiProperty()
  insurance: string;
  @ApiProperty()
  insuranceExpiry: string;
  @ApiProperty()
  directDeposit: string;
  @ApiProperty()
  annualTraining: string;
  @ApiProperty()
  ein: string;
  @ApiProperty()
  nurseLicense: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseDetails {
  @ApiProperty()
  attributes: ResponseDetailsBody;

  @ApiProperty()
  id: number;
}

export class ResponseAdressBody {
  @ApiProperty()
  type: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zip: string;

  @ApiProperty()
  state: string;
  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseAdress {
  @ApiProperty()
  attributes: ResponseAdressBody;

  @ApiProperty()
  id: number;
}

export class ResponseUserAdress {
  @ApiProperty()
  mailingCity: string;

  @ApiProperty()
  mailingZip: string;

  @ApiProperty()
  mailingState: string;
  @ApiProperty()
  mailingAddress: string;

  @ApiProperty()
  physicalCity: string;

  @ApiProperty()
  physicalZip: string;

  @ApiProperty()
  physicalState: string;
  @ApiProperty()
  physicalAddress: string;
}

export class ResponseUserDetails {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationName: string;
  @ApiProperty()
  contactName: string;
  @ApiProperty()
  worlEmail: string;
  @ApiProperty()
  dateOfBirth: string;
  @ApiProperty()
  locationCode: string;
  @ApiProperty()
  ssn: string;
  @ApiProperty()
  lastNursingAssessment: string;
  @ApiProperty()
  waiver: string;
  @ApiProperty()
  contract: string;
  @ApiProperty()
  county: string;
  @ApiProperty()
  careId: string;
  @ApiProperty()
  medicaidId: string;
  @ApiProperty()
  medicareId: string;
  @ApiProperty()
  serviceCord: string;
  @ApiProperty()
  ipcStarts: string;
  @ApiProperty()
  ipcEnds: string;
  @ApiProperty()
  icapEnds: string;
  @ApiProperty()
  idrcEnds: string;
  @ApiProperty()
  lon: string;
  @ApiProperty()
  lcn: string;
  @ApiProperty()
  includeReference: string;
  @ApiProperty()
  payRate: string;
  @ApiProperty()
  driversLicence: string;
  @ApiProperty()
  insurance: string;
  @ApiProperty()
  insuranceExpiry: string;
  @ApiProperty()
  directDeposit: string;
  @ApiProperty()
  annualTraining: string;
  @ApiProperty()
  ein: string;
  @ApiProperty()
  nurseLicense: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseUserRole {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  canLogin: boolean;

  @ApiProperty()
  isContact: boolean;
}

export class ResponseUserBody {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  attributes: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  address: ResponseUserAdress;

  @ApiProperty()
  details: ResponseUserDetails;

  @ApiProperty()
  role: ResponseUserRole;
}

export class ResponseUsers {
  @ApiProperty()
  attributes: ResponseUserBody;

  @ApiProperty()
  id: number;
}
