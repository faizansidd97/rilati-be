import { Module } from '@nestjs/common';
import { CareerEduCategoryService } from './career-edu-category.service';
import { CareerEduCategoryController } from './career-edu-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerEduCategoryRepository } from './career-edu-category.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      CareerEduCategoryRepository
    
  ])],
  controllers: [CareerEduCategoryController],
  providers: [CareerEduCategoryService],
  exports:[CareerEduCategoryService]
})
export class CareerEduCategoryModule {}
