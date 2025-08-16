import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({ description: 'Nome de quem envia a sugestão' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Sobrenome de quem envia a sugestão' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'Email de quem envia a sugestão' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Sugestão da nova feature' })
  @IsString()
  suggestion: string;
}
