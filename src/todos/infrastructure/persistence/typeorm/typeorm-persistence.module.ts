import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoSchema } from './schemas/todo.schema';
import { TypeORMTodoRepository } from './repositories/todo.repository';
import { TodoRepository } from 'src/todos/application/ports/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoSchema])],
  providers: [
    {
      provide: TodoRepository,
      useClass: TypeORMTodoRepository,
    },
  ],
  exports: [TodoRepository],
})
export class TypeormPersistenceModule {}
