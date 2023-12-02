import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CareerEduCategoryService } from "src/career-edu-category/career-edu-category.service";
import { CareerEduCategory } from "src/career-edu-category/entities/career-edu-category.entity";
import { CareerLikesService } from "src/career-likes/career-likes.service";
import { ListingParams } from "src/dto/global.dto";
import { User } from "src/users/entities/user.entity";
import { listingApiWrapper } from "src/utilities/util.service";
import { getRepository } from "typeorm";
import { data } from "src/career/json/career.json";
import { CareerCategoryRepository } from "./career-category.repository";
import { CareerRepository } from "./career.repository";
import {
  CreateCareerDto,
  FilterCareerDto,
  UpdateCountDto,
} from "./dto/create-career.dto";
import { UpdateCareerDto } from "./dto/update-career.dto";
import { Career } from "./entities/career.entity";

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(CareerRepository)
    @InjectRepository(CareerCategoryRepository)
    private careerEduCategoryService: CareerEduCategoryService,
    private careerCategoryRepository: CareerCategoryRepository,
    private careerRepository: CareerRepository,
    private careerLikeService: CareerLikesService
  ) {}
  async onModuleInit() {
    
    // for await (const iterator of data) {
    //   console.log("a", iterator?.cost_course);

    //         await this.careerRepository.createQueryBuilder()
    //           .update(Career)
    //           .set({
    //             cost_course: iterator?.cost_course
    //            })
    //           .where("career_number = :career_number", { career_number: iterator.career_number })
    //           .execute();
    // }
    // const categoryArray = [
    //   "Construction and Extraction Occupation",
    //   "Information Technology",
    //   "Civil Services",
    //   "Law",
    //   "Community and Social Service Occupations",
    //   "Transportation and Material Moving Occupation",
    //   "Business and Management",
    //   "Healthcare and Medicine",
    //   "Arts, Media, and Communication",
    //   "Education and Training",
    //   "Public Service and Government",
    // ];

    // const universityCategoryArray = [
    //   "Law",
    //   "Information Technology",
    //   "Health",
    //   "Education",
    //   "Public or Civil Services",
    //   "Engineering & Related Technologies",
    //   "Tourism, Hospitality & Personal Services",
    //   "Society & Culture",
    //   "Natural & Physical Sciences",
    //   "Management & Commerce",
    //   "Creative Arts",
    //   "Architecture & Building",
    //   "Environment & Related Studies",
    //   "Agriculture"
    // ];

    // await getRepository(SubjectCareerDiagraph).delete({});

    // await getRepository(IndustyCareerDiagraph).delete({});

    // for await (const category of universityCategoryArray) {

    //   const findCategory = await getRepository(Category).findOne({
    //     where: {
    //       name: Like(`%${category}%`),
    //       type: CategoryType.UNIVERSITY
    //     },
    //   });

    //   if (category == "Law") {

    //    const uniDiagraphArray1 = ["s3", "s8", "i11", "i14", "i16", "i18"];

    //     for await (const iterator of uniDiagraphArray1) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })
    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Information Technology") {

    //     const uniDiagraphArray2 = ["s3", "s8", "i4", "i6", "i8", "i11", "i12", "i13", "i16", "i1", "i23", "i24"];

    //     for await (const iterator of uniDiagraphArray2) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }

    //   }
    //   if (category == "Health") {

    //   const uniDiagraphArray3 = ["s1", "s6", "i3", "i5", "i18"];

    //     for await (const iterator of uniDiagraphArray3) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Education") {

    //    const uniDiagraphArray4 = ["s4", "i7", "i10", "i13", "i18", "i20", "i22", "i23"];

    //     for await (const iterator of uniDiagraphArray4) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }

    //   }
    //   if (category == "Public or Civil Services") {

    // const uniDiagraphArray5 = ["s3", "s8", "i8", "i11", "i12", "i16", "i20", "i22"];

    //     for await (const iterator of uniDiagraphArray5) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Engineering & Related Technologies") {

    // const uniDiagraphArray6 = ["s5", "s6", "i4", "i10", "i13", "i15", "i17", "i18", "i19", "i20", "i22"];

    //      for await (const iterator of uniDiagraphArray6) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Tourism, Hospitality & Personal Services") {

    //  const uniDiagraphArray7 = ["s2", "s6", "i3", "i4", "i18", "i21", "i24"];

    //     for await (const iterator of uniDiagraphArray7) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Society & Culture") {

    // const uniDiagraphArray8 = ["s1", "i2", "i12", "i18"];

    //     for await (const iterator of uniDiagraphArray8) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })
    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)
    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })
    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)
    //       }
    //     }
    //   }
    //   if (category == "Natural & Physical Sciences") {

    //   const uniDiagraphArray9 = ["s5", "s8", "i6", "i13", "k1"];

    //     for await (const iterator of uniDiagraphArray9) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Management & Commerce") {

    //  const uniDiagraphArray10 = ["s3", "s7", "i7", "i9"];

    //     for await (const iterator of uniDiagraphArray10) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Creative Arts") {

    //   const uniDiagraphArray11 = ["s1", "s6", "s7", "i5", "i9", "i18", "i19", "i20", "i21"];

    //     for await (const iterator of uniDiagraphArray11) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Architecture & Building") {

    //   const uniDiagraphArray12 = ["s1", "s5", "i17", "i18", "i21"];

    //     for await (const iterator of uniDiagraphArray12) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    //   if (category == "Environmental & Related Studies") {

    // const uniDiagraphArray13 = ["s1", "i1", "i10", "i17", "i18"];

    //     for await (const iterator of uniDiagraphArray13) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }

    //   if (category == "Agriculture") {

    //     const uniDiagraphArray13 = ["s1", "i1", "i10", "i17", "i18"];

    //     for await (const iterator of uniDiagraphArray13) {
    //       if (iterator.startsWith("s")) {

    //         const findSubject = await getRepository(Subject).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveSubjectDiagraph =  getRepository(SubjectCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           subject_id:findSubject?.id
    //         })

    //         await getRepository(SubjectCareerDiagraph).save(saveSubjectDiagraph)

    //       }else{

    //         const findIndustry = await getRepository(Industry).findOne({
    //           where:{
    //             code: iterator
    //           }
    //         })

    //         const saveIndustryDiagraph =  getRepository(IndustyCareerDiagraph).create({
    //           career_category_id: findCategory?.id,
    //           industry_id:findIndustry?.id
    //         })

    //         await getRepository(IndustyCareerDiagraph).save(saveIndustryDiagraph)

    //       }

    //     }
    //   }
    // }
    // console.log(true);

    // const filePath = path.join(process.cwd(), 'public', 'files', 'data.json');
    // const filePath = path.join(process.cwd(), 'public', 'insprational.json');

    // try {
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // const jsonData = JSON.parse(fileContents);
    // const {data} = jsonData
    // console.log(jsonData.data);

    // for await (const iterator of data) {
    //   const data = getRepository(InspirationalPerson).create({
    //     name : iterator?.name,
    //     inspirational_id : iterator?.id,
    //     description : iterator?.description,
    //     occupation : iterator?.occupation,
    //     education : iterator?.education,
    //     career_path : iterator?.career_path,
    //     image : `https://api-be.rilati.com/files/${iterator?.id}`,
    //   })
    //   await getRepository(InspirationalPerson).save(data)
    // }
    // console.log("success!")

    //   for await (const iterator of jsonData.data) {
    //     console.log(iterator.career_number,iterator.atar)

    //     await this.careerRepository.createQueryBuilder()
    //           .update(Career)
    //           .set({
    //             admission_rank: iterator.atar
    //            })
    //           .where("career_number = :career_number", { career_number: iterator.career_number })
    //           .execute();
    //   }
    // } catch (error) {
    //   if (error.code === 'ENOENT') {
    //     console.error('File not found:', filePath);
    //   } else {
    //     console.error('Error reading or parsing JSON file:', error);
    //   }
    // }

    // filenames.forEach(file => {
    //   const { name } = path.parse(file);
    //     console.log(name);
    // });

    // for await (const iterator of filenames) {
    //   const { name } = path.parse(iterator);
    //     // console.log(name);

    //     const pathImages  = `https://api-be.rilati.com/files/${iterator}`

    //     await this.careerRepository.createQueryBuilder()
    //           .update(Career)
    //           .set({
    //             image: pathImages
    //            })
    //           .where("career_number = :career_number", { career_number: name })
    //           .execute();
    // }

    // for await (const iterator of MOCKED_RESPONSE.data) {
    //   console.log(iterator.career_number)
    // }

    // fs.readFile('./data.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Error reading JSON file:', err);
    //     return;
    //   }

    //   try {
    //     const jsonData = JSON.parse(data);
    //     for (const iterator of jsonData.data) {
    //       console.log(iterator.career_number);
    //     }
    //   } catch (error) {
    //     console.error('Error parsing JSON:', error);
    //   }
    // });

    // const career =  this.careerRepository.create({
    //   career_number:iterator?.career_number,
    //   job_description:iterator?.job_description,
    //   description_study:iterator?.description_of_study,
    //   average_gpa:iterator?.average_gpa,
    //   internship_needed:iterator?.internship_needed,
    //   cost_course:iterator?.average_cost,
    //   precision_work:iterator?.precision_work,
    //   job_satisfaction:iterator?.job_satisfaction,
    //   job_stress:iterator?.job_stress,
    //   work_hours:iterator?.work_hours,
    //   work_life_balance:iterator?.work_life_balance,
    //   scope_of_skill:iterator?.scope_of_skill,
    //   autonomy:iterator?.autonomy_freedom,
    //   physical_stress:iterator?.physical_stress,
    //   mental_stress:iterator?.mental_stress,
    //   team_reliance:iterator?.team_reliance,
    //   status_in_company:iterator?.status_in_company,
    //   risk_to_health:"",
    //   risk_to_life:iterator?.risk_to_life,
    //   people_interaction:iterator?.people_interaction,
    //   job_help_people:iterator?.help_people,
    //   job_help_environment:iterator?.help_environment,
    //   potential:iterator?.potential_switch,
    //   fastest_growing:iterator?.fastest_growth,
    //   student_intrest:iterator?.student_intrest,
    //   skills_transferable:iterator?.skills_transferable,
    //   title:iterator?.career_title,
    //   average_salary:iterator?.average_salary,
    //   average_salary_aud:iterator?.average_salary_aud,
    //   years_needed:iterator?.years_needed,
    // });

    // await this.careerRepository.save(career)

    // const category = this.careerCategoryRepository.create({
    //   career_id:career?.id,
    //   category_id:iterator?.career_category
    // })
    // await this.careerCategoryRepository.save(category)

    // const categ = getRepository(CareerEduCategory).create({
    //   career_id: career?.id,
    //   category_id:iterator?.uni_category
    // })
    // await getRepository(CareerEduCategory).save(categ)

    // }
  }

  async create(createCareerDto: CreateCareerDto) {
    const { categories, education_category } = createCareerDto;

    const career = await this.careerRepository.insertCareer(createCareerDto);

    if (categories.length > 0) {
      for await (const iterator of categories) {
        const category = this.careerCategoryRepository.create({
          career_id: career?.id,
          category_id: iterator,
        });
        await this.careerCategoryRepository.save(category);
      }
    }

    if (education_category.length > 0) {
      for await (const iterator of education_category) {
        // await this.careerEduCategoryService.createCategory(career?.id,+iterator)
        const category = getRepository(CareerEduCategory).create({
          career_id: career?.id,
          category_id: iterator,
        });
        await getRepository(CareerEduCategory).save(category);
      }
    }

    return listingApiWrapper(null, `Career Successfully Added!`);
  }

  async findAll(
    listingParams: ListingParams,
    filterCareerDto: FilterCareerDto
  ) {
    return await this.careerRepository.findAllCareer(
      listingParams,
      filterCareerDto
    );
  }

  async findOne(id: number) {
    return await this.careerRepository.getCareerById(id);
  }

  updateCount(id: number, updateCountDto: UpdateCountDto, user: User) {
    return this.careerRepository.updateCount(id, updateCountDto, user);
  }

  async update(id: number, updateCareerDto: UpdateCareerDto) {
    const { categories, education_category } = updateCareerDto;

    if (categories.length > 0) {
      await this.careerCategoryRepository.delete({ career_id: id });
      for await (const iterator of categories) {
        const category = this.careerCategoryRepository.create({
          career_id: id,
          category_id: iterator,
        });
        await this.careerCategoryRepository.save(category);
      }
    }
    if (education_category.length > 0) {
      await getRepository(CareerEduCategory).delete({ career_id: id });
      for await (const iterator of education_category) {
        const category = getRepository(CareerEduCategory).create({
          career_id: id,
          category_id: iterator,
        });
        await getRepository(CareerEduCategory).save(category);
      }
    }

    // if(updateCareerDto.hasOwnProperty('education_category')) delete updateCareerDto.education_category
    // if(updateCareerDto.hasOwnProperty('categories')) delete updateCareerDto.categories

    return await this.careerRepository.updateCareerById(id, updateCareerDto);
  }

  async remove(id: number) {
    //  await this.careerCategoryRepository.delete({career_id:id})
    //  await this.educationCareerCategoryRepository.delete({career_id:id})

    return await this.careerRepository.deleteCareerById(id);
  }
}
