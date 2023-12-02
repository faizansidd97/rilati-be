import { Injectable } from '@nestjs/common';
import { CreateIndustyCareerDiagraphDto } from './dto/create-industy-career-diagraph.dto';
import { UpdateIndustyCareerDiagraphDto } from './dto/update-industy-career-diagraph.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IndustyCareerDiagraphRepository } from './industry-career-diagraph.repository';

@Injectable()
export class IndustyCareerDiagraphService {
  constructor(
    @InjectRepository(IndustyCareerDiagraphRepository)
    private repository:IndustyCareerDiagraphRepository
  ){}
  async create(createIndustyCareerDiagraphDto: CreateIndustyCareerDiagraphDto) {
    const data =  this.repository.create({...createIndustyCareerDiagraphDto})
    return await this.repository.save(data);
  }

  async findAll() {
    return await this.repository.find({
      relations:['industry_id', 'career_category_id']
    });
  }
}
