import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command';
import { Logger } from '@nestjs/common';
import { TodoFactory } from 'src/modules/todos/domain/factories/todo.factory';
import { TodoRepository } from '../ports/todo.repository';
import { TodoCreatedEvent } from '../../domain/events/todo-created.event';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  private readonly logger = new Logger(CreateTodoCommandHandler.name);
  constructor(
    private readonly todoFactory: TodoFactory,
    private readonly todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
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
    this.eventBus.publish(new TodoCreatedEvent(newTodo));

    return this.todoRepository.save(newTodo);
  }
}
