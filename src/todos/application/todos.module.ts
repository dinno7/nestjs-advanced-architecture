import { DynamicModule, Module, Type } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoFactory } from '../domain/factory/todo.factory';
import { TodosController } from '../presenters/http/todos.controller';
import { GetTodosQueryHandler } from './queries/get-todos.query-handler';
import { CreateTodoCommandHandler } from './commands/create-todo.command-handler';
import { CompeleteTodoCommandHandler } from './commands/complete-todo.command-handler';
import { ToggleTodoCompleteCommandHandler } from './commands/toggle-todo-complete.command-handler';

@Module({
  controllers: [TodosController],
  providers: [
    TodosService,
    TodoFactory,
    GetTodosQueryHandler,
    CreateTodoCommandHandler,
    CompeleteTodoCommandHandler,
    ToggleTodoCompleteCommandHandler,
  ],
})
export class TodosModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: TodosModule,
      imports: [infrastructureModule],
    };
  }
}
