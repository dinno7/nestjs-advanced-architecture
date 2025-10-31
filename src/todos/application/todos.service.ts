import { Injectable } from '@nestjs/common';
import { CreateTodoCommand } from './commands/create-todo.command';
import { Todo } from '../domain/entities/todo';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosQuery } from './queries/get-todos.query';
import { CompeleteTodoCommand } from './commands/complete-todo.command';
import { ToggleTodoCompleteCommand } from './commands/toggle-todo-complete.command';

@Injectable()
export class TodosService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createTodoCommand: CreateTodoCommand): Promise<Todo> {
    return this.commandBus.execute(createTodoCommand);
  }

  findAll(): Promise<Todo[]> {
    return this.queryBus.execute(new GetTodosQuery());
  }

  makeComplete(todoID: string) {
    return this.commandBus.execute(new CompeleteTodoCommand(todoID));
  }

  toggleComplete(todoID: string) {
    return this.commandBus.execute(new ToggleTodoCompleteCommand(todoID));
  }
}
