import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule as JwtModuleDependency} from '@nestjs/jwt'
import { JwtRepository } from './jwt.repository';
import { JwtService } from './jwt.service';
import { JwtService as JwtServiceDependency } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
    JwtRepository,
    
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
  providers: [JwtRepository, JwtService, JwtServiceDependency],
  exports: [JwtService, JwtModule],
})
export class JwtModule {}
