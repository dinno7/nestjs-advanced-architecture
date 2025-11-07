import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ToggleTodoCompleteCommand } from './toggle-todo-complete.command';
import { Todo } from 'src/modules/todos/domain/entities/todo';
import { TodoRepository } from '../ports/todo.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(ToggleTodoCompleteCommand)
export class ToggleTodoCompleteCommandHandler
  implements ICommandHandler<ToggleTodoCompleteCommand, Todo>
{
  private readonly logger = new Logger(ToggleTodoCompleteCommandHandler.name);

  constructor(private readonly todoRepository: TodoRepository) {}
  async execute(command: ToggleTodoCompleteCommand): Promise<Todo> {
    const currentTodo = await this.todoRepository.findById(command.todoID);

    this.logger.log(`todo with ${command.todoID} want to be toggle complete`);

    return this.todoRepository.updateOne(command.todoID, {
      completed: !currentTodo.completed,
    });
  }
}
