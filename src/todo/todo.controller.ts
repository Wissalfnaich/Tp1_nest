import { Controller, Body, Post,Put,Param,Delete,Get,Query } from '@nestjs/common';
import { CustomTodoValidation } from './custom-validation';
import { TodoEntity} from './entities/todo.entity';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common'; 
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    @Post()
    async createTodo(@Body() customTodoValidation: CustomTodoValidation) {
     
    }

  @Post('second')
  async createSecondTodo(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return this.todoService.addTodo(todo);
  }
  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() updateData: Partial<TodoEntity>) {
    return this.todoService.updateTodo(id, updateData);
  }
  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
  @Delete('soft/:id')
async deleteTodoSoft(@Param('id') id: number) {
  return this.todoService.deleteTodoSoft(id);
}
@Put('restore/:id')
async restoreTodo(@Param('id') id: number) {
  return this.todoService.restoreTodo(id);
}

@Get('countByStatus')
  async getTodoCountByStatus() {
    return this.todoService.getTodoCountByStatus();
  }

  @Get()
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }
  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<TodoEntity> {
    const todo = await this.todoService.getTodoById(id);
    if (!todo) {
      throw new NotFoundException("Le Todo n'a pas été trouvé.");
    }
    return todo;
  }
  @Get()
  async searchTodos(
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('status') status?: string,
  ): Promise<TodoEntity[]> {
    return this.todoService.searchTodos(name, description, status);
  }
 
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): Promise<TodoEntity[]> {
    return this.todoService.getAll(page, perPage);
  }

}


