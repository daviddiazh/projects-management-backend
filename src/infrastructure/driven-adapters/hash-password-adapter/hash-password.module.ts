import { Global, Module } from '@nestjs/common';
import { HashService } from './hash-password.service';
import { HashRepository } from './hash-password.repository';
import * as BcryptDependency from 'bcrypt';

@Global()
@Module({
  providers: [HashService, HashRepository, {
    provide: BcryptDependency,
    useFactory: () => new BcryptDependency
  }],
  exports: [HashService],
})
export class HashModule {}
