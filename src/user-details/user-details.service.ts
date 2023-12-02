import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { CreateUserDetailDto } from "./dto/create-user-detail.dto";
import { UpdateUserDetailDto } from "./dto/update-user-detail.dto";
import { UserDetailsRepository } from "./user-details.repository";
import moment from "moment";
import { PatchUserDtoClassUpdate, UpdateUserDto } from "src/users/dto/update-user.dto";
import { Between } from "typeorm";
import { errorApiWrapper, listingApiWrapper, listingApiWrapperPaginate } from "../utilities/util.service";
import { warningsMapper } from "./user-details.mapper";

@Injectable()
export class UserDetailsService {
  currentDate: any;
  futureMonth: any;
  futureMonthEnd: any;

  constructor(
    @InjectRepository(UserDetailsRepository)
    private userDetailsRepository: UserDetailsRepository
  ) {
    this.currentDate = moment().format();
    this.futureMonth = moment(this.currentDate).add(1, "M").format();
    this.futureMonthEnd = moment(this.futureMonth).endOf("month").format();
  }

  async createUserDetails(
    createUserDto: CreateUserDto | CreateUserDetailDto,
    user_id: any
  ) {
    return await this.userDetailsRepository.saveUserDetails(
      createUserDto,
      user_id
    );
  }

  async updateUserDetails(updateUserDto: UpdateUserDto, user_id) {
    return await this.userDetailsRepository.updateUserDetails(
      updateUserDto,
      user_id
    );
  }

  async updateUserDetailsPartialGuardian(patchUserDtoClassUpdate: PatchUserDtoClassUpdate, user_id) {
    return await this.userDetailsRepository.updateUserDetailsPartial(patchUserDtoClassUpdate,user_id);
  }


  //Will get count and data for listing and notifications

  async getConsumerIpcWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          ipc_ends: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(ipcWarningCount, "ipc_ends");
      return listingApiWrapperPaginate(data, { page, take, total });
    }
    return total;
  }

  async getConsumerIcapWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [icapWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          icap_ends: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(icapWarningCount, "icap_ends");

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

  async getConsumerIdrcWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [idrcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          idrc_ends: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(idrcWarningCount, "idrc_ends");

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

  async getProviderLicenseWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [providerLicenseWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          driver_license_expiry: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(
        providerLicenseWarningCount,
        "driver_license_expiry"
      );

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

  async getProviderInsuranceWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [providerInsuranceWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          insurance_expiry: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(
        providerInsuranceWarningCount,
        "insurance_expiry"
      );

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

 
  async getGuardianshipWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          guardian_expiry: Between(
            this.currentDate,
            this.futureMonthEnd
          ),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(ipcWarningCount, "guardian_expiry");

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

  async getAnnualTrainingWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          annual_training_expiry: Between(
            this.currentDate,
            this.futureMonthEnd
          ),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(ipcWarningCount, "annual_training_expiry");

      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

  async getNurseLicenseWarningCount(createWarningDto, listingParams) {
    let { page, take } = listingParams;
    take = take || 10;
    page = page || 1;
    const skip = (page - 1) * take;

    let [nurseLicenseWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          nurse_license: Between(this.currentDate, this.futureMonthEnd),
        },
        ...(createWarningDto.type && {
          take: take,
          skip: skip,
          order: {
            id: "DESC",
          },
        }),
      });

    if (createWarningDto.type) {
      const data = warningsMapper(nurseLicenseWarningCount, "nurse_license");
      return listingApiWrapperPaginate(data, { page, take, total });
    }

    return total;
  }

   //Will get email for notifications warnings

  async getConsumerIpcWarningEmail() {
 
    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          ipc_ends: Between(this.currentDate, this.futureMonthEnd),
        },
      });

      const data = {
        targettedData : ipcWarningCount,
        count : total
      }

    return data;
  }

  async getConsumerIcapWarningEmail() {

    let [icapWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          icap_ends: Between(this.currentDate, this.futureMonthEnd),
        },
      });

      const data = {
        targettedData : icapWarningCount,
        count : total
      }
    return data;
  }

  async getConsumerIdrcWarningEmail() {

    let [idrcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          idrc_ends: Between(this.currentDate, this.futureMonthEnd),
        },
      });

      const data = {
        targettedData : idrcWarningCount,
        count : total
      }

    return data;
  }

  async getProviderLicenseWarningEmail() {

    let [providerLicenseWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          driver_license_expiry: Between(this.currentDate, this.futureMonthEnd),
        },
      });

      const data = {
        targettedData : providerLicenseWarningCount,
        count : total
      }

    return data;
  }

  async getProviderInsuranceWarningEmail() {

    let [providerInsuranceWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          insurance_expiry: Between(this.currentDate, this.futureMonthEnd),
        },
      });
    
      const data = {
        targettedData : providerInsuranceWarningCount,
        count : total
      }

    return data;
  }

  async getGuardianshipWarningEmail() {
    
    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          guardian_expiry: Between(
            this.currentDate,
            this.futureMonthEnd
          ),
        },
      });

      const data = {
        targettedData : ipcWarningCount,
        count : total
      }

    return data;
  }

  async getAnnualTrainingWarningEmail() {


    let [ipcWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          annual_training_expiry: Between(
            this.currentDate,
            this.futureMonthEnd
          ),
        },
      });

      const data = {
        targettedData : ipcWarningCount,
        count : total
      }

    return data;
  }

  async getNurseLicenseWarningEmail() {

    let [nurseLicenseWarningCount, total] =
      await this.userDetailsRepository.findAndCount({
        relations: ["user_id"],
        where: {
          nurse_license: Between(this.currentDate, this.futureMonthEnd),
        },
      });

      const data = {
        targettedData : nurseLicenseWarningCount,
        count : total
      }

    return data;
  }

  async deleteUserDetailsByUserId(user_id) {
    try {
      const deleteResponse = await this.userDetailsRepository.softDelete({user_id:user_id});
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException(
          errorApiWrapper("Error Occured")
        );
      }
      return listingApiWrapper({
        data: "user is deleted successfully!!",
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }
}
