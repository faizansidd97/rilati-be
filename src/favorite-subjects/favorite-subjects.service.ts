import { Injectable } from '@nestjs/common';
import { CreateFavoriteSubjectDto } from './dto/create-favorite-subject.dto';
import { UpdateFavoriteSubjectDto } from './dto/update-favorite-subject.dto';
import { FavoriteSubjectRepository } from './favorite-subjects.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteSubject } from 'src/users/auth/jwt/jwt-payload.interface';
import { TasteEnum } from 'src/users/auth/auth-role.enum';

@Injectable()
export class FavoriteSubjectsService {
  constructor(
    @InjectRepository(FavoriteSubjectRepository)
    private favoriteSubjectRepository: FavoriteSubjectRepository
  ) {}

  async create(data: FavouriteSubject) {
    const subject  = this.favoriteSubjectRepository.create({...data})
    await this.favoriteSubjectRepository.save(subject)
    return true;
  }

  async destroyAll(user_id:number,type:TasteEnum){
    const query = await this.favoriteSubjectRepository.createQueryBuilder()
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
