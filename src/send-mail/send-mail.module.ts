import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { SendMailController } from './send-mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { SendMailRepository } from './send-mail.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    SendMailRepository
  ]),
  MailModule],
  controllers: [SendMailController],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailModule {}
