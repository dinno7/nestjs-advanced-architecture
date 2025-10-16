import { UUID } from 'crypto';
import { TodoSeverity } from '../value-objects/todo-severity';

export class Todo {
  constructor(
    public readonly id: UUID,
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
    public readonly severity: TodoSeverity,
    public readonly dueDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
