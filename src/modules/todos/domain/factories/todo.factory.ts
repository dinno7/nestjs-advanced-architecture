import { Injectable } from '@nestjs/common';
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
    const id = parseInt(`${Math.random() * 1000}`, 10).toString();
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
