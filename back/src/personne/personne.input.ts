import { InputType, Field, ID } from '@nestjs/graphql';
import { Personne } from './personne.entity';

@InputType({ description: 'new personne data' })
export class InputPersonne implements Partial<Personne> {
  @Field(type => ID, { nullable: true })
  idPersonne: number;

  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  password: string;

  @Field()
  adresse: string;
}
