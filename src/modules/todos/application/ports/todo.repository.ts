import { Todo } from 'src/modules/todos/domain/entities/todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<Todo>;
  abstract findAll(): Promise<Todo[]>;
  abstract findById(id: string): Promise<Todo>;
  abstract updateOne(
    id: string,
    updateFields: Partial<Omit<Todo, 'id'>>,
  ): Promise<Todo>;
}
