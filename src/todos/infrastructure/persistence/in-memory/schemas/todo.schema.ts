import { type UUID } from 'crypto';
import { TodoSevirityValue } from 'src/share/enums';

export class TodoSchema {
  id: UUID;
  title: string;
  description: string;
  completed: boolean;
  severity: TodoSevirityValue;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
