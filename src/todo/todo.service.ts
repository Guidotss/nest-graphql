import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: true },
    { id: 2, description: 'Learn GraphQL', done: true },
    { id: 3, description: 'Learn TypeScript', done: false },
  ];
  findAll(status?: StatusArgs): Todo[] {
    if (status.status !== undefined) {
      const { status: done } = status;
      return this.todos.filter((todo) => todo.done === done);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id:${id} not found`);
    return todo;
  }

  create(todo: CreateTodoInput): Todo {
    if (!todo.description)
      throw new BadRequestException(`Description is required`);

    const newTodo = {
      id: this.todos.length + 1,
      ...todo,
    };
    this.todos.push(newTodo);

    return newTodo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id:${id} not found`);

    if (description) todo.description = description;
    if (done !== undefined) todo.done = done;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, description, done };
      }
      return todo;
    });

    return todo;
  }

  remove(id: number): Todo {
    if (!id) throw new BadRequestException(`Id is required`);
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id:${id} not found`);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return todo;
  }

  completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

}
