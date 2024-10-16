import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
