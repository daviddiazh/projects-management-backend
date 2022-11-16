import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { JwtModule } from '../../driven-adapters/jwt-adapter/jwt.module';
import { PassportModule } from '../../driven-adapters/passport-adapter/passport.module';

import { JwtModule as JwtModuleDependency} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [  JwtModule, PassportModule,
    JwtModuleDependency.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        
        return {
          secret: configService.get('JWT_SECRET') || '',
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    }), 
  ],
  providers: [AuthService, UserService, ],
  controllers: [AuthController, UserController, ]
})
export class UserModule {}
