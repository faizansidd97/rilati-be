import { EntityRepository, Like, Repository } from "typeorm";
import { errorApiWrapper, listingApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ListingParams } from "src/dto/global.dto";
import { categoryListingMapper, categorySingleMapper, universityListingMapper, universitySingleMapper, usersListingMapper } from "src/users/user.mapper";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto, FilterCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {

    async insertCategory(createCategoryDto: CreateCategoryDto) {
        try {
            const category = this.create({
                ...createCategoryDto,
            });
            await this.save(category);
            return listingApiWrapper(null, `Category Successfully Added!`);
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async findAllCategories(listingParams: ListingParams, filterCategoryDto: FilterCategoryDto) {

        let { page, take } = listingParams;
        take = take || 10;
        page = page || 1;
        const skip = (page - 1) * take;
        let [categories, total] = await this.findAndCount({
            where: {
                ...(filterCategoryDto.name && {
                    name: Like(`%${filterCategoryDto.name}%`),
                }),
                ...(filterCategoryDto.type && {
                    type: filterCategoryDto.type,
                }),
            },
            order: {
                id: "DESC",
            },
            take: take,
            skip: skip,
        });
        const data = categoryListingMapper(categories);
        return listingApiWrapperPaginate(data, { page, take, total });
    }

    async getCategoryById(id: number) {
        try {
            const category = await this.findOne({
                where: { id: id },
            });
            const data = categorySingleMapper(category)
            return listingApiWrapper(data, "Category By ID");
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
        try {

            const checkIfExist = await this.findOne(id)
            if (!checkIfExist) {
                throw new NotFoundException(errorApiWrapper("Not Found By this ID"));
            }

            const queryBuilder = this.createQueryBuilder();
            queryBuilder
                .createQueryBuilder()
                .update(Category)
                .set({ ...updateCategoryDto })
                .where("id = :id", { id: id })
                .execute();

            return listingApiWrapper(null, "Updated Successfully!");

        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }

    }

    async deleteCategoryById(id: number) {
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