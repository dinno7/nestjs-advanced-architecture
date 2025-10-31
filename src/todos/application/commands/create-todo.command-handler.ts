import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command';
import { Logger } from '@nestjs/common';
import { TodoFactory } from 'src/todos/domain/factory/todo.factory';
import { TodoRepository } from '../ports/todo.repository';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  private readonly logger = new Logger(CreateTodoCommandHandler.name);
  constructor(
    private readonly todoFactory: TodoFactory,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(command: CreateTodoCommand) {
    this.logger.log(
      `processing command handler ${CreateTodoCommandHandler.name}...`,
    );
    const newTodo = this.todoFactory.create(
      command.title,
      command.description,
      command.severity,
      new Date(),
    );
    return this.todoRepository.save(newTodo);
  }
}
