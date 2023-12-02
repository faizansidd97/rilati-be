import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerRepository } from './career.repository';
import { CareerCategoryRepository } from './career-category.repository';
import { CareerEduCategoryModule } from 'src/career-edu-category/career-edu-category.module';
import { CareerLikesModule } from 'src/career-likes/career-likes.module';

@Module({
  imports:[
    CareerEduCategoryModule,
    CareerLikesModule,
    TypeOrmModule.forFeature([
    CareerRepository,
    CareerCategoryRepository
  ])
],
  controllers: [CareerController],
  providers: [CareerService],
  exports:[CareerService]
})
export class CareerModule {}
