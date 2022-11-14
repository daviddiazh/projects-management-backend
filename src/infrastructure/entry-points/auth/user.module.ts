import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [AuthController, UserController, ],
  providers: [AuthService, UserService, ]
})
export class UserModule {}
