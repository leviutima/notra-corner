import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome de usuário' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Sobrenome de usuário' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'Email de usuário' })
  @IsEmail()
  email: string;

//   @ApiProperty({ description: 'Senha de usuário' })
//   @IsNotEmpty()
//   password: string;

  @ApiProperty({ description: 'Data de nascimento de usuário', format: 'date' })
  @IsDateString()
  birthDate: Date;
}
