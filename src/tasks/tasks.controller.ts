import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService?.getAllTask(filterDto);
  }

  @Get("/:id")
  GetTaskById(@Param("id") id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete("/:id")
  DeleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Post()
  CreateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id")
  UpdateTaskById(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status);
  }
}
