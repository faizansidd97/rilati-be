import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { UsersService } from "./users.service";
import { ListingParams } from "../dto/global.dto";
import { FilterUserDto } from "./dto/filter-user.dto";
import {
  CreateUserDto,
  CreateAdminDto,
  ImportUserDto,
} from "./dto/create-user.dto";
import { PatchUserDtoClassUpdate, UpdateUserDto} from "./dto/update-user.dto";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import { ResponseUsers } from "src/swagger-responses/user-swagger";
import { CurrentUser } from "./auth/jwt/jwt.strategy";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/helpers/file.helper";
import { AuthChangePasswordApiDto } from 'src/users/dto/reset-password-post.dto';

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: true,
  })
  getUserList(
    @Query() listingParams: ListingParams,
    @Query() filterUserDto: FilterUserDto
  ) {
    return this.userService.getUsers(listingParams, filterUserDto);
  }

  @Post("/")
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: false,
  })
  signUp(
    @Body() createUserDto: CreateUserDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.userService.signUp(createUserDto);
  }


  @Get("/:id")
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: false,
  })
  async showUser(
    @Param("id") id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.userService.showUser(id);
  }

  @Get("/auth/me")
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: false,
  })
  async getAuthUser(
    @CurrentUser() user
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.userService.authMe(user.id);
  }

  @Patch("/:userId")
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: false,
  })
  async updateUser(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.userService.updateUser(userId, updateUserDto);
  }


  @Delete("/:id")
  @ApiAuthPermission(true)
  async deleteUser(
    @Param("id") id: string
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.userService.deleteUser(id);
  }

  @Post('/change-password')
  @ApiAuthPermission(true)
  async changePassword(@Body() data:AuthChangePasswordApiDto,@CurrentUser() user): Promise<ListingApiWrapperDto | ErrorApiWrapperDto>{
    return await this.userService.changePassword(data,user);
  }
  
}
