import { IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
