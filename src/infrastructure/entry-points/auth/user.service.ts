import { Injectable } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, SignInDto } from './dto/auth-dto';

@Injectable()
export class UserService {

    constructor(
        private readonly user: UserDBRepository
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
