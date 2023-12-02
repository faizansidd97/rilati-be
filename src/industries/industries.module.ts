import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryRepository } from './industries.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      IndustryRepository
    ])
  ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
  exports:[IndustriesService]
})
export class IndustriesModule {}
