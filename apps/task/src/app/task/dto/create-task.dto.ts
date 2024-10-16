import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from 'apps/task/src/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'])
  status: TaskStatus;
}
