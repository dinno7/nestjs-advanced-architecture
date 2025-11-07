import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TodoCreatedEvent } from '../../domain/events/todo-created.event';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedEventHandler
  implements IEventHandler<TodoCreatedEvent>
{
  private readonly logger = new Logger(TodoCreatedEventHandler.name);
  handle(event: TodoCreatedEvent) {
    this.logger.log(
      `new todo created successfully -> ${JSON.stringify(event)}`,
    );
  }
}
