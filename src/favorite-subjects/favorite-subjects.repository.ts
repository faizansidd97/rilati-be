import { EntityRepository, Repository } from "typeorm";
import { FavoriteSubject } from "./entities/favorite-subject.entity";

@EntityRepository(FavoriteSubject)
export class FavoriteSubjectRepository extends Repository<FavoriteSubject> {

}