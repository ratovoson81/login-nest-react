import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'new user data' })
export class AddUser {
  @Field()
  username: string;

  @Field()
  password: string;
}
