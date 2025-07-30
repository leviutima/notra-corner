import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';
import { CheckList } from 'src/checklits/domain/checklits.entity';

export class CreateActivitieDto {
  @ApiProperty({description: 'Id da atividade'})
  @IsUUID()
  id: string

  @ApiProperty({ description: 'Titulo da atividade' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição da atividade' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  order: number

  @ApiProperty({ description: 'ID da coluna relacionada' })
  @IsUUID()
  columnId: string;

  @ApiProperty({description: "checklists da atividade"})
  @IsArray()
  checkLists?: CheckList[];
}
