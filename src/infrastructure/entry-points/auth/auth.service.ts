import { Injectable, UnauthorizedException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, signUpDto } from './dto/auth-dto';
import { HashService } from '../../driven-adapters/hash-password-adapter/hash-password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ){}

    async signUp (payload: signUpDto): Promise<object | any> {
        try {
            const { password, ...userData } = payload;
            
            const passwordEncrypted = await this.hashService.hash(password);

            const user = await this.auth.create({
                ...userData,
                password: passwordEncrypted
            });

            return {
                user: { ...userData, _id: (await user)._id, role: (await user).role },
                token: this.jwtService.sign({id: (await user)._id + ''})
            };
        } catch (error) {
            console.log('Down Service - signUp Authentication');
            throw new InternalServerErrorException('Down Service - signUp Authentication')
        }
    }

    async login (payload: LoginDto): Promise<object | any> {
        try {
            const { password: passwordByRequest, email: emailByRequest } = payload;

            const user = await this.auth.findByEmail(emailByRequest);
            const { name, lastName, email, password, _id, phone } = user;

            const isMatchPassword = await this.hashService.compare(passwordByRequest, password);

            if( !isMatchPassword ){
                throw new UnauthorizedException('Credentials are not valid');
            }

            return {
                user: {name, lastName, email, _id: (await user)._id, phone, role: (await user).role},
                token: this.jwtService.sign({id: _id + ''})
            };
        } catch (error) {
            console.log('Down Service - login Authentication');
            throw new InternalServerErrorException('Down Service - login Authentication');
        }
    }

    async checkToken (req: Request) {

        const token = req.headers['x-token'];

        if( !token ) return new UnauthorizedException('Su token ha expirado o no hay token en la petición');

        try {
            const { id } = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

            const user = await this.auth.findById(id);

            return {
                user,
                message: 'token válido',
                token,
            }
        } catch (error) {
            console.log(error)
            switch(error.status) { //TODO: Configurarlo en el front y Probarlo
                case 'TokenExpiredError: jwt expired':
                case 401: 
                    console.log('entro en el 401')
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } 

    }

    // async checkTokenGQL (token: string) { 

    //     if( !token ) return new ResponseEntity(401, 'Ocurrio un error.', 'Estamos presentando fallas en el servicio.');

    //     try {
    //         const { id } = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

    //         const user = await this.auth.findById(id);

    //         return {
    //             user,
    //             token,
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return new ResponseEntity(401, 'Expiró la sesión', 'La sesión finalizo, por favor ingresa de nuevo.');
    //         // throw error;

    //         // switch(error.status) { //TODO: Configurarlo en el front y Probarlo
    //         //     case 401: 
    //         //         console.log('entro en el 401')
    //         //         throw error;
    //         //     default:
    //         //         throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
    //         // }
    //     }
    // }
  
}
