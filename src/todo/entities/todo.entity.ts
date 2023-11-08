import { StatusEnum } from '../status.enum';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column
    
  } from 'typeorm'
import { CustomTodoValidation } from '../custom-validation';
import { Validate } from 'class-validator';
import { Timestamp } from 'src/common/database/timestamp.entity';

@Entity('todo')
export class TodoEntity extends Timestamp  {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;

    @Validate(CustomTodoValidation)
    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
    status: StatusEnum;

  }