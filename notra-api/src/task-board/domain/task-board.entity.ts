import { Column } from 'src/column/domain/column.entity';

export class TaskBoard {
  constructor(
    private readonly id: string,
    private title: string,
    private userId: string,
    private column: Column[],
  ) {}

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getColumn(): Column[] {
    return this.column;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public setColumn(column: Column[]): void {
    this.column = column;
  }
}
