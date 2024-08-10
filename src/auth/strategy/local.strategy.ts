import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/users/user.entity';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailAddress',
    });
  }

  async validate(emailAddress: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(emailAddress, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
