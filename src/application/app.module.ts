import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HashModule } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.module';

@Module({
  imports: [HashModule,],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
