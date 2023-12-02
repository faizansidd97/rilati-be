import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CareerLikesService } from './career-likes.service';
import { CreateCareerLikeDto } from './dto/create-career-like.dto';
import { CurrentUser } from 'src/users/auth/jwt/jwt.strategy';
import { User } from 'src/users/entities/user.entity';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';

@ApiTags('Career Likes')
@Controller('career-likes')
export class CareerLikesController {
  constructor(private readonly careerLikesService: CareerLikesService) {}

  @Post()
  @ApiAuthPermission(true)
  create(@Body() createCareerLikeDto: CreateCareerLikeDto,@CurrentUser() user:User) {
    return this.careerLikesService.create(createCareerLikeDto,user);
  }
}
