export class CheckList {
  constructor(
    private readonly _id: number | undefined,
    private _title: string,
    private _finished: boolean,
    private _activitieId: string,
    private _createdAt: Date,
    private _order: number,
  ) {}

  get id(): number | undefined {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get finished(): boolean {
    return this._finished;
  }

  get activitieId(): string {
    return this._activitieId;
  }

  public get order(): number {
    return this._order;
  }
  public set order(value: number) {
    this._order = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set finished(value: boolean) {
    this._finished = value;
  }

  set activitieId(value: string) {
    this._activitieId = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }
}
