import { DynamicModule, Module, Type } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoFactory } from '../domain/factory/todo.factory';
import { TodosController } from '../presenters/http/todos.controller';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodoFactory],
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
