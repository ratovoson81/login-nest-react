import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthData } from './auth.input';
import { LoginPayload } from './models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authData: AuthData): Promise<LoginPayload> {
    const user = await this.validateUser(authData.username, authData.password);
    const payload = { username: user.username, sub: user.IdUser };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  /*  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }*/
}
