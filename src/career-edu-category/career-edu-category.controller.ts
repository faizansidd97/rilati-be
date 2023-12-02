import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CareerEduCategoryService } from './career-edu-category.service';
import { CreateCareerEduCategoryDto } from './dto/create-career-edu-category.dto';
import { UpdateCareerEduCategoryDto } from './dto/update-career-edu-category.dto';

@Controller('career-edu-category')
export class CareerEduCategoryController {
  constructor(private readonly careerEduCategoryService: CareerEduCategoryService) {}

  @Get()
  findAll() {
    return this.careerEduCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerEduCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareerEduCategoryDto: UpdateCareerEduCategoryDto) {
    return this.careerEduCategoryService.update(+id, updateCareerEduCategoryDto);
  }

}
