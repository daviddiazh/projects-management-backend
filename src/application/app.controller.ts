import { Controller, Get } from '@nestjs/common';
import { HashService } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.service';

@Controller()
export class AppController {

  constructor(
    private hashService: HashService
  ) {}

  @Get()
  getHello(): string {
    return 'Welcome to the Backend Application!';
  }

  // @Get('/hash')
  // hash() {
  //   return this.hashService.hash('david12345');
  // }

}