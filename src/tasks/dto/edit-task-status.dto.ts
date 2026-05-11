import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class EditTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
