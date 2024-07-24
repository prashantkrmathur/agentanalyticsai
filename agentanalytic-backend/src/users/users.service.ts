import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async createUser(userData : CreateUserDto){
    try {
      const createdUser = await this.usersRepository.save(userData);
      console.log("created user", createdUser);
      return createdUser
    } catch (error) {
      console.log("error while creating a new user", error);
      return error.message
    }
  }

  public async findUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
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
      const user = await this.usersRepository.findOne({
        where: {mobile}
      })
      console.log("get user by mobile", user);
      return user
    } catch (error) {
      console.log("error while fetching user by email", error)
      return error.message
    }
  }
}
