import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('hello')
  getHello(): string {
    return 'Welcome to the Backend Application!';
  }

}