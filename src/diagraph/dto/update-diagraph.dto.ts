import { PartialType } from '@nestjs/swagger';
import { CreateDiagraphDto } from './create-diagraph.dto';

export class UpdateDiagraphDto extends PartialType(CreateDiagraphDto) {}
