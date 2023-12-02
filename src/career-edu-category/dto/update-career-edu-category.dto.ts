import { PartialType } from '@nestjs/swagger';
import { CreateCareerEduCategoryDto } from './create-career-edu-category.dto';

export class UpdateCareerEduCategoryDto extends PartialType(CreateCareerEduCategoryDto) {}
