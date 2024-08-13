import { IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorators/Match';

export class RegisterRequestDto {
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  password: string;

  @Match('password', { message: 'Passwords do not match' })
  @IsNotEmpty()
  confirmPassword: string;

  phoneNumber: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
