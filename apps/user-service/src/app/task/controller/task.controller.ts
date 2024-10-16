import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  @Post(':id')
  async createTask(
    @Param('id') userId: number,
    @Body() taskData: CreateTaskDto,
  ) {
    return this._taskService.createTask(userId, taskData);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this._taskService.findAll(page, limit);
  }

  @Get(':id')
  findById(
    @Param('id') userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this._taskService.findAllByUserId(userId, page, limit);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    return this._taskService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') Id: number) {
    return this._taskService.remove(Id);
  }
}
