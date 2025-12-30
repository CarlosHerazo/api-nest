import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

import { Task } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    async getTasks(): Promise<Task[]> {
        return await this.taskService.getTasks();
    }
    
    @Get(':id')
    async getTask(@Param('id') id: string): Promise<Task> {
        return await this.taskService.getTask(id);
    }

    @Post()
    async createTask(@Body() taskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(taskDto);
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() taskDto: UpdateTaskDto): Promise<Task> {
        return await this.taskService.updateTask(id, taskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
        return await this.taskService.deleteTask(id);
    }
}
