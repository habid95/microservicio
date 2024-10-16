import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../entities/user.entity';

dotenv.config();

export const UserDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME2,
  entities: [User],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
});
