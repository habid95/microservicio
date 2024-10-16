import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'apps/user-service/src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_SERVICE') private clientTask: ClientProxy,
    @InjectRepository(User)
    private readonly _user: Repository<User>,
  ) {}

  async createTask(userId: number, taskData: any) {
    try {
      const user = await this._user.findOne({
        where: { Id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return this.clientTask.send({ cmd: 'create_task' }, taskData);
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      return this.clientTask.send({ cmd: 'get_all_tasks' }, { page, limit });
    } catch (error) {
      throw new Error('Error retrieving tasks: ' + error.message);
    }
  }

  async findAllByUserId(userId: number, page: number = 1, limit: number = 10) {
    try {
      return this.clientTask.send(
        { cmd: 'get_tasks_by_user' },
        { userId, page, limit },
      );
    } catch (error) {
      throw new Error('Error retrieving task: ' + error.message);
    }
  }

  async remove(idTask: number) {
    try {
      return this.clientTask.send({ cmd: 'delete_task' }, idTask);
    } catch (error) {
      throw new Error('Error removing task: ' + error.message);
    }
  }

  async update(idTask: number, task: any) {
    try {
      console.log({ idTask, task });
      return this.clientTask.send({ cmd: 'update_task' }, { idTask, task });
    } catch (error) {
      throw new Error('Error updating task: ' + error.message);
    }
  }
}
