import { Injectable } from '@nestjs/common';
import { JwtRepository } from './jwt.repository';

@Injectable()
export class JwtService {
  constructor(private jwtRepository: JwtRepository) {}

    
  
}
