import { Module } from '@nestjs/common';
import { DiagraphService } from './diagraph.service';
import { DiagraphController } from './diagraph.controller';
import { IndustyCareerDiagraphModule } from 'src/industy-career-diagraph/industy-career-diagraph.module';
import { SubjectCareerDiagraphModule } from 'src/subject-career-diagraph/subject-career-diagraph.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    UsersModule,
    IndustyCareerDiagraphModule,
    SubjectCareerDiagraphModule,
  ],
  controllers: [DiagraphController],
  providers: [DiagraphService]
})
export class DiagraphModule {}
