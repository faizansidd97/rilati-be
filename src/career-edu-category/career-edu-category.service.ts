import { Injectable } from '@nestjs/common';
import { CreateCareerEduCategoryDto } from './dto/create-career-edu-category.dto';
import { UpdateCareerEduCategoryDto } from './dto/update-career-edu-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerEduCategoryRepository } from './career-edu-category.repository';

@Injectable()
export class CareerEduCategoryService {
  constructor (
    @InjectRepository(CareerEduCategoryRepository)
    private careerEduCategoryRepository : CareerEduCategoryRepository  
  ){}
  async createCategory(career_id:number , category_id:number) {
    return await this.careerEduCategoryRepository.insertCaegory(career_id,category_id)
  }

  findAll() {
    return `This action returns all careerEduCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careerEduCategory`;
  }

  update(id: number, updateCareerEduCategoryDto: UpdateCareerEduCategoryDto) {
    return `This action updates a #${id} careerEduCategory`;
  }

  async removeCategory(career_id: number) {
    console.log('aaa')
    return await this.careerEduCategoryRepository.delete({career_id:career_id});
  }
}
