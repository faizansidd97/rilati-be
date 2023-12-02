import { PartialType } from '@nestjs/swagger';
import { CreateInspirationalPersonDto } from './create-inspirational-person.dto';

export class UpdateInspirationalPersonDto extends PartialType(CreateInspirationalPersonDto) {}
