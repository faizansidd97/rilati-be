import { Module } from '@nestjs/common';
import { CareerLikesService } from './career-likes.service';
import { CareerLikesController } from './career-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerLikeRepository } from './career-likes.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    CareerLikeRepository
  ])],
  controllers: [CareerLikesController],
  providers: [CareerLikesService],
  exports:[CareerLikesService]
})
export class CareerLikesModule {}
