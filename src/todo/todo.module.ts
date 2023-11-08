import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoEntity } from './entities/todo.entity';
@Module({
  imports:[TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService,],
  controllers: [TodoController]
})
export class TodoModule {}
