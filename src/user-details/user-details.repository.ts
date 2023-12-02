import { EntityRepository, Repository, getConnection } from "typeorm";
import { UserDetail } from "./entities/user-detail.entity";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

@EntityRepository(UserDetail)
export class UserDetailsRepository extends Repository<UserDetail> {
  async saveUserDetails(createUserDto: any, user_id: any) {
    try {

      const {avatar,phone,address,city,state,country,education_stage,personal_trait,confident_skills } =createUserDto
      if(avatar || phone || address || city || state || country || personal_trait|| education_stage || confident_skills){
        const userDetailsData = this.create({
          ...createUserDto,
          user_id: user_id,
          ...(createUserDto?.confident_skills && {
            confident_skills : JSON.stringify(createUserDto?.confident_skills)
          })
        });
        await this.save(userDetailsData);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUserDetailsPartial(updateUserDto: any, user_id: any) {
    try {
      const update = await getConnection()
        .createQueryBuilder()
        .update(UserDetail)
        .set({ ...updateUserDto })
        .where("user_id = :user_id", { user_id: user_id })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUserDetails(updateUserDto: UpdateUserDto, user_id: any) {
    try {

      const details = await this.findOne({ user_id: user_id });
      console.log(updateUserDto,user_id)
      if (details) {

        const updateDetails = this.create({
          ...updateUserDto,
          user_id: user_id,
          ...(updateUserDto?.confident_skills && {
            confident_skills : JSON.stringify(updateUserDto?.confident_skills)
          })
        });
        await this.update({user_id:user_id},updateDetails);

      }else{
        const updateDetails = this.create({
          ...updateUserDto,
          user_id: user_id,
          ...(updateUserDto?.confident_skills && {
            confident_skills : JSON.stringify(updateUserDto?.confident_skills)
          })
        });
        await this.save(updateDetails);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
