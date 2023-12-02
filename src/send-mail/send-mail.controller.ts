import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Send Mail')
@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post()
  create(@Body() createSendMailDto: CreateSendMailDto) {
    return this.sendMailService.create(createSendMailDto);
  }
  
  @Get()
  findAll() {
    return this.sendMailService.findAll();
  }

}
