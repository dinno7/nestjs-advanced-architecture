import { TodoSevirityValue } from 'src/share/enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('todos')
export class TodoSchema {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @Column()
  severity: TodoSevirityValue;

  @Column()
  dueDate: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
