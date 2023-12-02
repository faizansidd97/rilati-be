import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntrestedIndustriesService } from './intrested-industries.service';
import { CreateIntrestedIndustryDto } from './dto/create-intrested-industry.dto';
import { UpdateIntrestedIndustryDto } from './dto/update-intrested-industry.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Intrested Industries')
@Controller('intrested-industries')
export class IntrestedIndustriesController {
  constructor(private readonly intrestedIndustriesService: IntrestedIndustriesService) {}

  
}
