import { Module } from '@nestjs/common';
import { IntrestedIndustriesService } from './intrested-industries.service';
import { IntrestedIndustriesController } from './intrested-industries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntrestedIndustryRepository } from './intrested-industries.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    IntrestedIndustryRepository
  ])],
  controllers: [IntrestedIndustriesController],
  providers: [IntrestedIndustriesService],
  exports:[IntrestedIndustriesService]
})
export class IntrestedIndustriesModule {}
