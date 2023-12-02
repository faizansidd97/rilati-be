import { EntityRepository, Like, Not, Repository, getRepository } from "typeorm";
import { Career } from "./entities/career.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto, FilterCategoryDto } from "src/categories/dto/create-category.dto";
import { UpdateCategoryDto } from "src/categories/dto/update-category.dto";
import { Category } from "src/categories/entities/category.entity";
import { ListingParams } from "src/dto/global.dto";
import { careerListingMapper, careerSingleMapper, categoryListingMapper, categorySingleMapper } from "src/users/user.mapper";
import { listingApiWrapper, errorApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { CountTypeEnum, CreateCareerDto, FilterCareerDto, UpdateCountDto } from "./dto/create-career.dto";
import { UpdateCareerDto } from "./dto/update-career.dto";
import { UniversityCategory } from "src/university/entities/university-category.entity";
import { CareerAtarSortType, CareerSortType } from "src/utilities/constant";
import { CareerLike } from "src/career-likes/entities/career-like.entity";
import { User } from "src/users/entities/user.entity";


@EntityRepository(Career)
export class CareerRepository extends Repository<Career> {

    async insertCareer(createCareerDto: CreateCareerDto) {
        try {
            const career = this.create({
                ...createCareerDto,
            });
            await this.save(career);
            return career;
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async findAllCareer(listingParams: ListingParams, filterCareerDto: FilterCareerDto) {

        let { page, take } = listingParams;
        let { title, years_needed, atar, sort_by,user_id,potential ,work_life_balance,job_help_people,
            job_help_environment,scope_of_skill,status_in_company,course_cost } = filterCareerDto
        let total = 0;
        let careers = null;
        let remainingCareers = null;
            console.log(filterCareerDto)
        // sort_by = sort_by || CareerSortType.DESC
        take = take || 10;
        page = page || 1;
        const skip = (page - 1) * take;
        [careers, total] = await this.findAndCount({
            relations: ["category", "category.category_id", "educationCategory", "educationCategory.category_id"],
            where: {
                ...(title && {
                    title: Like(`%${title}%`),
                }),
            },
            order: {
                ...(sort_by && {
                    id: sort_by === 'DESC' ? 'DESC' : 'ASC',
                }),
                ...(years_needed === CareerAtarSortType.YES && {
                    years_needed: 'DESC',
                }),
                ...(atar && atar === CareerAtarSortType.YES && {
                    admission_rank: 'DESC',
                }),
                ...(course_cost && course_cost === CareerAtarSortType.YES && {
                    cost_course: 'DESC',
                }),
                ...(status_in_company && status_in_company === CareerAtarSortType.YES && {
                    status_in_company: 'DESC',
                }),
                ...(scope_of_skill && scope_of_skill === CareerAtarSortType.YES && {
                    scope_of_skill: 'DESC',
                }),
                ...(job_help_environment && job_help_environment === CareerAtarSortType.YES && {
                    job_help_environment: 'DESC',
                }),
                ...(job_help_people && job_help_people === CareerAtarSortType.YES && {
                    job_help_people: 'DESC',
                }),
                ...(work_life_balance && work_life_balance === CareerAtarSortType.YES && {
                    work_life_balance: 'DESC',
                }),
                ...(potential && potential === CareerAtarSortType.YES && {
                    potential: 'DESC',
                }),
                ...(title && {
                    title: sort_by === 'DESC' ? 'DESC' : 'ASC',
                }),
            },
            ...(!title && {
                take: take,
                skip: skip,
            }),
        });
        // If the title is provided, fetch the remaining data without sorting

        if (careers.length > 0) {
            if (title) {
                let [remainingCareers, carrerTotal] = await this.findAndCount({
                    relations: ["category", "category.category_id", "educationCategory", "educationCategory.category_id"],
                    where: {
                        title: Not(Like(`%${title}%`)),
                    },
                    take: take, // Adjust take value to get the remaining data
                    skip: skip,
                });
                total = carrerTotal;

                // Concatenate the remaining data with the sorted data
                if (remainingCareers.length > 0) {
                    careers = careers.concat(remainingCareers);
                }
            }
            // console.log(careers)
            for await (const iterator of careers) {
                iterator.universities = [];
                for await (const uni of iterator?.educationCategory) {
                    const universities = await getRepository(UniversityCategory).find({
                        relations: ["category_id", "uni_id"],
                        where: {
                            category_id: {
                                id: uni?.category_id?.id
                            }
                        }
                    })
                    iterator.universities.push(...universities);
                }
                Object.assign(iterator,{userLike: await this.checkIfuserLike(user_id,iterator?.id)})
            }
        }
        const data = careerListingMapper(careers);
        return listingApiWrapperPaginate(data, { page, take, total });
    }

    async checkIfuserLike(user_id:number,career_id:number):Promise<Boolean>{
        return !!(await getRepository(CareerLike).findOne({
            where:{
                user_id:user_id,
                career_id:career_id
            }
        }))
    }

    async getCareerById(id: number) {
        try {
            const careers = await this.find({
                relations: ["category", "category.category_id", "educationCategory", "educationCategory.category_id"],
                where: { id: id },
            });
            if (careers.length > 0) {
                for await (const iterator of careers) {
                    iterator.universities = [];
                    for await (const uni of iterator?.educationCategory) {

                        const universities = await getRepository(UniversityCategory).find({
                            relations: ["category_id", "uni_id"],
                            where: {
                                category_id: {
                                    id: uni?.category_id?.id
                                }
                            }
                        })
                        iterator.universities.push(...universities);
                    }
                }
            }
            const data = careerSingleMapper(careers)
            return listingApiWrapper(data, "Career By ID");
        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async updateCount(id:number , updateCountDto: UpdateCountDto,user: User){
        try {
            const { count_type } = updateCountDto;

            const checkIfExist = await this.findOne(id)
            if (!checkIfExist) {
                throw new NotFoundException(errorApiWrapper("Not Found By this ID"));
            }

            const checkIfAlreadLiked = await this.checkIfuserLike(user?.id,id)

            if(!checkIfAlreadLiked){

                const createLike =  getRepository(CareerLike).create({
                        user_id:user?.id,
                        career_id:id
                })

                await  getRepository(CareerLike).save(createLike)

                await this.createQueryBuilder()
                     .update(Career)
                     .set({
                         ...(count_type === CountTypeEnum.LIKE_COUNT && {
                             like_count: () => "like_count + 1",
                         }),
                         ...(count_type === CountTypeEnum.SHARE_COUNT && {
                             share_count: () => "share_count + 1",
                         }),
                         ...(count_type === CountTypeEnum.VIEW_COUNT && {
                             view_count: () => "view_count + 1",
                         }),
                     })
                     .where("id = :id", { id: id })
                     .execute();
            }else{

               await getRepository(CareerLike).createQueryBuilder()
                        .softDelete()
                        .where({
                            user_id: user?.id,
                            career_id: id,
                        })
                        .execute();

                    await this.createQueryBuilder()
                    .update(Career)
                    .set({
                        ...(count_type === CountTypeEnum.LIKE_COUNT && {
                            like_count: () => "like_count - 1",
                        }),
                        ...(count_type === CountTypeEnum.SHARE_COUNT && {
                            share_count: () => "share_count - 1",
                        }),
                        ...(count_type === CountTypeEnum.VIEW_COUNT && {
                            view_count: () => "view_count - 1",
                        }),
                    })
                    .where("id = :id", { id: id })
                    .execute();
            }

            return listingApiWrapper(null, "Updated Successfully!");

        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }
    }

    async updateCareerById(id: number, updateCareerDto: UpdateCareerDto) {
        try {
            const { categories, education_category, ...rest } = updateCareerDto;

            const checkIfExist = await this.findOne(id)
            if (!checkIfExist) {
                throw new NotFoundException(errorApiWrapper("Not Found By this ID"));
            }

            const queryBuilder = this.createQueryBuilder();
            queryBuilder
                .createQueryBuilder()
                .update(Career)
                .set(rest)
                .where("id = :id", { id: id })
                .execute();

            return listingApiWrapper(null, "Updated Successfully!");

        } catch (error) {
            throw new InternalServerErrorException(errorApiWrapper(error.message));
        }

    }

    async deleteCareerById(id: number) {
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