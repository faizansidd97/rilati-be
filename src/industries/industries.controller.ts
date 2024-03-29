import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Industries')
@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Post()
  create(@Body() createIndustryDto: CreateIndustryDto) {
    return this.industriesService.create(createIndustryDto);
  }

  @Get()
  findAll() {
    return this.industriesService.findAll();
  }

  @Patch("/:id")
  update(@Param('id') id: number, @Body() updateIndustryDto: UpdateIndustryDto) {
    return this.industriesService.update(id,updateIndustryDto);
  }
}
