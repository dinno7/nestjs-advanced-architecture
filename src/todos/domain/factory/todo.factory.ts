import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoSeverity } from '../value-objects/todo-severity';
import { TodoSevirityValue } from 'src/share/enums';
import { Todo } from '../entities/todo';

@Injectable()
export class TodoFactory {
  create(
    title: string,
    description: string,
    severity: TodoSevirityValue,
    dueDate: Date,
  ): Todo {
    const id = randomUUID();
    const todoSeverity = new TodoSeverity(severity);
    return new Todo(
      id,
      title,
      description,
      false,
      todoSeverity,
      dueDate,
      new Date(),
      new Date(),
    );
  }
}
