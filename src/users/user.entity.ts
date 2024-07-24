import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emailAdress: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  lastLogin: Date;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;
}
