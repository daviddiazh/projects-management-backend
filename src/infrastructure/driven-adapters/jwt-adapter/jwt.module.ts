import { Global, Module } from '@nestjs/common';
import { JwtRepository } from './jwt.repository';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [JwtRepository, JwtService],
  exports: [JwtService],
})
export class JwtModule {}
