import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { UserEvent } from '../events/user-event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  emailAddress: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  lastLogin?: Date;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;

  @ManyToMany(() => Event, (event) => event.users)
  events?: Event[];

  @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
  userEvents?: UserEvent[];

  @OneToMany(() => Event, (event) => event.createdBy)
  ownedEvents?: Event[];
}
