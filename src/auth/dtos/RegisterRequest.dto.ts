import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  password: string;

  phoneNumber: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
