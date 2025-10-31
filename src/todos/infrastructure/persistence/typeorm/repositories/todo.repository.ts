import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/todos/application/ports/todo.repository';
import { Todo } from 'src/todos/domain/entities/todo';
import { TodoSchema } from '../schemas/todo.schema';
import { Repository } from 'typeorm';
import { TodoMapper } from '../mapper/todo.mapper';
import { NotFoundException } from '@nestjs/common';

export class TypeORMTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoSchema)
    private readonly todoRepository: Repository<TodoSchema>,
  ) {}

  async save(todo: Todo): Promise<Todo> {
    const newTodo = TodoMapper.toPersistence(todo);
    const result = await this.todoRepository.save(newTodo);
    return TodoMapper.toDomain(result);
  }

  async findAll(): Promise<Todo[]> {
    const result = await this.todoRepository.find();
    return result.map((todo) => TodoMapper.toDomain(todo));
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return TodoMapper.toDomain(todo);
  }

  async updateOne(
    id: string,
    updateFields: Partial<Omit<Todo, 'id'>>,
  ): Promise<Todo> {
    const newTodo = await this.todoRepository.update(
      { id },
      {
        title: updateFields?.title,
        completed: updateFields?.completed,
        description: updateFields?.description,
        severity: updateFields?.severity?.value,
        dueDate: updateFields?.dueDate,
      },
    );

    return Promise.resolve(TodoMapper.toDomain(newTodo.raw as TodoSchema));
  }
}
