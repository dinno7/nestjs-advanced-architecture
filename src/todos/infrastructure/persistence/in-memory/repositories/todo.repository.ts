import { TodoRepository } from 'src/todos/application/ports/todo.repository';
import { Todo } from 'src/todos/domain/entities/todo';
import { TodoSchema } from '../schemas/todo.schema';
import { TodoMapper } from '../mapper/todo.mapper';
import { UUID } from 'crypto';
import { throws } from 'assert';
import { NotFoundException } from '@nestjs/common';

export class InMemoryTodoRepository implements TodoRepository {
  #todos = new Map<UUID, TodoSchema>();

  async save(todo: Todo): Promise<Todo> {
    const newTodo = TodoMapper.toPersistence(todo);
    this.#todos.set(newTodo.id, newTodo);
    const result = this.#todos.get(todo.id) as TodoSchema;
    return Promise.resolve(TodoMapper.toDomain(result));
  }

  async findAll(): Promise<Todo[]> {
    const allTodos = Array.from(this.#todos.values());
    const result = allTodos.map((todo) => TodoMapper.toDomain(todo));
    return Promise.resolve(result);
  }

  updateOne(id: UUID, updateFields: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    const todo = this.#todos.get(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    for (const key in updateFields) {
      if (updateFields[key] && key in todo) {
        todo[key] = updateFields[key];
      }
    }

    this.#todos.set(todo.id, todo);
    return Promise.resolve(TodoMapper.toDomain(todo));
  }
}
