import { Module } from '@nestjs/common';
import { SubjectCareerDiagraphService } from './subject-career-diagraph.service';
import { SubjectCareerDiagraphController } from './subject-career-diagraph.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectCareerDiagraphRepository } from './subject-career-diagraph.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    SubjectCareerDiagraphRepository
  ])],
  controllers: [SubjectCareerDiagraphController],
  providers: [SubjectCareerDiagraphService],
  exports:[SubjectCareerDiagraphService]
})
export class SubjectCareerDiagraphModule {}
