import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/RegisterRequest.dto';
import { Public } from './decorators/public.decorator';
import { LoginRequestDto } from './dtos/LoginRequest.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginBody: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginBody);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      statusCode: 200,
      message: 'Logged in',
    };
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
    @Res() response: Response,
  ) {
    const result = await this.authService.register(registerBody);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      statusCode: 200,
      message: 'User registered',
    };
  }

  @Public()
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return {
      statusCode: 200,
      message: 'Logged out',
    };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }

    const result = await this.authService.refresh(refreshToken);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      statusCode: 200,
      message: 'Token refreshed',
    };
  }

  @Get('verify')
  async verify() {
    return {
      statusCode: 200,
      message: 'Authenticated',
    };
  }
}
