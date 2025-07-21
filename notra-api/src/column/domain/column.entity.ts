import { Activitie } from "src/activitie/domain/activitie.entity";

export class Column {
  constructor(
    private readonly id: number | null,
    private title: string,
    private userId: string,
    private activities: Activitie[] = []
  ) {}

    public getId(): number | null {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getActivities(): Activitie[] {
    return this.activities;
  }

  public setActivities(activities: Activitie[]): void {
    this.activities = activities;
  }
}
