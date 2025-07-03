import {
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string

  @IsDate()
  birthDate: Date
}
