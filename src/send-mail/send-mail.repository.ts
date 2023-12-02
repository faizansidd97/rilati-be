import { EntityRepository, Repository } from "typeorm";
import { SendMail } from "./entities/send-mail.entity";

@EntityRepository(SendMail)
export class SendMailRepository extends Repository<SendMail> {

}