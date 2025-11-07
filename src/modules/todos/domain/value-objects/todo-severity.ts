import { TodoSevirityValue } from 'src/share/enums';

export class TodoSeverity {
  constructor(readonly value: TodoSevirityValue) {}

  equals(severity: TodoSeverity) {
    return this.value === severity.value;
  }
}
