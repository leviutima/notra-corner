import { ApiProperty } from '@nestjs/swagger';
import { Column } from '@prisma/client';

export class GetColumnResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: string;

  constructor(column: Column) {
    this.id = column.id;
    this.title = column.title;
    this.userId = column.userId
  }
}
