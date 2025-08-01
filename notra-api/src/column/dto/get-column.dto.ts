import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt } from 'class-validator';
import { Activitie } from 'src/activitie/domain/activitie.entity';
import { Column } from '../domain/column.entity';

export class GetColumnResponseDto {
  @ApiProperty()
  id: number | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsArray()
  activities: Activitie[]

  @ApiProperty()
  @IsInt()
  order:  number | undefined 

  constructor(column: Column) {
    this.id = column.getId();
    this.title = column.getTitle();
    this.userId = column.getUserId()
    this.activities = column.getActivities();
    this.order = column.getOrder();
  }
}
