import { TodoSevirityValue } from 'src/share/enums';

export class TodoSchema {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  severity: TodoSevirityValue;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
