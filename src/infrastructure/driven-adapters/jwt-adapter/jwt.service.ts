import { Injectable } from '@nestjs/common';
import { JwtRepository } from './jwt.repository';
import { JwtPayload } from '../../../domain/common/user/jwt-payload.interface';

@Injectable()
export class JwtService {
  constructor(private jwtRepository: JwtRepository) {}

  sign(payload: JwtPayload) {
    return this.jwtRepository.sign(payload);
  }
  
}
