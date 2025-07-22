import { Inject, Injectable } from "@nestjs/common";
import { COLUMN_REPOSITORY, ColumnRepository } from "../repository/column-respository";

@Injectable()
export class DeleteColumnUseCase {
  constructor(
    @Inject(COLUMN_REPOSITORY)
    private readonly columnRepo: ColumnRepository
  ) {}

  async execute(id: number) {
    return this.columnRepo.deleteColumn(id)
  }
}