import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { MailService } from "src/mail/mail.service";

import { InjectRepository } from "@nestjs/typeorm";
import { hashpassword } from "src/helpers/bcrypt.helper";
import { AddHours } from "src/helpers/date.helper";
import { listingApiWrapper } from "src/utilities/util.service";
import { errorApiWrapper } from "../../utilities/util.service";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { CompleteRegistrationDto } from "../dto/completeRegistration.dto";
import { ForgetPasswordDto } from "../dto/forget-reset-password.dto";
import { RegisterDto } from "../dto/register.dto";
import {
  ResetPasswordApiDto,
  ResetPasswordPostDataDto,
} from "../dto/reset-password-post.dto";
import { ResetPasswordDataDto } from "../dto/reset-password.dto";
import { UserToken } from "../entities/user_token.entity";
import { loginMapper, singleUserListingMaper } from "../user.mapper";
import { UserTokenRepository } from "../user_token/user_token.repository";
import { UsersService } from "../users.service";
import { JwtPayload } from "./jwt/jwt-payload.interface";

import { getRepository } from "typeorm";
import { University } from "src/university/entities/university.entity";
import { Career } from "src/career/entities/career.entity";
import { FavoriteSubjectsService } from "src/favorite-subjects/favorite-subjects.service";
import { IntrestedIndustriesService } from "src/intrested-industries/intrested-industries.service";

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(MailService) private mailService: MailService,
    @InjectRepository(UserTokenRepository)
    private userTokenRepository: UserTokenRepository,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async onModuleInit() {
  
  }
  async signin(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status === 0) {
        throw new BadRequestException(
          errorApiWrapper(
            `Your account is deactivated. Please contact the administrator`,
            HttpStatus.BAD_REQUEST
          )
        );
      }
      const payload: JwtPayload = {
        sub: user.id,
        email: email,
        name: user.name,
        family_name: user.first_name,
        given_name: user.last_name,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      const data = loginMapper({ token: accessToken, user: user });
      return listingApiWrapper(data);

    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }

  async register(registerDto: RegisterDto) {

    return await this.usersService.signUp(registerDto);

  }

  //Generar tokens de acceso y de refrescar.
  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: '1y',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: '2y',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async changePassword(data, user) {
    try {
      if (await bcrypt.compare(data.current_password, user.password)) {
        const userPass = {
          id: user.id,
          password: data.new_password,
        };

        await this.usersService.resetUserPassword(userPass);

        return listingApiWrapper("Password changed Successfuly!");
      } else {
        return errorApiWrapper("Password is incorrect");
      }
    } catch (error) {
      return errorApiWrapper(error);
    }

    return listingApiWrapper(data);
  }

  async findByCredentials(email, password) {
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }


  async completeRegistration(completeRegistrationDto: CompleteRegistrationDto) {
    const user = await this.usersService.completeRegistrationUser(
      completeRegistrationDto
    );
    if (user) {
      await this.mailService.sendUserRegistrationEmail(user);
    }
    const usersResponse = listingApiWrapper(singleUserListingMaper(user));
    return usersResponse;
  }

  async sendResetPasswordEmail(resetPasswordDataDto: ResetPasswordDataDto) {
    const user_row = await this.usersService.updateHashForResetPassword(
      resetPasswordDataDto
    );
    await this.mailService.sendResetPasswordEmail(
      resetPasswordDataDto,
      user_row
    );

    return user_row;
  }

  async checkResetPasswordLink(user_id, password_hash) {
    const user_row = await this.usersService.checkUserHashForResetPassword(
      user_id,
      password_hash
    );

    const usersResponse = listingApiWrapper(singleUserListingMaper(user_row));

    return usersResponse;
  }

  async resetUserPassword(resetPasswordPostDataDto: ResetPasswordPostDataDto) {
    const user_row = await this.usersService.resetUserPassword(
      resetPasswordPostDataDto
    );
    await this.mailService.confirmResetPasswordEmail(user_row.email);
    const usersResponse = listingApiWrapper(singleUserListingMaper(user_row));
    return usersResponse;
  }

  async forgetPassword(data: ForgetPasswordDto) {
    let { email } = data;
    let token: UserToken;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException(
        errorApiWrapper(`User Does not exist`, HttpStatus.BAD_REQUEST)
      );
    }
    let user_token: UserToken = await this.userTokenRepository.findOne({
      user_id: user.id,
    });

    let token_code = Math.floor(1000 + Math.random() * 9000); // wiil be generated randomly
    const expiresIn = AddHours(null, 1);
    if (user_token) {
      await this.userTokenRepository
        .createQueryBuilder()
        .update(UserToken)
        .set({
          token_code: token_code,
          expire_time: expiresIn,
        })
        .where("id = :id", { id: user_token.id })
        .execute();
      token = await this.userTokenRepository.findOne({
        user_id: user.id,
      });
    } else {
      let newToken = {
        token_code: token_code,
        expire_time: expiresIn,
        user_id: user.id,
      };
      token = await this.userTokenRepository.save(newToken);
    }

    // await this.mailService.sendForgetPasswordEmail(user.email, token);
    await this.mailService.sendLoginOtpEmail(user.email, token);

    return listingApiWrapper(
      null,
      "Forget Passaword mail has been send successfuly"
    );
  }

  async resetPassword(data: ResetPasswordApiDto) {
    let userExist = await this.usersService.getUserByEmail(data.email);

    let userToken = await this.userTokenRepository.findOne({
      user_id: userExist.id,
    });

    if (!userToken) {
      throw new BadRequestException("Not Authorized to change the passowrd");
    }

    if (data.code != userToken.token_code) {
      throw new BadRequestException("Not Authorized to change the passowrd");
    }

    let user = await this.usersService.getUserById(userToken.user_id);

    if (!user) {
      throw new BadRequestException(
        errorApiWrapper(`User Does not exist`, HttpStatus.BAD_REQUEST)
      );
    }

    let newPassword = await hashpassword(data.password);
    const passwordUpdate = this.usersService.updatePassword(
      user.id,
      newPassword
    );
    if (passwordUpdate) {
      await this.userTokenRepository.delete({ id: userToken.id });

      return listingApiWrapper(null, "Password Reseted Successfuly");
    } else {
      throw new InternalServerErrorException(
        errorApiWrapper("Could not able to update new password")
      );
    }
  }

  async verify(token: string) {
    const result = await this.jwtService.verify(token);
    return result;
  }

  async optCheck(data) {
    let userToken = await this.userTokenRepository.findOne({
      token_code: data.code,
    });
    // console.log(1)
    if (userToken) {
      let userDetail = await this.usersService.getUserById(userToken.user_id);
      if (!userDetail) {
        throw new BadRequestException(
          errorApiWrapper("User does not exist")
        );
      }
      if (data.code != userToken.token_code) {
        throw new BadRequestException(
          errorApiWrapper("OTP Not match")
        );
      }
      else {
        return listingApiWrapper(null, "OTP verified successfully");
      }
    }
    else {
      throw new BadRequestException(
        errorApiWrapper("OTP Not match")
      );
    }
  }
}
