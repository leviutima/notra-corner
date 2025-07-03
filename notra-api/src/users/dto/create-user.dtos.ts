import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "Nome de usuário",
    type: String,
  })
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
