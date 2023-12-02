import { EntityRepository, Like, Repository } from "typeorm";
import { University } from "./entities/university.entity";
import { errorApiWrapper, listingApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUniversityDto, FilterUniversityDto } from "./dto/create-university.dto";
import { ListingParams } from "src/dto/global.dto";
import { universityListingMapper, universitySingleMapper, usersListingMapper } from "src/users/user.mapper";
import { UpdateUniversityDto } from "./dto/update-university.dto";

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {

    async insertUniversity(createUniversityDto: CreateUniversityDto) {
        try {
            const university = this.create({
                ...createUniversityDto,
            });
            await this.save(university);
        return university;
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async findAllUniversity(listingParams: ListingParams, filterUniversityDto: FilterUniversityDto) {

        let { page, take } = listingParams;
        take = take || 10;
        page = page || 1;
        const skip = (page - 1) * take;
        let [users, total] = await this.findAndCount({
            relations:["category","category.category_id"],
            where: {
                ...(filterUniversityDto.name && {
                    name: Like(`%${filterUniversityDto.name}%`),
                }),
            },
            order: {
                id: "DESC",
            },
            take: take,
            skip: skip,
        });
        const data = universityListingMapper(users);
        return listingApiWrapperPaginate(data, { page, take, total });
    }

    async getUniversityByUserId(id: number) {
        try {
            const university = await this.findOne({
                relations:["category","category.category_id"],
                where: { id: id },
            });
            const data = universitySingleMapper(university)
            return listingApiWrapper(data, "University By ID");
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async updateUniversityById(id: number, updateUniversityDto: UpdateUniversityDto) {
        try {

            const {name,image,uni_number,state,link,address,email,phone} = updateUniversityDto
            const checkIfExist = await this.findOne(id)
            if (!checkIfExist) {
                throw new NotFoundException(errorApiWrapper("Not Found By this ID"));
            }
            console.log(updateUniversityDto)
            const queryBuilder = this.createQueryBuilder();
            queryBuilder
                .createQueryBuilder()
                .update(University)
                .set({ 
                    ...(name &&{
                        name : name
                    }),
                    ...(image &&{
                        image : image
                    }),
                    ...(uni_number &&{
                        uni_number : uni_number
                    }),
                    ...(link &&{
                        link : link
                    }),
                    ...(address &&{
                        address : address
                    }),
                    ...(email &&{
                        email : email
                    }),
                    ...(phone &&{
                        phone : phone
                    }),
                 })
                .where("id = :id", { id: id })
                .execute();

            return listingApiWrapper(null, "Updated Successfully!");


        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }

    }

    async deleteUniversityById(id: number) {
        try {
            const deleteResponse = await this.softDelete(id);
            if (!deleteResponse.affected) {
                throw new InternalServerErrorException(
                    errorApiWrapper("Error Occured")
                );
            }
            return listingApiWrapper(null, "Deleted successfully!!");
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

}