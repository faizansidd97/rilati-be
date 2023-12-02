import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectCareerDiagraphService } from './subject-career-diagraph.service';
import { CreateSubjectCareerDiagraphDto } from './dto/create-subject-career-diagraph.dto';
import { UpdateSubjectCareerDiagraphDto } from './dto/update-subject-career-diagraph.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subject Career Diagraph')
@Controller('subject-career-diagraph')
export class SubjectCareerDiagraphController {
  constructor(private readonly subjectCareerDiagraphService: SubjectCareerDiagraphService) {}

  @Post()
  create(@Body() createSubjectCareerDiagraphDto: CreateSubjectCareerDiagraphDto) {
    return this.subjectCareerDiagraphService.create(createSubjectCareerDiagraphDto);
  }

  @Get()
  findAll() {
    return this.subjectCareerDiagraphService.findAll();
  }
}
