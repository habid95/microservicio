import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TaskStatus {
  PENDIENTE = 'pendiente',
  EN_PROGRESO = 'en progreso',
  COMPLETADA = 'completada',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDIENTE,
  })
  status?: TaskStatus;
}
