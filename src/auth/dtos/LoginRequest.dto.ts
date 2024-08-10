import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  password: string;
}
