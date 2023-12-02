import { EntityRepository, Like, Repository } from "typeorm";
import { errorApiWrapper, listingApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ListingParams } from "src/dto/global.dto";
import { universityListingMapper, universitySingleMapper, usersListingMapper } from "src/users/user.mapper";
import { CareerCategory } from "./entities/career-category.entity";

@EntityRepository(CareerCategory)
export class CareerCategoryRepository extends Repository<CareerCategory> {

}