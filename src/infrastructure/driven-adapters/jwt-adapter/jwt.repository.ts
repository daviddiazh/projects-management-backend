import { JwtService } from '@nestjs/jwt';
import { IJwtTypesRepository } from '../../../domain/types-adapters/jwt.repository.types';
import { JwtPayload } from '../../../domain/common/user/jwt-payload.interface';

export class JwtRepository implements IJwtTypesRepository {

    constructor(
        private jwtService: JwtService,
    ){}

    async sign ( payload: JwtPayload ): Promise<string> {
        console.log('------------------------------------------')
        console.log(typeof this.jwtService)
        const token = await this.jwtService.sign(payload);
        console.log(token)
        return token;
    }

}
