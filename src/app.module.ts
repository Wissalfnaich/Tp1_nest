import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [CommonModule, TestModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:  +process.env.DB_PORT, //parseInt(process.env.DB_PORT),
      username: 'root', //process.env.DB_USERNAME,
      password: '',// process.env.DB_PASSWORD,
      database: 'tp_nest',//process.env.DB_NAME,
      autoLoadEntities: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      debug: false
    }),
    TodoModule,
    ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
