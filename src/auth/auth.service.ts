import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dtos/RegisterRequest.dto';
import { AccessToken } from './types/AccessToken';
import { LoginRequestDto } from './dtos/LoginRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  1;

  async validateUser(emailAddress: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOne(emailAddress);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async login(request: LoginRequestDto): Promise<AccessToken> {
    const user = await this.validateUser(
      request.emailAddress,
      request.password,
    );
    const payload = { emailAddress: user.emailAddress, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOne(user.emailAddress);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = { ...user, password: hashedPassword };

    await this.usersService.create(newUser);

    return this.login(newUser);
  }
}
