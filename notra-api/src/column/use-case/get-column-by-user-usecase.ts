import { Inject, Injectable } from "@nestjs/common";
import { COLUMN_REPOSITORY, ColumnRepository } from "../repository/column-respository";

@Injectable()
export class GetColumnByUserUseCase {
  constructor(
    @Inject(COLUMN_REPOSITORY)
    private readonly columnRepo: ColumnRepository
  ) {}

  async execute(userId: string) {
    const columns = await this.columnRepo.getColumnsByUserId(userId);

    return columns.map((column) => ({
      id: column.id,
      title: column.title,
      userId: column.userId,
    }));
  }
}
