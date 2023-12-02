import { Injectable } from '@nestjs/common';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SendMailRepository } from './send-mail.repository';
import { listingApiWrapper } from 'src/utilities/util.service';

@Injectable()
export class SendMailService {

  constructor(
    @InjectRepository(SendMailRepository)
    private sendMailRepository : SendMailRepository,
    private mailService : MailService
  ){}
  async create(createSendMailDto: CreateSendMailDto) {
    const email = this.sendMailRepository.create({...createSendMailDto})
    await this.sendMailRepository.save(email)

    await this.mailService.sendMail(email);

    return listingApiWrapper(null,"Email Sent Successfully!");
  }

  async findAll(){
    const mails = await this.sendMailRepository.find()
     return listingApiWrapper(mails,"listing")
  }
}
