import { Injectable } from '@nestjs/common';
import { CreateInspirationalPersonDto, FilterOrderBy } from './dto/create-inspirational-person.dto';
import { UpdateInspirationalPersonDto } from './dto/update-inspirational-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InspirationalPersonRepository } from './inspirational-people.repository';
import { ListingParams } from 'src/dto/global.dto';
import { listingApiWrapper } from 'src/utilities/util.service';
import { InspirationalPerson } from './entities/inspirational-person.entity';

@Injectable()
export class InspirationalPeopleService {
  constructor(
    @InjectRepository(InspirationalPersonRepository)
    private inspirationalPeopleRepository : InspirationalPersonRepository
  ){}
  create(createInspirationalPersonDto: CreateInspirationalPersonDto) {
    return this.inspirationalPeopleRepository.createData(createInspirationalPersonDto);
  }

  findAll(listingParams: ListingParams,filterOrderBy: FilterOrderBy) {
    return this.inspirationalPeopleRepository.findAllData(listingParams,filterOrderBy);
  }

  async findOne(id: number) {
     const data = await this.inspirationalPeopleRepository.findOne(id);
     return listingApiWrapper(data,null);
  }

  async update(id: number, updateInspirationalPersonDto: UpdateInspirationalPersonDto) {
    
   await this.inspirationalPeopleRepository.createQueryBuilder()
      .update(InspirationalPerson)
      .set({...updateInspirationalPersonDto})
      .where("id = :id",{id})
      .execute();

    return listingApiWrapper(null,"Updated Successfully!");
  }

  async remove(id: number) {
     await this.inspirationalPeopleRepository.softDelete(id);
     return listingApiWrapper(null,"Deleted Successfully!");
    }
}
