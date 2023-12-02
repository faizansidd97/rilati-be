import { PartialType } from '@nestjs/swagger';
import { CreateIndustyCareerDiagraphDto } from './create-industy-career-diagraph.dto';

export class UpdateIndustyCareerDiagraphDto extends PartialType(CreateIndustyCareerDiagraphDto) {}
