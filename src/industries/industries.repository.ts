import { EntityRepository, Repository } from "typeorm";
import { Industry } from "./entities/industry.entity";

@EntityRepository(Industry)
export class IndustryRepository extends Repository<Industry> {

}