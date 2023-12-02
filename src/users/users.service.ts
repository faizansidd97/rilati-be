import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { ListingParams } from "src/dto/global.dto";
import { MailService } from "src/mail/mail.service";
import { RolesRepository } from "src/roles/roles.repository";
import { UserDetailsService } from "src/user-details/user-details.service";
import {
  ListingApiWrapperDto,
  ErrorApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import { CompleteRegistrationDto } from "./dto/completeRegistration.dto";
import {
  CreateUserDto,
  CreateAdminDto,
  ImportUserDto,
} from "./dto/create-user.dto";
import { FilterUserDto } from "./dto/filter-user.dto";
import { ResetPasswordPostDataDto } from "./dto/reset-password-post.dto";
import { ResetPasswordDataDto } from "./dto/reset-password.dto";
import {
  PatchUserDtoClassUpdate,
  UpdateUserDto,
  UserGuardianEnum,
} from "./dto/update-user.dto";
import {
  filesListingMapper,
  singleUserListingMaper,
  userAuthMeMapper,
  userSingleMapper,
} from "./user.mapper";
import { UsersRepository } from "./users.repository";
import { makeid, objectValidation } from "../helpers/util.helper";
import { User } from "./entities/user.entity";
import csv from "csv-parser";
import * as fs from "fs";
import { hashpassword } from "src/helpers/bcrypt.helper";
import path from "path";
import { Connection } from "typeorm";
import moment from "moment-timezone";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "src/roles/entities/roles.entity";
import { AuthService } from "./auth/auth.service";
import { AuthChangePasswordApiDto } from 'src/users/dto/reset-password-post.dto';
import * as bcrypt from "bcryptjs";
import { IntrestedIndustriesService } from "src/intrested-industries/intrested-industries.service";
import { FavoriteSubjectsService } from "src/favorite-subjects/favorite-subjects.service";
import { TasteEnum } from "./auth/auth-role.enum";
@Injectable()
export class UsersService {
  constructor(
    @Inject(UserDetailsService) private _userDetailsService: UserDetailsService,
    @Inject(MailService) private mailService: MailService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
    @InjectConnection() private readonly connection: Connection,
    private favoriteSubjectsService: FavoriteSubjectsService,
    private intrestedIndustriesService: IntrestedIndustriesService,
  ) { }

  async signUp(
    createUserDto: CreateUserDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {

    const { role_id,
       password,
        email,
        favorite_subject,
        least_favorite_subject,
        least_industries_interest,
        industries_interest,
        my_atar,
        start_working,
        newsletter
       } = createUserDto;
       
    const role = await this.rolesRepository.getIfRoleExist(role_id);
    const isEmailExist = await this.usersRepository.isEmailExist(email);
    if (isEmailExist) {
      throw new ConflictException(
        errorApiWrapper(`Email Already Exist!`, HttpStatus.CONFLICT)
      );
    }
    if (!password) {
      Object.assign(createUserDto, {
        password: Math.floor(100000 + Math.random() * 900000),
      });
    }
    const user = await this.usersRepository.createUser(createUserDto, role);
    if (!user) {
      throw new InternalServerErrorException(
        errorApiWrapper("Error Occured", HttpStatus.INTERNAL_SERVER_ERROR)
      );
    }
    if(favorite_subject && favorite_subject.length > 0){

      for await (const iterator of favorite_subject) {
        const data = {
          user_id : user?.id,
          subject_id: iterator,
          type: TasteEnum.PREFERRED
        }
        await this.favoriteSubjectsService.create(data)
      }
    }
    if(least_favorite_subject && least_favorite_subject.length > 0){
      for await (const iterator of least_favorite_subject) {
        const data = {
          user_id : user?.id,
          subject_id: iterator,
          type: TasteEnum.LESS_PREFERRED
        }
        await this.favoriteSubjectsService.create(data)
      }
    }
    if(least_industries_interest && least_industries_interest.length > 0){
      for await (const iterator of least_industries_interest) {
        const data = {
          user_id : user?.id,
          industry_id: iterator,
          type: TasteEnum.LESS_PREFERRED
        }
        await this.intrestedIndustriesService.create(data)
      }
    }
    if(industries_interest && industries_interest.length > 0){
      for await (const iterator of industries_interest) {
        const data = {
          user_id : user?.id,
          industry_id: iterator,
          type: TasteEnum.PREFERRED
        }
        await this.intrestedIndustriesService.create(data)
      }
    }

    const createDetails = await this.createDetails(
      createUserDto,
      user,
      role
    );
    if (!createDetails) {
      throw new InternalServerErrorException(
        errorApiWrapper("Error Occured", HttpStatus.INTERNAL_SERVER_ERROR)
      );
    }
    const data = singleUserListingMaper(user, role);
    return listingApiWrapper(data);
  }

  async update(id: number, updateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async createDetails(
    createUserDto: CreateUserDto,
    user: User,
    role: Roles
  ): Promise<boolean> {
    try {
      const userDetails = await this._userDetailsService.createUserDetails(
        createUserDto,
        user.id
      );
  
      // await this.mailService.sendUserInvitation(user, createUserDto.password);

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async signUpAdmin(
    createAdminDto: CreateAdminDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    const { role_id } = createAdminDto;
    await this.rolesRepository.checkIfRoleExist(role_id);
    const getRole = await this.rolesRepository.getRoleById(role_id);
    const user = await this.usersRepository.createAdmin(
      createAdminDto,
      getRole
    );

    if (!user) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    }

    return listingApiWrapper(null, "Admin Created Successfully!");
  }

  async getUsers(
    listingParams: ListingParams,
    filterUserDto: FilterUserDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {

    const getUsers = await this.usersRepository.getUsers(
      listingParams,
      filterUserDto
    );
    if (!getUsers) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    }
    return getUsers;
  }

  async sendUserInvitation(user_id: any) {
    const user = await this.usersRepository.getUserById(user_id);
    if (user) {
      await this.mailService.sendUserInvitation(user, "click123");
    }
    return listingApiWrapper(singleUserListingMaper(user));
  }

  async showUser(user_id: number) {
    try {
      const user = await this.usersRepository.getUserById(user_id);
      const data = userSingleMapper(user);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async authMe(user_id: number) {
    try {
      const user = await this.usersRepository.getUserById(user_id);
      const data = userAuthMeMapper(user);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getUserById(user_id: number) {
    return await this.usersRepository.getUserById(user_id);
  }

  async getUserByIdWithDetails(id:number){
    return await this.usersRepository.getUserByIdWithDetails(id)
  }

  async updateUserGuardianShip(
    user_id: string | number,
    patchUserDtoClassUpdate: PatchUserDtoClassUpdate
  ) {
    const { guardian_expiry, guardian_type } = patchUserDtoClassUpdate;

    const updatedRecord =
      await this._userDetailsService.updateUserDetailsPartialGuardian(
        patchUserDtoClassUpdate,
        user_id
      );

    return listingApiWrapper("Updated Successfully!");
  }

  async updateUser(user_id: string | number, updateUserDto: UpdateUserDto) {
    await this.rolesRepository.checkIfRoleExist(updateUserDto.role_id);
    let updateUser = await this.usersRepository.updateUserById(
      user_id,
      updateUserDto
    );
    if (!updateUser) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    }

    const {favorite_subject,least_favorite_subject,least_industries_interest,industries_interest} = updateUserDto

    if(favorite_subject){
       await this.favoriteSubjectsService.destroyAll(+user_id,TasteEnum.PREFERRED)
      if(favorite_subject.length > 0){
        for await (const iterator of favorite_subject) {
          const data = {
            user_id : +user_id,
            subject_id: iterator,
            type: TasteEnum.PREFERRED
          }
          await this.favoriteSubjectsService.create(data)
        }
      }
    }
    if(least_favorite_subject ){
      await this.favoriteSubjectsService.destroyAll(+user_id,TasteEnum.LESS_PREFERRED)
      if(least_favorite_subject.length > 0){
        for await (const iterator of least_favorite_subject) {
          const data = {
            user_id : +user_id,
            subject_id: iterator,
            type: TasteEnum.LESS_PREFERRED
          }
          await this.favoriteSubjectsService.create(data)
        }
      }
    }
    if(least_industries_interest ){
      await this.intrestedIndustriesService.destroyAll(+user_id,TasteEnum.LESS_PREFERRED)
        if(least_industries_interest.length > 0){
          for await (const iterator of least_industries_interest) {
            const data = {
              user_id : +user_id,
              industry_id: iterator,
              type: TasteEnum.LESS_PREFERRED
            }
            await this.intrestedIndustriesService.create(data)
          }
      }
    }
    if(industries_interest){
      await this.intrestedIndustriesService.destroyAll(+user_id,TasteEnum.PREFERRED)
      if(industries_interest.length > 0){
        for await (const iterator of industries_interest) {
          const data = {
            user_id : +user_id,
            industry_id: iterator,
            type: TasteEnum.PREFERRED
          }
          await this.intrestedIndustriesService.create(data)
        }
      }
    }


    const userDetails = await this._userDetailsService.updateUserDetails(
      updateUserDto,
      user_id
    );
 
    const user = await this.usersRepository.getUserById(+user_id);
    const data = userSingleMapper(user);
    return listingApiWrapper(data);
  }

  async deleteUser(user_id: string) {
    await this.usersRepository.deleteUserById(user_id);
    await this._userDetailsService.deleteUserDetailsByUserId(user_id)
    return listingApiWrapper(null, "user is deleted successfully");
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }


  async completeRegistrationUser(
    completeRegistrationDto: CompleteRegistrationDto
  ) {
    return this.usersRepository.completeRegistrationUser(
      completeRegistrationDto
    );
  }

  async updateHashForResetPassword(resetPassword: ResetPasswordDataDto) {
    return this.usersRepository.updateHashForResetPassword(resetPassword);
  }

  async checkUserHashForResetPassword(user_id: any, hash: any) {
    return this.usersRepository.checkUserHashForResetPassword(user_id, hash);
  }

  async resetUserPassword(resetPasswordPostDataDto: ResetPasswordPostDataDto) {
    return this.usersRepository.resetUserPassword(resetPasswordPostDataDto);
  }

  async updatePassword(user_id: number, password: string) {
    return this.usersRepository.updatePassword(user_id, password);
  }

  async checkIfUserExist(id: string | number) {
    return await this.usersRepository.checkIfUserExist(+id);
  }

  async createUserSeeder() {
    const users = [
      {
        email: "admin@gmail.com",
        first_name: "Super Admin",
        last_name: "Admin",
        password: await hashpassword("hphs86"),
        register_hash: makeid(32),
        role_id: 1,
      },
      {
        email: "user@mailinator.com",
        first_name: "User",
        last_name: "Foster",
        password: await hashpassword("hphs86"),
        register_hash: makeid(32),
        role_id: 12,
      },
    ];
    return await this.usersRepository.createUserSeeder(users);
  }

  async importFilesLinks(): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const directoryPath = path.join(process.cwd(), "public/imports");
      const files = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .map((item) => `${process.env.APP_URL}/imports/${item.name}`);
      const data = filesListingMapper(files);

      return listingApiWrapper(data, null);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getAllUsersCount() {
    const count = this.usersRepository.count();
    return count;
  }

  async activeUsersPercentage() {
    const count = this.usersRepository.count({
      where: {
        status: 1,
      },
    });

    return count;
  }

  async deactiveUsersPercentage() {
    const count = this.usersRepository.count({
      where: {
        status: 0,
      },
    });

    return count;
  }

  async getRoleCount() {
    const rolesWithCount = this.usersRepository
      .createQueryBuilder("users")
      .select([`COUNT('users.role_id') as roleCount`, "roles.name"])
      .leftJoin("users.role_id", "roles")
      .groupBy("users.role_id");

    const count = await rolesWithCount.execute();
    return count;
  }

  async totalNumberOfUsersWithCount(role_id = null) {
    console.log(role_id);
    const date = moment.now();

    var mS = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const query = await this.connection.query(`select (
          CASE 
            WHEN Month(created_at) = 1 then 'JAN' 
            WHEN Month(created_at) = 2 then 'FEB' 
            WHEN Month(created_at) = 3 then 'MAR' 
            WHEN Month(created_at) = 4 then 'APR'
            WHEN Month(created_at) = 5 then 'MAY'
            WHEN Month(created_at) = 6 then 'JUNE'
            WHEN Month(created_at) = 7 then 'JULY'
            WHEN Month(created_at) = 8 then 'AUG'
            WHEN Month(created_at) = 9 then 'SEP'
            WHEN Month(created_at) = 10 then 'OCT'
            WHEN Month(created_at) = 11 then 'NOV'
            WHEN Month(created_at) = 12 then 'DEC'
          ELSE Month(created_at)
        END
      )  as month,count(id) as userCount ,user.created_at
    from user
    WHERE YEAR(created_at) = YEAR (Now())
    AND (CASE WHEN ${role_id} != 'null' THEN role_id = ${role_id} ELSE role_id > 0 END)
    GROUP BY year(created_at),month(created_at)
    ORDER BY year(created_at),month(created_at)`);

    const totalNumberOfUsersWithCount = [];
    const totalNumberOfUsersWithCountWithAllMonths = [];

    query.forEach((element) => {
      const userObj = {
        month: element.month,
        userCount: element.userCount,
      };

      totalNumberOfUsersWithCount.push(userObj);
    });

    // const indexs = mS.findIndex(item => query.some(entry => entry.month === item));

    mS.forEach((ele) => {
      const userObj = {
        month: ele,
        userCount: 0,
      };
      totalNumberOfUsersWithCountWithAllMonths.push(userObj);
    });

    // do this
    const result = totalNumberOfUsersWithCountWithAllMonths.map((item) => {
      const newItem = item; // here we define a new object that is the same as your object that is currently looped up to in your array

      // loop your second array over this currently looped to object, seeing if the name matches
      totalNumberOfUsersWithCount.forEach((item2) => {
        if (item.month == item2.month) {
          newItem.userCount = item2.userCount; // if they do set a new property for your new object called info as the info from item 2 of this array
        }
      });

      // return this new object whether or not there was a match for the name property
      return newItem;
    });

    return result;
  }
  async changePassword(data, user) {
    try {
      if (await bcrypt.compare(data.old_password, user.password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(
          data.new_password,
          salt
        );
        await this.usersRepository.updatePassword(user.id, hashedPassword);

        return listingApiWrapper("Password changed Successfuly!");
      } else {
        return errorApiWrapper("Current password is incorrect");
      }
    } catch (error) {
      return errorApiWrapper(error);
    }

    return listingApiWrapper(data);
  }

}
