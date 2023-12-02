import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndustyCareerDiagraphService } from './industy-career-diagraph.service';
import { CreateIndustyCareerDiagraphDto } from './dto/create-industy-career-diagraph.dto';
import { UpdateIndustyCareerDiagraphDto } from './dto/update-industy-career-diagraph.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Industy Career Diagraph')
@Controller('industy-career-diagraph')
export class IndustyCareerDiagraphController {
  constructor(private readonly industyCareerDiagraphService: IndustyCareerDiagraphService) {}

  @Post()
  create(@Body() createIndustyCareerDiagraphDto: CreateIndustyCareerDiagraphDto) {
    return this.industyCareerDiagraphService.create(createIndustyCareerDiagraphDto);
  }

  @Get()
  findAll() {
    return this.industyCareerDiagraphService.findAll();
  }
}
