import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { AddUser } from './users.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(newUserData: AddUser): Promise<User> {
    const user = new User();

    user.password = newUserData.password;
    user.username = newUserData.username;
    return this.userRepository.save(user);
  }
}
