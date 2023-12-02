import { Injectable } from '@nestjs/common';
import { CreateIntrestedIndustryDto } from './dto/create-intrested-industry.dto';
import { UpdateIntrestedIndustryDto } from './dto/update-intrested-industry.dto';
import { IntrestedIndustryRepository } from './intrested-industries.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteIndustries } from 'src/users/auth/jwt/jwt-payload.interface';
import { TasteEnum } from 'src/users/auth/auth-role.enum';

@Injectable()
export class IntrestedIndustriesService {
  constructor(
    @InjectRepository(IntrestedIndustryRepository)
    private intrestedIndustryRepository: IntrestedIndustryRepository
  ) {}

  async create(data: FavouriteIndustries) {
    const indust = this.intrestedIndustryRepository.create({
      ...data
    })
    await this.intrestedIndustryRepository.save(indust)
    return true;
  }

  async destroyAll(user_id:number,type:TasteEnum){
    const query = await this.intrestedIndustryRepository.createQueryBuilder()
    .softDelete()
    .where({
      ...{
        user_id: user_id,
        type: type,
      },
    })
    .execute();

    return true;
  }
}
