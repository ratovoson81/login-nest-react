import { Resolver, Query } from '@nestjs/graphql';
import { PersonneService } from './personne.service';

@Resolver('Personne')
export class PersonneResolver {
  constructor(private personneService: PersonneService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }
}
