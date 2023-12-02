import { EntityRepository, Repository } from "typeorm";
import { SubjectCareerDiagraph } from "./entities/subject-career-diagraph.entity";

@EntityRepository(SubjectCareerDiagraph)
export class SubjectCareerDiagraphRepository extends Repository<SubjectCareerDiagraph> {


}