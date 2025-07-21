import { Inject, Injectable } from '@nestjs/common';
import { COLUMN_REPOSITORY, ColumnRepository } from '../repository/column-respository';
import { UpdateColumnDto } from '../dto/update-column.dto';

@Injectable()
export class UpdateColumnUseCase {
  constructor(
    @Inject(COLUMN_REPOSITORY)
    private readonly columnRepo: ColumnRepository
  ) {}

  async execute(id: number,updateColumnDto: UpdateColumnDto) {
    const column = await this.columnRepo.updateColumn(id,updateColumnDto)
    return column
  }

}
