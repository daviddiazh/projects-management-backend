import { Injectable } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, SignInDto } from './dto/auth-dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository
    ){}

    async signIn (payload: SignInDto): Promise<object | any> {
        try {
            return //TODO: Make the use case
        } catch (error) {
            
        }
    }

    async login (payload: LoginDto): Promise<object | any> {
        try {
            return //TODO: Make the use case
        } catch (error) {
            
        }
    }
  
}
