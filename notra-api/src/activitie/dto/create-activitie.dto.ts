import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { CheckList } from 'src/checklits/domain/checklits.entity';

export class CreateActivitieDto {
  @ApiProperty({ description: 'Titulo da atividade' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição da atividade' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID da coluna relacionada' })
  @IsUUID()
  columnId: string;

  @ApiProperty({description: "checklists da atividade"})
  @IsArray()
  checkLists?: CheckList[];
}
