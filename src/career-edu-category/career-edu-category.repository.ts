import { EntityRepository, Like, Repository } from "typeorm";
import { CareerEduCategory } from "./entities/career-edu-category.entity";


@EntityRepository(CareerEduCategory)
export class CareerEduCategoryRepository extends Repository<CareerEduCategory> {

    async insertCaegory(career_id:number, category_id:number){
        const category = this.create({
            career_id: career_id,
            category_id:category_id
          })
          await this.save(category)
          return true;
    }
}