import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dtos/LoginResponse.dto';
import { RegisterRequestDto } from './dtos/RegisterRequest.dto';
import { RegisterResponseDTO } from './dtos/RegisterResponse.dto';
import { Public } from './decorators/public.decorator';
import { LoginRequestDto } from './dtos/LoginRequest.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginBody: LoginRequestDto,
  ): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(loginBody);
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return this.authService.register(registerBody);
  }
}
