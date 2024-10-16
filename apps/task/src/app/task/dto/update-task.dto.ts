import { TaskStatus } from 'apps/task/src/entities/task.entity';
import { IsOptional, IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'])
  status: TaskStatus;
}
