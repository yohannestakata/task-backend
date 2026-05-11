import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { EditTaskStatusDto } from './dto/edit-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasks(filterDto: GetTasksFilterDto): Task[] {
    let tasks = this.tasks;
    const { status, search } = filterDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task?.description.toLowerCase().includes(search),
      );
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`Task with ID "${id}" not found`);

    return task;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public editTask(id: string, editTaskDto: EditTaskDto): Task {
    if ('status' in editTaskDto) {
      throw new BadRequestException(
        'Status cannot e updated from this endpoint. Use PATCH /tasks/:id/status',
      );
    }

    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    Object.assign(task, editTaskDto);

    return task;
  }

  public editTaskStatus(
    id: string,
    editTaskStatusDto: EditTaskStatusDto,
  ): Task {
    const { status } = editTaskStatusDto;
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }

  public deleteTask(id: string): void {
    this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
