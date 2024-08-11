import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ emailAddress: email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
