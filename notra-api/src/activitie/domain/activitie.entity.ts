import { CheckList } from "src/checklits/domain/checklits.entity";

export class Activitie {
  constructor(
    private readonly id: string,
    private title: string,
    private description: string | null,
    private columnId: number,
    private checkLists?: CheckList[],
    private finished?: boolean
  ) {}

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public getColumnId(): number {
    return this.columnId;
  }

  public getCheckLists(): CheckList[] | undefined {
    return this.checkLists;
  }

  public getFinished(): boolean | undefined{
    return this.finished;
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

  public setFinished(finished: boolean): void {
    this.finished = finished;
  }
}
