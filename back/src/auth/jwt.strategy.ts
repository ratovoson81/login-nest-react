import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return { idUser: payload.sub, username: payload.username };
  }

  /* async validate(payload: any) {
    console.log('payload',payload);
    console.log('strategy validate');
    // payload => data signer decripter
    const ctxUser = {} as AuthPayload;
    ctxUser.exp = payload.exp;
    ctxUser.iat = payload.iat;
    ctxUser.user = await this.userService.findUserByUsername(payload.username);
    return ctxUser;
  }*/
}
