import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginPayload, AuthPayload, AuthReturn } from './models';
import { AuthData } from './auth.input';
import { User } from 'src/users/users.entity';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './auth.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(returns => LoginPayload)
  async login(@Args('authData') authData: AuthData) {
    return this.authService.login(authData);
  }

  @Query(returns => AuthReturn)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    console.log('me', user);
    return user;
  }
}
