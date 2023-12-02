import { Module } from '@nestjs/common';
import { FavoriteSubjectsService } from './favorite-subjects.service';
import { FavoriteSubjectsController } from './favorite-subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteSubjectRepository } from './favorite-subjects.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    FavoriteSubjectRepository
  ])],
  controllers: [FavoriteSubjectsController],
  providers: [FavoriteSubjectsService],
  exports:[FavoriteSubjectsService]
})
export class FavoriteSubjectsModule {}
