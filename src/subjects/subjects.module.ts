import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from './subjects.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      SubjectsRepository
    ])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports:[SubjectsService]
})
export class SubjectsModule {}
