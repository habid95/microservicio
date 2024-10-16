import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn()
  Id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;
}
