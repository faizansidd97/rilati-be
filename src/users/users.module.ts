import { forwardRef, Global, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MailService } from "src/mail/mail.service";
import { RolesRepository } from "./../roles/roles.repository";
import { UserDetailsRepository } from "../user-details/user-details.repository";
import { UserDetailsModule } from "../user-details/user-details.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { UserTokenRepository } from "./user_token/user_token.repository";
import { MailModule } from "src/mail/mail.module";
import { AuthModule } from './auth/auth.module';
import { FavoriteSubjectsModule } from "src/favorite-subjects/favorite-subjects.module";
import { IntrestedIndustriesModule } from "src/intrested-industries/intrested-industries.module";
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      RolesRepository,
    ]),
    MailModule,
    UserDetailsModule,
    FavoriteSubjectsModule,
    IntrestedIndustriesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([
      UsersRepository,
      UserTokenRepository,
    ]),
  ],
})
export class UsersModule {}
