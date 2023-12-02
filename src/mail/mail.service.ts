import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ResetPasswordDto,
  ResetPasswordDataDto,
} from "src/users/dto/reset-password.dto";
import { errorApiWrapper } from "src/utilities/util.service";
import { User } from "src/users/entities/user.entity";
import { MAIL_ENV } from "./mailconstant";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendUserInvitation(user: User, password: string):Promise<boolean>{
    try {
      const mailSent = await this.mailerService.sendMail({
        to: user.email,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Registration Successfull`,
        template: "user-invitation", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          register_hash: user.register_hash,
          email: user.email,
          password: password,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
      console.log(mailSent)
      return mailSent;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async sendMail(data: any) {
    console.log(data);
    try {
      // const first_name = data?.to_user?.split("@")[0];
      await this.mailerService.sendMail({
        to: "contact@rilati.com",
        cc: data?.cc,
        bcc: data?.bcc,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Email Inquiry`,
        template: "hr-mail", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          flag: data?.flag,
          email: data?.email,
          description: data?.description,
          attachments: data?.files,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async sendResetPasswordEmail(
    resetPasswordDataDto: ResetPasswordDataDto,
    user_row
  ) {
    try {
      await this.mailerService.sendMail({
        to: resetPasswordDataDto.data.email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Reset Your Password`,
        template: "reset-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
          reset_password_link: `${
            this.configService.get("APP_URL") || process.env.APP_URL
          }/reset/${user_row.id}/${user_row.register_hash}`,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async sendForgetPasswordEmail(email, user_row) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Forget Password`,
        template: "reset-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
          reset_password_link: `${
            this.configService.get("APP_URL") || process.env.APP_URL
          }/reset/${user_row.id}/${user_row.TokenCode}`,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async confirmResetPasswordEmail(email) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Password Reset Confirmation`,
        template: "confirm-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async sendWarningNotification(data) {
    try {
      await this.mailerService.sendMail({
        to: data?.email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - ${data.type} Expiring`,
        template: "expiry-warning", // `.hbs` extension is appended automatically
        context: {
          type: data?.type,
          first_name: data?.first_name,
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }


  async sendUserRegistrationEmail(user) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Registration Complete`,
        template: "user-registration", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          first_name: user?.first_name,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async sendLoginOtpEmail(email, user_token) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Forget Password OTP Code`,
        template: "login-otp-send",
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
          otpCode:user_token.token_code,
        },
      });
      
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }
}
