import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {
        super({
            secretOrKey: "topSecret51",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        console.log(email);
        const user: User = await this.usersRepository.findOne({
            relations: ["role_id"],
            where: {
                email: email
            }
        });
        if (!user) {
            throw new BadRequestException();
        }
        return user;
    }
}

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user;
        if (!user) {
            return null;
        }
        return data ? user[data] : user;
    }
);
