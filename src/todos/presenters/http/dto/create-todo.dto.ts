import { Transform } from 'class-transformer';
import { IsDate, IsDateString, IsEnum, IsString } from 'class-validator';
import { TodoSevirityValue } from 'src/share/enums';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TodoSevirityValue)
  severity: TodoSevirityValue;

  @IsDate()
  @Transform(({ value }) => typeof value === 'string' && new Date(value))
  dueDate: Date;
}
