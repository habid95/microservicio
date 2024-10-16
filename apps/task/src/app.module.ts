import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeConfig } from './database/typeOrm.config';
import { TaskModule } from './app/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeConfig),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
