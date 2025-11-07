import { TodoSevirityValue } from 'src/share/enums';

export class CreateTodoCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly severity: TodoSevirityValue,
    public readonly dueDate: Date,
  ) {}
}
