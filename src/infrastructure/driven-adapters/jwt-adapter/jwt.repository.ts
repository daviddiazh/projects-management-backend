import { JwtService } from '@nestjs/jwt';
import { IJwtTypesRepository } from '../../../domain/types-adapters/jwt.repository.types';
import { JwtPayload } from '../../../domain/common/user/jwt-payload.interface';

export class JwtRepository implements IJwtTypesRepository {

    constructor(
        private jwtService: JwtService,
    ){}

    sign ( payload: JwtPayload ) {
        console.log('------------------------------------------')
        console.log('jwtService: ', this?.jwtService?.sign(payload))
        const token = this?.jwtService?.sign( payload );
        console.log(token)
        return token;
    }

}
