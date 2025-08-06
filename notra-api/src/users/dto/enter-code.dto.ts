import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnterCodeDto {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty({})
  @IsString()
  code: string;
}
