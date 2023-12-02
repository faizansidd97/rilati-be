import { TasteEnum } from "../auth-role.enum";

export interface JwtPayload {
    sub: number;
    email: string;
    name: string;
    family_name: string;
    given_name: string;
}

export interface FavouriteSubject {
    user_id : number,
    subject_id: number,
    type: TasteEnum
}

export interface FavouriteIndustries {
    user_id : number,
    industry_id: number,
    type: TasteEnum
}