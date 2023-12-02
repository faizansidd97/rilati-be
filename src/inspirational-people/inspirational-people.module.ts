import { Module } from '@nestjs/common';
import { InspirationalPeopleService } from './inspirational-people.service';
import { InspirationalPeopleController } from './inspirational-people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspirationalPersonRepository } from './inspirational-people.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    InspirationalPersonRepository
  ])],
  controllers: [InspirationalPeopleController],
  providers: [InspirationalPeopleService],
  exports:[InspirationalPeopleService]
})
export class InspirationalPeopleModule {}
