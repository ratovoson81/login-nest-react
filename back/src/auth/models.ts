import { Field, ObjectType, Float } from '@nestjs/graphql';
import { User } from 'src/users/users.entity';

@ObjectType()
export class LoginPayload {
  @Field()
  accessToken: string;

  @Field(type => User)
  user: User;
}

@ObjectType()
export class AuthPayload {
  @Field(type => User)
  user: User;

  @Field(type => Float)
  iat: number;

  @Field(type => Float)
  exp: number;
}

@ObjectType()
export class AuthReturn {
  @Field()
  idUser: number;

  @Field()
  username: string;
}

export interface UserContext {
  user: User;
  exp: number;
  iat: number;
}
