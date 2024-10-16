import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../entities/task.entity';

dotenv.config();

export const UserDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
});
