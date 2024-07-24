import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { from } from 'rxjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService : UsersService,
    private readonly configService: ConfigService
  ) { }
  public async registerUser(registerUserDto : CreateUserDto) {
    try {
      const {firstName, lastName, email, password, mobile, profilePic} = registerUserDto;
      if( firstName == '' || lastName == '' || email == '' || password == '' || mobile == ''){
        throw new Error('Please fill all the fields');
      }
    // check user details in exiting users
    let findUser;
    findUser = await this.userService.findUserByEmail(email);
    if(findUser){
      throw new Error('User already exists with this email');
    }
    findUser = await this.userService.findUserByMobile(mobile);
    if(findUser){
      throw new Error('User already exists with this mobile number');
    }
    // hash the password to store in the database
    const hashedPassword = await this.hashPassword(password)
    // create user
    const userData = {
      ...registerUserDto,
      password: hashedPassword
    }
    const user = await this.userService.createUser(userData);
    return {statusCode : 201, data: user}
    } catch (error) {
      console.log("error while creating a new user", error);
      return {statusCode : 400, message: error.message}
    }
  }

  public async loginUser(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return { status: 400, message: 'User not found' };
      }
      console.log('check password', password);

      const isPasswordMatch = await this.validatePassword(
        password,
        user.password,
      );
      if (!isPasswordMatch) {
        return { status: 400, message: 'Invalid password' };
      }
      const payload = { email: user.email, sub: user.id};
      const secretKey =  this.configService.get<string>('JWT_SECRET_KEY');
      const token = await this.jwtService.signAsync(payload,{
        secret : secretKey
      });
      return { status: 200, message: 'Login success', token: token };
    } catch (error) {
      console.log('error while login the user', error);
      return {
        status: 400,
        message: 'Error while fetching the user',
        error: error,
      };
    }
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

  async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    const encpass = await bcrypt.compare(password, storedPasswordHash);
    if (!encpass) {
      throw new UnauthorizedException();
    }
    return encpass;
  }

  // hashPassword
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 14);
  }
}
