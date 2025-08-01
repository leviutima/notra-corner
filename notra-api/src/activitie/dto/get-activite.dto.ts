import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';
import { CheckList } from 'src/checklits/domain/checklits.entity';
import { Activitie } from '../domain/activitie.entity';

export class GetActivitieDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string | null;

  @ApiProperty()
  @IsInt()
  columnId: number;

  @ApiProperty()
  @IsBoolean()
  finished: boolean | undefined;

  @ApiProperty()
  @IsArray()
  checkLists?: CheckList[];

  constructor(activitie: Activitie) {
    ((this.id = activitie.getId()),
      (this.title = activitie.getTitle()),
      (this.description = activitie.getDescription()),
      (this.columnId = activitie.getColumnId()),
      (this.checkLists = activitie.getCheckLists()),
      (this.finished = activitie.getFinished()));
  }
}
