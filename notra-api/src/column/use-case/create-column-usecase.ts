import { Inject, Injectable } from '@nestjs/common';
import {
  COLUMN_REPOSITORY,
  ColumnRepository,
} from '../repository/column-respository';
import { CreateColumnDto } from '../dto/create-column.dto';
import { Column } from '../domain/column.entity';

@Injectable()
export class CreateColumnUseCase {
  constructor(
    @Inject(COLUMN_REPOSITORY)
    private readonly columnRepo: ColumnRepository,
  ) {}

  async execute(dto: CreateColumnDto) {
    const column = new Column(null, dto.title, dto.userId);
    const createdColumn = await this.columnRepo.createColumn(column)
    return createdColumn
  }
}
