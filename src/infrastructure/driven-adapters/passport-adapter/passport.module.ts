import { Global, Module } from '@nestjs/common';
import { PassportModule as PassportModuleDependency } from '@nestjs/passport';
import { JwtModule } from '../jwt-adapter/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy_Passport } from './passport.repository';

@Global()
@Module({
    imports: [
        PassportModuleDependency.register({ defaultStrategy: 'jwt' }),
        JwtModule,
        ConfigModule,
    ],
    providers: [ ConfigService, JwtStrategy_Passport ],
    exports: [ JwtStrategy_Passport, PassportModule ],
})
export class PassportModule {}
