import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

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

  @Query(() => Int, {
    name: 'randomFromzero',
    description: 'Retorna un numero random desde cero hasta el numero dado',
  })
  getRandomNumberFromZeroToTen(
    @Args('to', { type: () => Int, nullable: true }) to = 6,
  ): number {
    return Math.ceil(Math.random() * to);
  }
}
