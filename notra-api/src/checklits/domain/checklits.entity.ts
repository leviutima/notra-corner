import { Activitie } from 'src/activitie/domain/activitie.entity';

export class CheckList {
  constructor(
    private readonly _id: number | undefined,
    private _title: string,
    private _finished: boolean,
    private _activitieId: string,
  ) {}

  get id(): number | undefined{
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

  set title(value: string) {
    this._title = value;
  }

  set finished(value: boolean) {
    this._finished = value;
  }

  set activitieId(value: string) {
    this._activitieId = value;
  }

}
