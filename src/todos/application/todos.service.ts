import { Injectable } from '@nestjs/common';
import { CreateTodoCommand } from './commands/create-todo.command';
import { TodoRepository } from './ports/todo.repository';
import { TodoFactory } from '../domain/factory/todo.factory';
import { Todo } from '../domain/entities/todo';
import { UUID } from 'crypto';

@Injectable()
export class TodosService {
  constructor(
    private readonly todoFactory: TodoFactory,
    private readonly todoRepository: TodoRepository,
  ) {}
  create({
    title,
    description,
    severity,
    dueDate,
  }: CreateTodoCommand): Promise<Todo> {
    const newTodo = this.todoFactory.create(
      title,
      description,
      severity,
      dueDate,
    );
    return this.todoRepository.save(newTodo);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  makeComplete(todoID: UUID) {
    return this.todoRepository.updateOne(todoID, { completed: true });
  }
}
