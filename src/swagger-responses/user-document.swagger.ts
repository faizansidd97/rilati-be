import { ApiProperty } from "@nestjs/swagger";
export class ResponseAssignedDocumentBodyUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
export class ResponseUserDocumentBody {
  @ApiProperty()
  path: string;

  @ApiProperty()
  titleDescription: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  user: ResponseAssignedDocumentBodyUser;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseUserDocument {
  @ApiProperty()
  attributes: ResponseUserDocumentBody;

  @ApiProperty()
  id: number;
}
