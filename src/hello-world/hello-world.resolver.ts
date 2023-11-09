import { Resolver, Query, Float } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Retorna hola mundo', name: 'hola' })
  helloWorld(): string {
    return 'hello world';
  }

  @Query(() => Float, { name: 'random' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }
}
