import { EntityRepository, Repository } from "typeorm";
import { CareerLike } from "./entities/career-like.entity";
import { InjectRepository } from "@nestjs/typeorm";

@EntityRepository(CareerLike)
export class CareerLikeRepository extends Repository<CareerLike> {
    
    async checkIfAlreadyLike(user_id:number, career_id:number):Promise<Boolean>{
        return !!(await this.findOne({
            where:{
                user_id:user_id,
                career_id:career_id
            }
        }))
    }

    async insertLike(user_id:number, career_id:number):Promise<Boolean>{
        try {
            const like = this.create({
                user_id:user_id,
                career_id:career_id
            })
            await this.save(like)
            return true;
        } catch (error) {
            return false;            
        }
    }

    async removeLike(user_id:number, career_id:number):Promise<Boolean>{
        try {
            await this.delete({
                user_id:user_id,
                career_id:career_id
            })
            return true;
        } catch (error) {
            return false;            
        }
    }
}