import { Injectable } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, signUpDto } from './dto/auth-dto';
import { HashService } from '../../driven-adapters/hash-password-adapter/hash-password.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository,
        private readonly hashService: HashService
    ){}

    async signUp (payload: signUpDto): Promise<object | any> { //TODO: Change method name
        try {
            const { password, ...userData } = payload; 
            
            const passwordEncrypted = await this.hashService.hash(password)

            const user = this.auth.create({
                ...userData,
                password: passwordEncrypted
            });

            // return {
            //     user,
            // };
            return user;
        } catch (error) {
            console.log('Down Service - signIn Authentication');
            throw new Error(error);
        }
    }

    async login (payload: LoginDto): Promise<object | any> {
        try {
            return //TODO: Make the use case
        } catch (error) {
            
        }
    }
  
}
