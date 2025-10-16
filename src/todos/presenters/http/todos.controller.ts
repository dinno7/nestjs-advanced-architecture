import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TodosService } from '../../application/todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CreateTodoCommand } from 'src/todos/application/commands/create-todo.command';
import { type UUID } from 'crypto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() { title, description, dueDate, severity }: CreateTodoDto) {
    return this.todosService.create(
      new CreateTodoCommand(title, description, severity, dueDate),
    );
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Patch(':todoID')
  makeComplete(@Param('todoID') todoID: UUID) {
    return this.todosService.makeComplete(todoID);
  }
}
