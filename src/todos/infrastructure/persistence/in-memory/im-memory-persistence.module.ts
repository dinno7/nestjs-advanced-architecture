import { Module } from '@nestjs/common';
import { InMemoryTodoRepository } from './repositories/todo.repository';
import { TodoRepository } from 'src/todos/application/ports/todo.repository';

@Module({
  providers: [
    {
      provide: TodoRepository,
      useClass: InMemoryTodoRepository,
    },
  ],
  exports: [TodoRepository],
})
export class InMemoryPersistenceModule {}
