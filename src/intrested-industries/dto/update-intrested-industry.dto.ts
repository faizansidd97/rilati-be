import { PartialType } from '@nestjs/swagger';
import { CreateIntrestedIndustryDto } from './create-intrested-industry.dto';

export class UpdateIntrestedIndustryDto extends PartialType(CreateIntrestedIndustryDto) {}
