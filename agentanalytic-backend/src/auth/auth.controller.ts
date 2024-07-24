import { Body, Controller, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: CreateUserDto) {
    return await this.authService.registerUser(registerUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto){
    return await this.authService.loginUser(loginUserDto)
  }
}
