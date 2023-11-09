import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TodosModule } from './todos/todos.module';
import { HelloWorldResolver } from './hello-world/hello-world.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [HelloWorldResolver],
})
export class AppModule {}
