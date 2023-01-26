import { Injectable, UnauthorizedException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, signUpDto } from './dto/auth-dto';
import { HashService } from '../../driven-adapters/hash-password-adapter/hash-password.service';
import { BusinessService } from '../business/business.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,

        private readonly businessService: BusinessService,
    ){}

    async signUp (payload: signUpDto): Promise<object | any> {
        try {
            const { password, ...userData } = payload;
            
            const passwordEncrypted = await this.hashService.hash(password);

            const { businessId } = userData;

            const business = await this.businessService.findById( businessId );

            if( !business ) {
                throw new UnauthorizedException('No se encontro ningún negocio por ese ID, por favor comuníquese con el administrador.');
            }

            const user = await this.auth.create({
                ...userData,
                password: passwordEncrypted
            });

            return {
                user,
                token: this.jwtService.sign({id: (await user)._id + ''})
            };
        } catch (error) {
            // console.log(error)
            throw new UnauthorizedException(error.response.message)
        }
    }

    async login (payload: LoginDto): Promise<object | any> { 
        try {
            const { password: passwordByRequest, email: emailByRequest } = payload;

            const user: any = await this.auth.findByEmail(emailByRequest);
            const { password, ...restDataUser } = user;

            const isMatchPassword = await this.hashService.compare(passwordByRequest, password);

            if( !isMatchPassword ){
                throw new UnauthorizedException('Credenciales incorrectas, por favor verifiquelas y vuelva a intentarlo.');
            } 

            return {
                user: restDataUser,
                token: this.jwtService.sign({id: restDataUser._id + ''})
            };
        } catch (error) {
            throw new UnauthorizedException('Credenciales incorrectas, por favor verifiquelas y vuelva a intentarlo.');
        }
    }

    async checkToken (req: Request) {

        const token = req.headers['x-token'];

        // if( !token ) return new UnauthorizedException('Su token ha expirado o no hay token dentro de la petición.');
        if ( !token ) return;

        try {
            const { id } = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

            const user = await this.auth.findById(id);

            return {
                user,
                token,
            }
        } catch (error) {
            throw new UnauthorizedException("Ya han pasado 4h descansa y vuelve a iniciar sesión.");
        } 

    }
  
}
