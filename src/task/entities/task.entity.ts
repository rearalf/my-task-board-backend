import { TaskStatus } from 'src/interfaces/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of task' })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({ description: 'The description of task' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Icon of the task' })
  @Column({ type: 'text' })
  icon: string;

  @ApiProperty({
    description:
      "Task status where it can be null or won't do, in progress or completed",
  })
  @Column({
    type: 'text',
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
