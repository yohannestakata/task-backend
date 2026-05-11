import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { EditTaskStatusDto } from './dto/edit-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  public editTask(
    @Body() editTaskDto: EditTaskDto,
    @Param('id') id: string,
  ): Task {
    return this.tasksService.editTask(id, editTaskDto);
  }

  @Patch(':id/status')
  public editTaskStatus(
    @Param('id') id: string,
    @Body() editTaskStatusDto: EditTaskStatusDto,
  ): Task {
    return this.tasksService.editTaskStatus(id, editTaskStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param(':id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
