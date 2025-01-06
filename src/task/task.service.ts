import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = this.taskRepository.create(createTaskDto);
    const savedTask = await this.taskRepository.save(createdTask);
    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      order: {
        create_at: 'ASC',
      },
    });
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    const taskExists = await this.taskRepository.findOneBy({ id });

    if (!taskExists) throw new NotFoundException(`Task not found`);

    const updateTask = await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({
        ...updateTaskDto,
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updateTask;
  }

  async remove(id: number): Promise<UpdateResult> {
    const taskExists = await this.taskRepository.findOneBy({ id });

    if (!taskExists) throw new NotFoundException(`Task not found`);

    const softDeleteTask = await this.taskRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return softDeleteTask;
  }
}
