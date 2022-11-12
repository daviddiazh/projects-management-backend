import { Injectable } from '@nestjs/common';
import { HashRepository } from './hash-password.repository';

@Injectable()
export class HashService {
  constructor(private hashRepository: HashRepository) {}

  hash(password: string) {
    return this.hashRepository.hash(password)
  }
  
}
