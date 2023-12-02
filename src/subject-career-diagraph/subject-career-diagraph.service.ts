import { Injectable } from '@nestjs/common';
import { CreateSubjectCareerDiagraphDto } from './dto/create-subject-career-diagraph.dto';
import { UpdateSubjectCareerDiagraphDto } from './dto/update-subject-career-diagraph.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectCareerDiagraphRepository } from './subject-career-diagraph.repository';

@Injectable()
export class SubjectCareerDiagraphService {
  constructor(
    @InjectRepository(SubjectCareerDiagraphRepository)
    private repositry : SubjectCareerDiagraphRepository
  ){}
  async create(createSubjectCareerDiagraphDto: CreateSubjectCareerDiagraphDto) {
    const data = this.repositry.create({...createSubjectCareerDiagraphDto})
    return await this.repositry.save(data);
  }

  async findAll() {
    return await this.repositry.find({
      relations:['subject_id','career_category_id']
    });
  }

}
