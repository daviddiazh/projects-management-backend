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
                throw new UnauthorizedException('No se encontro ningún cliente por ese ID, por favor comuniquese con el administrador.');
            }

            const user = await this.auth.create({
                ...userData,
                password: passwordEncrypted
            });

            return {
                user: { ...userData, _id: (await user)._id, role: (await user).role },
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

            const user = await this.auth.findByEmail(emailByRequest);
            const { name, lastName, email, password, _id, phone } = user;

            const isMatchPassword = await this.hashService.compare(passwordByRequest, password);

            if( !isMatchPassword ){
                throw new UnauthorizedException('Credenciales incorrectas.');
            }

            return {
                user: {name, lastName, email, _id: (await user)._id, phone, role: (await user).role},
                token: this.jwtService.sign({id: _id + ''})
            };
        } catch (error) {
            throw new UnauthorizedException('Credenciales incorrectas.' );
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
                token,
            }
        } catch (error) {
            console.log(error)
            switch(error.status) {
                case 401: 
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } 

    }
  
}
