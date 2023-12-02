import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectsRepository } from './subjects.repository';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectsRepository)
    private subjectsRepository: SubjectsRepository
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
     const subject = this.subjectsRepository.create({
      ...createSubjectDto
    });
    await this.subjectsRepository.save(subject)
    return true;
  }

  async findAll() {
    return await this.subjectsRepository.find();
  }

  async update(id:number,updateSubjectDto: UpdateSubjectDto) {
    
    try {
      await this.subjectsRepository.createQueryBuilder()
        .update(Subject)
        .set({ ...updateSubjectDto })
        .where("id = :id", { id: id })
        .execute();
      return true;
    } catch (error) {
      console.error(error);
      return false; // Indicate that the update failed
    }
  }
}
