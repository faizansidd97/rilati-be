import { Injectable } from '@nestjs/common';
import { CreateCareerLikeDto } from './dto/create-career-like.dto';
import { UpdateCareerLikeDto } from './dto/update-career-like.dto';
import { CareerLikeRepository } from './career-likes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { listingApiWrapper } from 'src/utilities/util.service';

@Injectable()
export class CareerLikesService {
  constructor(
      @InjectRepository(CareerLikeRepository)
      private careerLikeRepository : CareerLikeRepository
  ){}
  async create(createCareerLikeDto: CreateCareerLikeDto,user:User) {
    const {career_id} = createCareerLikeDto
    const isAlreadyLiked = await this.checkIfAlreadyUserHasLike(user?.id,career_id)
    if(!isAlreadyLiked){
        await this.careerLikeRepository.insertLike(user?.id,career_id)
    }else{
      await this.careerLikeRepository.removeLike(user?.id,career_id)
    }
    return listingApiWrapper(null,`${isAlreadyLiked ? 'Career Unliked Successfully!': 'Career Liked Successfully!'}`);
  }

  async checkIfAlreadyUserHasLike(user_id:number,career_id:number):Promise<Boolean>{
    return await this.careerLikeRepository.checkIfAlreadyLike(user_id,career_id);
  }
}
