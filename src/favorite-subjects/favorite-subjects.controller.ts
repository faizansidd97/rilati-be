import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteSubjectsService } from './favorite-subjects.service';
import { CreateFavoriteSubjectDto } from './dto/create-favorite-subject.dto';
import { UpdateFavoriteSubjectDto } from './dto/update-favorite-subject.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite Subjects')
@Controller('favorite-subjects')
export class FavoriteSubjectsController {
  constructor(private readonly favoriteSubjectsService: FavoriteSubjectsService) {}

}
