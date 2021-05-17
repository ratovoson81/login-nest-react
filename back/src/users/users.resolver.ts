import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { User } from './users.entity';
import { UsersService } from './users.service';
import { AddUser } from './users.input';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args('data') newUserData: AddUser) {
    return this.userService.createUser(newUserData);
  }
}
