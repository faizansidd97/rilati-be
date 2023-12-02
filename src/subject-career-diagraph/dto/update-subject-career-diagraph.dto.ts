import { PartialType } from '@nestjs/swagger';
import { CreateSubjectCareerDiagraphDto } from './create-subject-career-diagraph.dto';

export class UpdateSubjectCareerDiagraphDto extends PartialType(CreateSubjectCareerDiagraphDto) {}
