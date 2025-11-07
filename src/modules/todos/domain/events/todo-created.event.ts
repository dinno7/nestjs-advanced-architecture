import { Todo } from '../entities/todo';

export class TodoCreatedEvent {
  constructor(public readonly todo: Todo) {}
}
