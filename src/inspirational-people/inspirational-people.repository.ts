import { EntityRepository, Like, Repository } from "typeorm";
import { InspirationalPerson } from "./entities/inspirational-person.entity";
import { CreateInspirationalPersonDto, FilterOrderBy, SortByEntity, SortByType } from "./dto/create-inspirational-person.dto";
import { listingApiWrapper, listingApiWrapperPaginate } from "src/utilities/util.service";
import { ListingParams } from "src/dto/global.dto";

@EntityRepository(InspirationalPerson)
export class InspirationalPersonRepository extends Repository<InspirationalPerson> {

    async createData(createInspirationalPersonDto: CreateInspirationalPersonDto){
        const data = this.create({...createInspirationalPersonDto})
         await this.save(data)

         return listingApiWrapper(data,"Inserted Successfully!")
    }

    async findAllData(listingParams: ListingParams,filterOrderBy: FilterOrderBy){
        let { page, take,search } = listingParams;
        let { sort,sort_by } = filterOrderBy;
        take = take || 10;
        page = page || 1;
        const skip = (page - 1) * take;
        const order: { [key: string]: "ASC" | "DESC" } = {};

        if (sort_by) {
            if (sort_by === SortByEntity.NAME) {
              order.name = sort === SortByType.ASC ? "ASC" : "DESC";
            } else if (sort_by === SortByEntity.OCCUPATION) {
              order.occupation = sort === SortByType.ASC ? "ASC" : "DESC";
            }
          }
          
          if (Object.keys(order).length === 0) {
            // If neither sort_by nor sort is provided, sort by id in descending order by default
            order.id = "DESC";
          }
        const [data, total] = await this.findAndCount({
            where: {
                ...(search && {
                    name: Like(`%${search}%`),
                }),
            },
            take: take,
            skip: skip,
            order:order
        });

        return listingApiWrapperPaginate(data, { page, take, total });
    }

}