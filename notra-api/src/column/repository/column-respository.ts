import { Column } from "../domain/column.entity";

export const COLUMN_REPOSITORY = 'COLUMN_REPOSITORY';
export abstract class ColumnRepository {
  abstract createColumn(column: Column)
}