import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/infrastructure/entry-points/auth/entities/user.entity';
import { JwtPayload } from 'src/domain/common/user/jwt-payload.interface';
import { UserDBRepository } from '../mongo-adapter/user/user.repository';

@Injectable()
export class JwtStrategy_Passport extends PassportStrategy( Strategy ) {

    constructor(
        private readonly user: UserDBRepository,
        configService: ConfigService,
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'), //get .env
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate ( payload: JwtPayload ): Promise<User> {
        const { id } = payload;

        const user = await this.user.findById(id);

        return user;
    }

}