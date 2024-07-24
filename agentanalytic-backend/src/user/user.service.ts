import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(userData : CreateUserDto){
    try {
      const createdUser = await this.userRepository.save(userData);
      console.log("created user", createdUser);
      return createdUser
    } catch (error) {
      console.log("error while creating a new user", error);
      return error.message
    }
  }

  public async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {email}
      })
      console.log("get user by email", user);
      return user
    } catch (error) {
      console.log("error while fetching user by email", error)
      return error.message
    }
  }

  public async findUserByMobile(mobile : string) {
    try {
      const user = await this.userRepository.findOne({
        where: {mobile}
      })
      console.log("get user by mobile", user);
      return user
    } catch (error) {
      console.log("error while fetching user by email", error)
      return error.message
    }
  }

  async getUserProfile(request) {
    try {
      console.log("request", request.user);
      const user = await this.getUserById(request.user.sub)
      return { statuscode: 200, user: user };
    } catch (error) {
      console.log("error while getting profile", error);
      return error;
    }
  }

  async getUserById(id) {
    try {
      return this.userRepository.findOne({
        where: { id: id },
      })
    } catch (error) {

    }
  }
}
