import { Body, Controller, Post, HttpStatus, Get, Param, Put, Res, OnModuleInit } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListingApiWrapperDto, ErrorApiWrapperDto } from 'src/utilities/dto/util.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { ForgetPasswordDto } from '../dto/forget-reset-password.dto';
import { ChangePasswordApiDto, ResetPasswordApiDto } from '../dto/reset-password-post.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from '../../swagger-responses/auth-swagger';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';
import { CurrentUser } from './jwt/jwt.strategy';
import { RegisterDto } from '../dto/register.dto';
import { OtpCheckApiDto } from '../dto/otp-check.dto';
import { Response } from 'express';
@ApiTags('Auth')
@Controller('/')
export class AuthController{
  constructor(private authService: AuthService ) { }

 
  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK
  })
  @Post('login')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signin(authCredentialsDto);
  }

  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK
  })

  @Post('register')
    register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/forget-password')
  async forgetPassword(@Body() data:ForgetPasswordDto): Promise<ListingApiWrapperDto | ErrorApiWrapperDto>{
    return await this.authService.forgetPassword(data);
  }


  @Post('/reset-password')
  async resetPassword(@Body() data:ResetPasswordApiDto): Promise<ListingApiWrapperDto | ErrorApiWrapperDto>{
    return await this.authService.resetPassword(data);
  }

  @Post('/change-password')
  @ApiAuthPermission(true)
  async changePassword(@Body() data:ChangePasswordApiDto,@CurrentUser() user): Promise<ListingApiWrapperDto | ErrorApiWrapperDto>{
    return await this.authService.changePassword(data,user);
  }

  @Post('/verify-otp')
  async otpCheck(@Body() data:OtpCheckApiDto){
    return await this.authService.optCheck(data);
  }

}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  PREFER_NOT_TO_MENTION = "PREFER_NOT_TO_MENTION",
}