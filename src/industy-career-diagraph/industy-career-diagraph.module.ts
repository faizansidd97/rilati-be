import { Module } from '@nestjs/common';
import { IndustyCareerDiagraphService } from './industy-career-diagraph.service';
import { IndustyCareerDiagraphController } from './industy-career-diagraph.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustyCareerDiagraphRepository } from './industry-career-diagraph.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    IndustyCareerDiagraphRepository
  ])],
  controllers: [IndustyCareerDiagraphController],
  providers: [IndustyCareerDiagraphService],
  exports:[IndustyCareerDiagraphService]
})
export class IndustyCareerDiagraphModule {}
