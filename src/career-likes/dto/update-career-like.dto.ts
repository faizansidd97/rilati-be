import { PartialType } from '@nestjs/swagger';
import { CreateCareerLikeDto } from './create-career-like.dto';

export class UpdateCareerLikeDto extends PartialType(CreateCareerLikeDto) {}
