import { CheckList } from "src/checklits/domain/checklits.entity";

export class Activitie {
  constructor(
    private title: string,
    private description: string,
    private columnId: number,
    private checkLists?: CheckList[]
  ) {}

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getColumnId(): number {
    return this.columnId;
  }

  public getCheckLists(): CheckList[] | undefined {
    return this.checkLists;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setColumnId(columnId: number): void {
    this.columnId = columnId;
  }

  public setCheckLists(checkLists: CheckList[]): void {
    this.checkLists = checkLists;
  }
}
