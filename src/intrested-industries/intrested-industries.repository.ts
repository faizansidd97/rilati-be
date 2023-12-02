import { EntityRepository, Repository } from "typeorm";
import { IntrestedIndustry } from "./entities/intrested-industry.entity";

@EntityRepository(IntrestedIndustry)
export class IntrestedIndustryRepository extends Repository<IntrestedIndustry> {

}