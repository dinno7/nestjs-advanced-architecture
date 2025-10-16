import { type UUID } from 'crypto';
import { Todo } from 'src/todos/domain/entities/todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<Todo>;
  abstract findAll(): Promise<Todo[]>;
  abstract updateOne(
    id: UUID,
    updateFields: Partial<Omit<Todo, 'id'>>,
  ): Promise<Todo>;
}
