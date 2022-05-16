import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  created_at: String;

  @Column()
  updated_at: String;
}
