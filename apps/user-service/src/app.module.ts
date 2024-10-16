import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeConfig } from './database/typeOrm.config';
import { UserModule } from './app/user/user.module';
import { TaskController } from './app/task/controller/task.controller';
import { TaskService } from './app/task/service/task.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeConfig),
    ClientsModule.register([
      { name: 'TASK_SERVICE', transport: Transport.TCP },
    ]),
    UserModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
