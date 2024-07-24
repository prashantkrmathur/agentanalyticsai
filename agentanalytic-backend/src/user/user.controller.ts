import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  public async getUserProfile(@Request() req){        
     return await this.userService.getUserProfile(req);
  }
}
