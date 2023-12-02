import { EntityRepository, Like, Repository } from "typeorm";
import { University } from "./entities/university.entity";
import { errorApiWrapper, listingApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUniversityDto, FilterUniversityDto } from "./dto/create-university.dto";
import { ListingParams } from "src/dto/global.dto";
import { universityListingMapper, universitySingleMapper, usersListingMapper } from "src/users/user.mapper";
import { UpdateUniversityDto } from "./dto/update-university.dto";
import { UniversityCategory } from "./entities/university-category.entity";

@EntityRepository(UniversityCategory)
export class UniversityCategoryRepository extends Repository<UniversityCategory> {

}