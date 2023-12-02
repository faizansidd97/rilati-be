import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagraphService } from './diagraph.service';
import { CreateDiagraphDto } from './dto/create-diagraph.dto';
import { UpdateDiagraphDto } from './dto/update-diagraph.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';
import { CurrentUser } from 'src/users/auth/jwt/jwt.strategy';
import { User } from 'src/users/entities/user.entity';

@ApiTags('User Diagraph')
@Controller('diagraph')
export class DiagraphController {
  constructor(private readonly diagraphService: DiagraphService) {}

  @Get()
  @ApiAuthPermission(true)
  findAll(@CurrentUser() user : User){
    return this.diagraphService.implementingDiagraph(user);
  }
}
