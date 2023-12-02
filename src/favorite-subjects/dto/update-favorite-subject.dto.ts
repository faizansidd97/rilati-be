import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteSubjectDto } from './create-favorite-subject.dto';

export class UpdateFavoriteSubjectDto extends PartialType(CreateFavoriteSubjectDto) {}
