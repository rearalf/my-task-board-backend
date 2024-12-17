import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from 'src/interfaces/interfaces';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of task' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'The description of task' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({ description: 'Icon of the task' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  icon: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
