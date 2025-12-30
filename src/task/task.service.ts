import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Task } from './task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getTasks(): Promise<Task[]> {
        return await this.prisma.task.findMany();
    }

    async getTask(id: string): Promise<Task> {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException(`Task with id ${id} not found`);
        return task;
    }

    async createTask(taskDto: CreateTaskDto): Promise<Task> {
        return await this.prisma.task.create({ data: taskDto });
    }

    async updateTask(id: string, taskDto: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.prisma.task.findUnique({ where: { id } });
        if (!existingTask) throw new NotFoundException(`Task with id ${id} not found`);

        return await this.prisma.task.update({
            where: { id },
            data: taskDto,
        });
    }

    async deleteTask(id: string): Promise<{ message: string }> {
        const existingTask = await this.prisma.task.findUnique({ where: { id } });
        if (!existingTask) throw new NotFoundException(`Task with id ${id} not found`);

        await this.prisma.task.delete({ where: { id } });
        return {
            message: `Task with id ${id} has been deleted`,
        }
    }
}
