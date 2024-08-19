import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from './event.entity';

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.userEvents)
  user: User;

  @ManyToOne(() => Event, (event) => event.userEvents)
  event: Event;

  @Column({ nullable: true })
  role?: string;

  @Column({ nullable: true })
  joinedDate?: Date;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;
}
