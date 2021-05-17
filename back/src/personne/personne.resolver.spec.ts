import { Test, TestingModule } from '@nestjs/testing';
import { PersonneResolver } from './personne.resolver';

describe('PersonneResolver', () => {
  let resolver: PersonneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonneResolver],
    }).compile();

    resolver = module.get<PersonneResolver>(PersonneResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
