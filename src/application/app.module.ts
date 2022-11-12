import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HashModule } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.module';
import { DatabaseModule } from '../infrastructure/driven-adapters/mongo-adapter/database.module';
import { UserModule } from '../infrastructure/entry-points/auth/user.module';

@Module({
  imports: [HashModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
