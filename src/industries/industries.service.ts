import { Injectable } from '@nestjs/common';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { IndustryRepository } from './industries.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(IndustryRepository)
    private industryRepository: IndustryRepository
  ) {}

  async create(createIndustryDto: CreateIndustryDto) {
    const industry = this.industryRepository.create({
      ...createIndustryDto
    });
    await this.industryRepository.save(industry)
    return true;
  }

  async findAll() {
    return await this.industryRepository.find();
  }

  async update(id:number,createIndustryDto: UpdateIndustryDto) {
  
    try {
      await this.industryRepository.createQueryBuilder()
      .update(Industry)
      .set({ ...createIndustryDto })
      .where("id = :id", { id: id })
      .execute();
      return true;
    } catch (error) {
      console.error(error);
      return false; // Indicate that the update failed
    }
  }

}
