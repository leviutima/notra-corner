import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";
import { Column } from 'src/column/domain/column.entity';

export class CreateTaskBoardDto {
  @ApiProperty({ description: 'Id do quadro de tarefa' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Título do quadro de tarefa' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Id do usuário' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Colunas' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Column) 
  columns: Column[]
}
