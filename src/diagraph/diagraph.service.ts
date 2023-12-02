import { Injectable } from '@nestjs/common';
import { CreateDiagraphDto } from './dto/create-diagraph.dto';
import { UpdateDiagraphDto } from './dto/update-diagraph.dto';
import { UsersService } from 'src/users/users.service';
import { IndustyCareerDiagraphService } from 'src/industy-career-diagraph/industy-career-diagraph.service';
import { SubjectCareerDiagraphService } from 'src/subject-career-diagraph/subject-career-diagraph.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DiagraphService {
  constructor(
    private readonly userService: UsersService,
    private readonly industyCareerDiagraphService: IndustyCareerDiagraphService,
    private readonly subjectCareerDiagraphService: SubjectCareerDiagraphService,
  ){}

  async implementingDiagraph(user : User) {
    return await this.userService.getUserByIdWithDetails(user?.id);
  }

}
