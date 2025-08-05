import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnterCodeDto {
  @ApiProperty({})
  @IsString()
  code: string;
}
