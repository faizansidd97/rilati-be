import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "src/mail/mail.module";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserTokenRepository } from "../user_token/user_token.repository";
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from "./constants";
import { FavoriteSubjectsModule } from "src/favorite-subjects/favorite-subjects.module";
import { IntrestedIndustryRepository } from "src/intrested-industries/intrested-industries.repository";
import { IntrestedIndustriesModule } from "src/intrested-industries/intrested-industries.module";

@Module({
  imports: [
    MailModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "topSecret51",
      signOptions: {
        expiresIn: "365d",
      },
    }),
    TypeOrmModule.forFeature([
      // RolesRepository,
      // AddressRepository,
      UserTokenRepository
    ]),
  UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {}
