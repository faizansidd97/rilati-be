import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { EntityRepository, Not, Repository, getRepository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { CreateUserDto, CreateAdminDto } from "./dto/create-user.dto";
import {
  errorApiWrapper,
  listingApiWrapperPaginate,
  listingApiWrapper,
} from "src/utilities/util.service";
import { CompleteRegistrationDto } from "./dto/completeRegistration.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MAKE_HASH_LENGTH } from "src/utilities/constant";
import { ResetPasswordDataDto } from "./dto/reset-password.dto";
import { ResetPasswordPostDataDto } from "./dto/reset-password-post.dto";
import { hashpassword } from "src/helpers/bcrypt.helper";
import { UserDetailsRepository } from "../user-details/user-details.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseUserDto } from "./dto/reponse-dto";
import { usersListingMapper } from "./user.mapper";
import { In } from "typeorm/find-options/operator/In";
import { ListingParams } from "src/dto/global.dto";
import { FilterUserDto } from "src/users/dto/filter-user.dto";
import { getCurrentTime } from "src/helpers/date.helper";
import { makeid } from "src/helpers/util.helper";
import { ConflictException } from "@nestjs/common";
import { Roles } from "src/roles/entities/roles.entity";
import { MapperTypeEnum, MyAtarEnum, PersonaTraitEnum, TasteEnum } from "./auth/auth-role.enum";
import { Category } from "src/categories/entities/category.entity";
import { CareerCategory } from "src/career/entities/career-category.entity";
import { forEach } from "lodash";
import { Industry } from "src/industries/entities/industry.entity";
import { UserDetail } from "src/user-details/entities/user-detail.entity";
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(UserDetailsRepository)
    private userDetailsRepository: UserDetailsRepository,
  ) {
    super();
  }

  async getUsersWithDeleted() {
    const query = this.createQueryBuilder("users").select();
    const users = await query.getMany();
    return users;
  }

  async createAdmin(createAdminDto: CreateAdminDto, getRole) {
    const { email, role_id, password } = createAdminDto;
    const isEmailExist = this.isEmailExist(email);
    if (isEmailExist) {
      throw new BadRequestException(
        errorApiWrapper(`Duplicate email address`, HttpStatus.CONFLICT)
      );
    }

    let passwordhash = await hashpassword(password);

    try {
      const user = await this.save({
        email: email,
        role_id: getRole.data.id,
        password: passwordhash,
        register_hash: makeid(MAKE_HASH_LENGTH),
      });

      return listingApiWrapper(null, "Admin Created Successfully!");
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async createUser(createUserDto: CreateUserDto, roles = null) {
    const { first_name, name, last_name, email, password } = createUserDto;
    try {
      const user = new User();
      user.name = name;
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.role_id = roles.id;
      user.password = await hashpassword(password ? password.toString() : "click123");
      user.register_hash = makeid(MAKE_HASH_LENGTH);
      await this.save(user);
      return user;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }


  async getUsers(
    listingParams: ListingParams | any,
    filterUserDto: FilterUserDto | any
  ) {
    try {
      const { is_contact, status, userIds } = filterUserDto;
      const filteredIsContact = is_contact == 1 ? false : true;
      let { page, take } = listingParams;
      take = take || 10;
      page = page || 1;
      const skip = (page - 1) * take;
      let [users, total] = await this.findAndCount({
        relations: ["detail", "role_id", "industry", "industry.industry_id", "subject", "subject.subject_id"],
        where: {
          role_id: {
            id: Not(1),
            ...(filterUserDto.type && { type: filterUserDto.type }),
          },
          ...(filterUserDto.first_name && {
            first_name: filterUserDto.first_name,
          }),
          ...(filterUserDto.last_name && {
            last_name: filterUserDto.last_name,
          }),
          ...(filterUserDto.status && { status: status }),
          ...(filterUserDto.role_id && { role_id: filterUserDto.role_id }),
        },
        order: {
          id: "DESC",
        },
        take: take,
        skip: skip,
      });
      const data: User[] | ResponseUserDto[] = usersListingMapper(users);
      return listingApiWrapperPaginate(data, { page, take, total });
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  async completeRegistrationUser(
    completeRegistrationDto: CompleteRegistrationDto
  ) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      completeRegistrationDto.password,
      salt
    );
    const currentTime = getCurrentTime();
    const queryBuilder = this.createQueryBuilder("users");
    queryBuilder
      .update(User)
      .set({
        register_hash: currentTime,
        first_name: completeRegistrationDto.firstName,
        last_name: completeRegistrationDto.lastName,
        password: hashedPassword,
      })
      .where("id = :id", { id: completeRegistrationDto.id })
      .execute();

    const user = await this.getUserById(completeRegistrationDto.id);
    return user;
  }

  async getUserById(id) {
    try {
      const user = await this.findOne({
        relations: ["detail", "role_id", "industry", "industry.industry_id", "subject", "subject.subject_id"],
        where: { id: id },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  private async checkIfUserIntroExtro(id:number){
    return getRepository(UserDetail).findOne({
      where:{
        user_id:id
      }
    })
  }

  async getUserByIdWithDetails(id: number) {
    try {
      const result: {
        id: string,
        parent: string,
        name: string,
      }[] = [];
      const users = await this.getUserWithDetails(id);
      // console.log(users);

      const userCheckExtro = await this.checkIfUserIntroExtro(id)

      const {my_atar} = userCheckExtro

      const uniqueIds = new Set();
      for await (const user of users) {

        const userId = `user-id-${user.userId}`;
        const industryId = `industry-id-${user.industryId}`;
        const subjectId = `subject-id-${user.subjectId}`;

        if (!uniqueIds.has(userId)) {
          result.push({
            id: userId,
            parent: "",
            name: `${user?.userName}`,
          });
          uniqueIds.add(userId);
        }

        if (user.industryId && user.industryName && !uniqueIds.has(industryId)) {
          console.log('user.industryId',user.industryId);
          result.push({
            id: industryId,
            parent: userId,
            name: user.industryName,
          });
          uniqueIds.add(industryId);

          const industryRepository = getRepository(Industry);

          const queryBuilder =  industryRepository
            .createQueryBuilder('industry')
            .leftJoinAndSelect('industry.industryDiagraph', 'industryDiagraph') // Join with industryDiagraph relation.
            .leftJoinAndSelect('industryDiagraph.career_category_id', 'careerCategory') // Join with careerCategory.
            .leftJoinAndSelect('careerCategory.relatedCareer', 'relatedCareer') // Join with
            .leftJoinAndSelect('relatedCareer.career_id', 'career') // Join with career.
            .select([
              'career.id as careerId',
              'career.title as careerTitle',
            ])
            queryBuilder.where('industry.id = :industryId', { industryId: user.industryId })
            if(userCheckExtro?.personal_trait === PersonaTraitEnum.INTROVERT){
              queryBuilder.andWhere('career.people_interaction < :range', { range: 5 })
            }
            if(userCheckExtro?.personal_trait === PersonaTraitEnum.EXTROVERT){
              queryBuilder.andWhere('career.people_interaction > :range', { range: 5 })
            }
            //check ATAR for user 
            if (my_atar === MyAtarEnum.BETWEEN_0_10) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 10 });
            } else if (my_atar === MyAtarEnum.BETWEEN_11_20) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 20 });
            } else if (my_atar === MyAtarEnum.BETWEEN_21_30) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 30 });
            } else if (my_atar === MyAtarEnum.BETWEEN_31_40) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 40 });
            } else if (my_atar === MyAtarEnum.BETWEEN_41_50) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 50 });
            } else if (my_atar === MyAtarEnum.BETWEEN_51_60) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 60 });
            } else if (my_atar === MyAtarEnum.BETWEEN_61_70) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 70 });
            } else if (my_atar === MyAtarEnum.BETWEEN_71_80) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 80 });
            } else if (my_atar === MyAtarEnum.BETWEEN_81_90) {
              queryBuilder.andWhere('career.admission_rank <= :maxRange', { maxRange: 90 });
            }

            const industryWithCareers = await queryBuilder.getRawMany();

          const uniqueCareerIds = new Set();
          let seeMorePushed = false;
          let childCount = 0;
          for await (const industryWithCareer of industryWithCareers) {
            console.log('industryWithCareers',industryWithCareer.careerId)

            if (industryWithCareer.careerId !== null && industryWithCareer.careerTitle !== null && !uniqueCareerIds.has(industryWithCareer.careerId) && uniqueCareerIds.size < 5) {
              result.push({
                id: `career-id-${industryWithCareer.careerId}`,
                parent: industryId,
                name: industryWithCareer.careerTitle,
              });
              uniqueCareerIds.add(industryWithCareer.careerId);
            } else if(industryWithCareer.careerId !== null && industryWithCareer.careerTitle !== null && uniqueCareerIds.size > 4) {
              if (!seeMorePushed) {
                result.push({
                  id: `see-more-${industryId}`,
                  parent: industryId,
                  name: "See More",
                });
                seeMorePushed = true;
              }
          
              if (childCount < 5) {
                result.push({
                  id: `career-id-${industryWithCareer.careerId}`,
                  parent: `see-more-${industryId}`,
                  name: industryWithCareer.careerTitle,
                });
                uniqueCareerIds.add(industryWithCareer.careerId);
                childCount++;
              }
            }
          }

        }
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  private mapUserToDTO(user: User) {
    if (!user) {
      return null;
    }

    return {
      attributes: {
        name: user.name,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        industries: user.industry ? this.mapInterests(user.industry, MapperTypeEnum.INDUSTRY) : null,
        subjects: user.subject ? this.mapInterests(user.subject, MapperTypeEnum.SUBJECT) : null,
      },
      id: user.id.toString(),
    };
  }

  private async getUserWithDetails(id: number) {
    const user = await this.findOneUserWithRelations(id);
    return user;
  }

  async findOneUserWithRelations(id: number) {
    
    const preferredTasteQuery = await getRepository(User)
    .createQueryBuilder('user')
    .select([
      'user.id AS userId',
      'user.name AS userName',
      'user.first_name AS userFirstName',
      'user.last_name AS userLastName',
      'industry_id.id AS industryId',
      'industry_id.name AS industryName',
    ])
    .leftJoin('user.industry', 'industry')
    .leftJoin('industry.industry_id', 'industry_id')
    .where('user.id = :id', { id })
    .andWhere('industry.type = :taste', { taste: TasteEnum.PREFERRED })
    .getRawMany();

  // const lessPreferredTasteQuery = getRepository(User)
  //   .createQueryBuilder('user')
  //   .select([
  //     'user.id AS userId',
  //     'user.name AS userName',
  //     'user.first_name AS userFirstName',
  //     'user.last_name AS userLastName',
  //     'industry_id.id AS industryId',
  //     'industry_id.name AS industryName',
  //   ])
  //   .leftJoin('user.industry', 'industry')
  //   .leftJoin('industry.industry_id', 'industry_id')
  //   .where('user.id = :id', { id })
  //   .andWhere('industry.type = :taste', { taste: TasteEnum.LESS_PREFERRED })
  //   .getRawOne();

  // const [preferredTasteResult, lessPreferredTasteResult] = await Promise.all([
  //   preferredTasteQuery,
  //   lessPreferredTasteQuery,
  // ]);

  // Merge the results into a single array of objects
  // const mergedResult = preferredTasteResult.concat(lessPreferredTasteResult);

  // return mergedResult;
  return preferredTasteQuery;
  }

  // private async findOneUserWithRelations(id: number) {
  //   return await getRepository(User).findOne(id, {
  //     relations: [
  //       'industry',
  //       'industry.industry_id',
  //       'industry.industry_id.industryDiagraph',
  //       'industry.industry_id.industryDiagraph.career_category_id',
  //       'industry.industry_id.industryDiagraph.career_category_id.relatedCareer',
  //       'industry.industry_id.industryDiagraph.career_category_id.relatedCareer.career_id',
  //       'subject',
  //       'subject.subject_id',
  //       'subject.subject_id.subjectDiagraph',
  //       'subject.subject_id.subjectDiagraph.career_category_id',
  //       'subject.subject_id.subjectDiagraph.career_category_id.relatedCareer',
  //       'subject.subject_id.subjectDiagraph.career_category_id.relatedCareer.career_id',
  //     ],
  //   });
  // }





  private mapInterests(interests, type: MapperTypeEnum) {
    return interests.map((interest) => ({
      name: type === MapperTypeEnum.INDUSTRY ? interest.industry_id?.name : interest.subject_id?.name,
      type: interest.type,
      ...(type === MapperTypeEnum.INDUSTRY && {
        industryDiagraph: this.mapCareerDiagraph(interest.industry_id?.industryDiagraph),
      }),
      ...(type === MapperTypeEnum.SUBJECT && {
        subjectDiagraph: this.mapCareerDiagraph(interest.subject_id?.subjectDiagraph),
      }),
    }));
  }

  private mapCareerDiagraph(diagraph) {
    if (!diagraph || diagraph.length === 0) {
      return null; // Return null when diagraph is empty or undefined
    }

    const mappedData = diagraph.map((item) => {
      if (!item || !item.career_category_id) {
        console.error('Invalid item in diagraph:', item);
        return { name: null, type: null };
      }
      return {
        name: item.career_category_id?.name || null,
        type: item.career_category_id?.type || null,
      };
    });
    return mappedData;
  }
  async getAllRelatedCategoryCareers(category_id: number) {
    const category = await this.findCategoryWithRelatedCareers(category_id);
    return category;
  }

  private async findCategoryWithRelatedCareers(category_id: number) {
    return await getRepository(Category).findOne(category_id, {
      // relations: ['relatedCareer', 'relatedCareer.career_id'],
      relations: ['relatedCareer'],
    });
  }

  async checkIfUserExist(id: number) {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  async isEmailExist(email: string): Promise<boolean> {
    const isEmailExist = await this.findOne({
      where: {
        email: email,
      },
      withDeleted: true,
    });
    return isEmailExist ? true : false;
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({
        where: {
          email: email,
        },
        relations: [
          "detail",
          "role_id",
        ],
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async updateUserById(user_id, updateUserDto: UpdateUserDto) {
    const { first_name, last_name, email, role_id, status, notification, password, name } = updateUserDto;
    const updateUserObject = {};

    try {
      if (first_name) {
        updateUserObject["first_name"] = first_name;
      }

      if (name) {
        updateUserObject["name"] = name;
      }

      if (last_name) {
        updateUserObject["last_name"] = last_name;
      }
      if (email) {
        const userFound = await this.getUserById(user_id);

        if (userFound !== undefined && userFound.email !== email) {
          const isEmailExist = await this.isEmailExist(email);
          if (isEmailExist) {
            throw new BadRequestException(
              errorApiWrapper(`Duplicate email address`, HttpStatus.CONFLICT)
            );
          }
        }
        updateUserObject["email"] = email;
      }

      if (password) {
        updateUserObject["password"] = await hashpassword(password);;
      }

      if (role_id) {
        updateUserObject["role_id"] = role_id;
      }

      if (status) {
        updateUserObject["status"] = status;
      }

      if (notification) {
        updateUserObject["notification"] = notification;
      }

      const queryBuilder = this.createQueryBuilder("users");
      queryBuilder
        .createQueryBuilder()
        .update(User)
        .set({ ...updateUserObject })
        .where("id = :id", { id: user_id })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUserById(user_id) {
    try {
      const deleteResponse = await this.softDelete(user_id);
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

  async updateHashForResetPassword(resetPasswordDataDto: ResetPasswordDataDto) {
    const user_row = await this.getUserByEmail(resetPasswordDataDto.data.email);
    if (user_row?.id) {
      try {
        const registerHash = makeid(MAKE_HASH_LENGTH);
        const queryBuilder = this.createQueryBuilder("users");
        queryBuilder
          .createQueryBuilder()
          .update(User)
          .set({
            register_hash: registerHash,
          })
          .where("id = :id", { id: user_row.id })
          .execute();
        return { id: user_row.id, register_hash: registerHash };
      } catch (error) {
        throw new InternalServerErrorException(errorApiWrapper(error.message));
      }
    } else {
      throw new BadRequestException(
        errorApiWrapper(`User Does not exist`, HttpStatus.BAD_REQUEST)
      );
    }
  }

  async checkUserHashForResetPassword(user_id, password_hash) {
    try {
      const user = await this.findOneOrFail({
        where: {
          register_hash: password_hash,
          id: user_id,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async resetUserPassword(resetPasswordPostDataDto: ResetPasswordPostDataDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        resetPasswordPostDataDto.password,
        salt
      );
      await this.save({
        id: resetPasswordPostDataDto.id,
        password: hashedPassword,
        register_hash: null,
      });

      const user_row = this.getUserById(resetPasswordPostDataDto.id);
      return user_row;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }
  async updatePassword(user_id: number, password: string): Promise<boolean> {
    try {
      this.update({ id: user_id }, { password: password });
      return true;
    } catch (error) {
      return false;
    }
  }


  async createUserSeeder(users: any[]) {
    try {
      users.forEach(async (user) => {
        await this.save(user);
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
