import { Activitie } from "src/activitie/domain/activitie.entity";

export class Column {
  constructor(
    private readonly id: number | null,
    private title: string,
    private taskBoardId: string,
    private order?: number,
    private activities: Activitie[] = [],
  ) {}

    public getId(): number | null {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getOrder(): number | undefined {
    return this.order
  }

  public setOrder(order: number) {
    this.order = order
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getTaskBarId(): string {
    return this.taskBoardId;
  }

  public setTaskBarId(taskBoardId: string): void {
    this.taskBoardId = taskBoardId;
  }

  public getActivities(): Activitie[] {
    return this.activities;
  }

  public setActivities(activities: Activitie[]): void {
    this.activities = activities;
  }
}
