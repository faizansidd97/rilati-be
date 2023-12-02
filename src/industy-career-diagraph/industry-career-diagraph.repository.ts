import { InspirationalPerson } from "src/inspirational-people/entities/inspirational-person.entity";
import { EntityRepository, Repository } from "typeorm";
import { IndustyCareerDiagraph } from "./entities/industy-career-diagraph.entity";

@EntityRepository(IndustyCareerDiagraph)
export class IndustyCareerDiagraphRepository extends Repository<IndustyCareerDiagraph> {


}