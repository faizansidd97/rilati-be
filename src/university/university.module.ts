import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityRepository } from './university.repository';
import { UniversityCategoryRepository } from './university-category.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UniversityRepository,
      UniversityCategoryRepository
    ])
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
  exports:[UniversityService]
})
export class UniversityModule {}
