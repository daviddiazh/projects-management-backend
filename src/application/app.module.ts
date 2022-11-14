import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HashModule } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.module';
import { DatabaseModule } from '../infrastructure/driven-adapters/mongo-adapter/database.module';
import { UserModule } from '../infrastructure/entry-points/auth/user.module';
import { UserController } from '../infrastructure/entry-points/auth/user.controller';
import { AuthController } from '../infrastructure/entry-points/auth/auth.controller';
import { BusinessController } from '../infrastructure/entry-points/business/business.controller';
import { UserService } from '../infrastructure/entry-points/auth/user.service';
import { AuthService } from '../infrastructure/entry-points/auth/auth.service';
import { BusinessService } from '../infrastructure/entry-points/business/business.service';
import { BusinessModule } from '../infrastructure/entry-points/business/business.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [HashModule, DatabaseModule, UserModule, UserModule, BusinessModule, ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true
  }),],
  controllers: [AppController]
  // controllers: [AppController, UserController, AuthController, BusinessController],
  // providers: [UserService, AuthService, BusinessService],
})
export class AppModule {}
