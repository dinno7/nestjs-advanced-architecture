import { Todo } from 'src/todos/domain/entities/todo';
import { TodoSchema } from '../schemas/todo.schema';
import { TodoSeverity } from 'src/todos/domain/value-objects/todo-severity';

export class TodoMapper {
  static toDomain(todo: TodoSchema): Todo {
    const todoSevirity = new TodoSeverity(todo.severity);
    return new Todo(
      todo.id,
      todo.title,
      todo.description,
      todo.completed,
      todoSevirity,
      todo.dueDate,
      todo.createdAt,
      todo.updatedAt,
    );
  }

  static toPersistence(todo: Todo): TodoSchema {
    const persistenceTodo = new TodoSchema();
    persistenceTodo.id = todo.id;
    persistenceTodo.title = todo.title;
    persistenceTodo.description = todo.description;
    persistenceTodo.severity = todo.severity.value;
    persistenceTodo.completed = todo.completed;
    persistenceTodo.dueDate = todo.dueDate;
    persistenceTodo.createdAt = todo.createdAt;
    persistenceTodo.updatedAt = todo.updatedAt;
    return persistenceTodo;
  }
}
