import { Activitie } from "src/activitie/domain/activitie.entity";

export class CheckList {
  constructor(
    private readonly id: number,
    private title: string,
    private finished: boolean,
    private activitieId: string,
    private activitie?: Activitie
  ) {}
}
