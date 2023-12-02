import { EntityRepository, Repository } from "typeorm";
import { Subject } from "./entities/subject.entity";

@EntityRepository(Subject)
export class SubjectsRepository extends Repository<Subject> {

}