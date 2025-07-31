import { Column } from "../domain/column.entity";
import { PatchOrderColumnDto } from "../dto/patch-order-column.dto";
import { UpdateColumnDto } from "../dto/update-column.dto";

export const COLUMN_REPOSITORY = 'COLUMN_REPOSITORY';
export abstract class ColumnRepository {
  abstract createColumn(column: Column)
  abstract getColumnsByUserId(userId: string): Promise<Column[]>
  abstract updateColumn(id: number, column: UpdateColumnDto)
  abstract deleteColumn(id: number)
  abstract patchColumn(column: PatchOrderColumnDto[])
}