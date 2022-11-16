import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/auth-dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp (@Body() payload: signUpDto) {
    return this.authService.signUp(payload);
  }
}
