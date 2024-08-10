import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
