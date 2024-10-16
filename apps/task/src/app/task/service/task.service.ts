import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'apps/task/src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { PaginatedResult } from '../interface/paginated.interface';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = this.taskRepository.create({
        ...createTaskDto,
        status: createTaskDto.status,
      });
      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new Error('Error al crear una tarea: ' + error.message);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Task>> {
    try {
      const [tasks, total] = await this.taskRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page,
        limit,
        hasMore: total > page * limit,
        data: tasks,
      };
    } catch (error) {
      throw new Error('Error al obtener las tareas: ' + error.message);
    }
  }

  async findByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Task>> {
    try {
      const [tasks, total] = await this.taskRepository.findAndCount({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page,
        limit,
        hasMore: total > page * limit,
        data: tasks,
      };
    } catch (error) {
      throw new Error(
        'Error al obtener las tareas por usuario: ' + error.message,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      await this.taskRepository.update(id, updateTaskDto);
      return this.findById(id);
    } catch (error) {
      throw new Error('Error al actualizar la tarea: ' + error.message);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const result = await this.taskRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Tarea con el id ${id} no encontrada`);
      }
      return { message: `Tarea con el id ${id}  eliminada correctamente` };
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }

  private async findById(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
      });
      if (!task) {
        throw new NotFoundException(`Tarea con el id ${id} no encontrada`);
      }
      return task;
    } catch (error) {
      throw new Error('Error encontrar la tarea: ' + error.message);
    }
  }
}
