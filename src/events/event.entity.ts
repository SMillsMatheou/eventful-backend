import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { UserEvent } from './user-event.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.ownedEvents)
  createdBy: User;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;

  @ManyToMany(() => User, (user) => user.events)
  users: User[];

  @OneToMany(() => UserEvent, (userEvent) => userEvent.event)
  userEvents: UserEvent[];
}
