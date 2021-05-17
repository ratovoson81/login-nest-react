import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Personne {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  idPersonne: number;

  @Field()
  @Column()
  nom: string;

  @Field()
  @Column()
  prenom: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  adresse: string;
}
