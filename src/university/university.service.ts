import { Injectable } from '@nestjs/common';
import { CreateUniversityDto, FilterUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityRepository } from './university.repository';
import { ListingParams } from 'src/dto/global.dto';
import { UniversityCategoryRepository } from './university-category.repository';
import { listingApiWrapper } from 'src/utilities/util.service';
import { University } from './entities/university.entity';

@Injectable()
export class UniversityService {

  constructor(
    @InjectRepository(UniversityRepository) private universityRepository: UniversityRepository,
    @InjectRepository(UniversityCategoryRepository) private universityCategoryRepository: UniversityCategoryRepository,

  ) { }

  async onModuleInit() {


    // const universities = await this.universityRepository.find()

    // console.log("universities.length")

    // for await (const iterator of MOCKED_RESPONSE.data) {

    //   const uni =  this.universityRepository.create({
    //     uni_number: iterator?.uni_number ? iterator?.uni_number.toString() : null,
    //     name:iterator?.uni_name ? iterator?.uni_name : null,
    //     state: iterator?.state ? iterator?.state : null,
    //     link: iterator?.link ? iterator?.link : null,
    //     address: iterator?.address ? iterator?.address : null,
    //     email: iterator?.email? iterator?.email:null,
    //     phone: iterator?.phone ? iterator?.phone.toString() : null,
    //     teqsa: iterator?.teqsa ? iterator?.teqsa.toString() : null,
    //     cricos: iterator?.cricos ?  iterator?.cricos.toString() : null,
    //     rto_number:iterator?.rto_number?  iterator?.rto_number.toString():null
    //   })

    //   await this.universityRepository.save(uni)

    //   if(iterator?.agriculture){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 33,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }

    //   if(iterator?.management){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 39,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.creative_arts){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 45,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.information_technology){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 38,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.education){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 36,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.health){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 37,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.society_culture){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 41,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.natural_physical){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 40,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.engineering_related){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 43,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
    //   if(iterator?.tourism_hospitality){
    //     const cat = this.universityCategoryRepository.create({
    //       category_id: 42,
    //       uni_id: uni?.id
    //     })
    //     await this.universityCategoryRepository.save(cat)
    //   }
      
    // }
  }

  async applySeeder(){
    const universities = await this.universityRepository.find()

    for await (const iterator of universities) {
      
      const path  = `https://api-be.rilati.com/files/${iterator.uni_number}.png`
          await this.universityRepository.createQueryBuilder()
                .update(University)
                .set({
                  image: path
                 })
                .where("id = :id", { id: iterator?.id })
                .execute();
    }

    return true;
  }

  async create(createUniversityDto: CreateUniversityDto) {

    const { category_id } = createUniversityDto
    const university = await this.universityRepository.insertUniversity(createUniversityDto)

    if (category_id.length > 0) {
      for await (const iterator of category_id) {
        const cat = this.universityCategoryRepository.create({
          category_id: iterator,
          uni_id: university?.id
        })
        await this.universityCategoryRepository.save(cat)
      }
    }
    return listingApiWrapper(null, `University Successfully Added!`);
  }

  async findAll(listingParams: ListingParams, filterUniversityDto: FilterUniversityDto) {
    return await this.universityRepository.findAllUniversity(listingParams, filterUniversityDto);
  }

  async findOne(id: number) {
    return await this.universityRepository.getUniversityByUserId(id);
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {

    const { category_id } = updateUniversityDto

    if (category_id && category_id.length > 0) {
      const query = await this.universityCategoryRepository.createQueryBuilder()
        .softDelete()
        .where({
          ...{
            uni_id: id,
          },
        })
        .execute();
      for await (const iterator of category_id) {
        const cat = this.universityCategoryRepository.create({
          category_id: iterator,
          uni_id: id
        })
        await this.universityCategoryRepository.save(cat)
      }
    }
    
    return await this.universityRepository.updateUniversityById(id, updateUniversityDto);
  }

  async remove(id: number) {

    const query = await this.universityCategoryRepository.createQueryBuilder()
        .softDelete()
        .where({
          ...{
            uni_id: id,
          },
        })
        .execute();
        
    return await this.universityRepository.deleteUniversityById(id);
  }
}
