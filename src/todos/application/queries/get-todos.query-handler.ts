import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from './get-todos.query';
import { Todo } from 'src/todos/domain/entities/todo';
import { TodoRepository } from '../ports/todo.repository';

@QueryHandler(GetTodosQuery)
export class GetTodosQueryHandler
  implements IQueryHandler<GetTodosQuery, Todo[]>
{
  constructor(private readonly todoRepository: TodoRepository) {}
  async execute(_query: GetTodosQuery): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
