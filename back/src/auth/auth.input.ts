import { InputType, Field } from '@nestjs/graphql';

import { User } from 'src/users/users.entity';

@InputType({ description: 'login data' })
export class AuthData implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
