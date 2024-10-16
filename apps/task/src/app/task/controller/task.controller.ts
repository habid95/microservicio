import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  async createTask(data: CreateTaskDto) {
    console.log('este es el microservicio', { data });
    return this.taskService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  async findAll(data: { page: number; limit: number }) {
    return this.taskService.findAll(data.page, data.limit);
  }

  @MessagePattern({ cmd: 'get_tasks_by_user' })
  async findAllByUserId(data: { userId: number; page: number; limit: number }) {
    return this.taskService.findByUserId(data.userId, data.page, data.limit);
  }

  @MessagePattern({ cmd: 'update_task' })
  async updateTask(data: { idTask: number; task: UpdateTaskDto }) {
    console.log(data);
    return this.taskService.update(data.idTask, data.task);
  }

  @MessagePattern({ cmd: 'delete_task' })
  async removeTask(idTask: number) {
    return this.taskService.remove(idTask);
  }
}
