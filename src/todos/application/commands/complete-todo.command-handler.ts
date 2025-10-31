import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TodoFactory } from 'src/todos/domain/factory/todo.factory';
import { TodoRepository } from '../ports/todo.repository';
import { CompeleteTodoCommand } from './complete-todo.command';
import { Todo } from 'src/todos/domain/entities/todo';

@CommandHandler(CompeleteTodoCommand)
export class CompeleteTodoCommandHandler
  implements ICommandHandler<CompeleteTodoCommand, Todo>
{
  private readonly logger = new Logger(CompeleteTodoCommandHandler.name);
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(command: CompeleteTodoCommand): Promise<Todo> {
    return this.todoRepository.updateOne(command.todoID, {
      completed: true,
    });
  }
}
