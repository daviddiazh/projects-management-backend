import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { BusinessService } from '../business/business.service';



@Module({
  imports: [ 
    PassportModule,
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        
        return {
          secret: configService.get('JWT_SECRET') || '',
          signOptions: {
            expiresIn: '1m'
          }
        }
      }
    }), 
  ],
  providers: [AuthService, UserService, JwtStrategy, BusinessService ],
  controllers: [AuthController, UserController, ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class UserModule {}
