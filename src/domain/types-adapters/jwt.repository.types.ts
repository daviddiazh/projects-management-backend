import { JwtPayload } from '../../domain/common/user/jwt-payload.interface';

export abstract class IJwtTypesRepository {
    abstract sign(payload: JwtPayload): Promise<string>;
}