import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesRepository } from "./roles.repository";
import {
  CreateRolesDto,
  FilterRoleDto,
  RoleUpdateClientDto,
} from "./dto/roles.dto";

import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";

import { UsersService } from "src/users/users.service";
import { ListingParams } from "src/dto/global.dto";
import { ErrorApiWrapperDto, ListingApiWrapperDto } from "src/utilities/dto/util.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository) private rolesRepository: RolesRepository,
    private usersService: UsersService
  ) {}

  async createRole(
    requestClientDto: CreateRolesDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      return await this.rolesRepository.createRole(requestClientDto);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getClientById(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getRoleById(id);
  }

  async getAllRoles(
    filterRoleDto: FilterRoleDto,
    listingParams: ListingParams
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getAllRoles(filterRoleDto, listingParams);
  }

  async findOne(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getRoleById(id);
  }

  async update(id: number, requestUpdateRolesDto: RoleUpdateClientDto) {
    
    return await this.rolesRepository.updateRolesById(
      id,
      requestUpdateRolesDto
    );
  }

  async remove(id: number) {
    await this.rolesRepository.deleteRolesById(id);
    return listingApiWrapper(null, "role deleted successfully");
  }

  async createUserRoleSeeder(roleObject: [] | any[]): Promise<boolean> {
    return await this.rolesRepository
      .createRoleSeeder(roleObject)
      .then(async (roles) => {
        return await this.usersService
          .createUserSeeder()
          .then(() => true)
          .catch(() => false);
      })
      .catch((error) => {
        return false;
      });
  }
}
