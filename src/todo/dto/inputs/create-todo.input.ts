import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Description of the todo' })
  description: string;

  @Field(() => Boolean, { description: 'Is the todo done?' })
  done: boolean = false;
}
