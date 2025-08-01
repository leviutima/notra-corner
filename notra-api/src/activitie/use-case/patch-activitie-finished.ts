import { Inject, Injectable } from "@nestjs/common";
import { ACTIVITIE_REPOSITORY, ActivitieRepository } from "../repository/activitie-repository";
import { PatchFinishedDto } from "../dto/patch-finished.dto";

@Injectable()
export class UseCasePatchActivitieFinished{
  constructor(
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository
  ) {}

  async execute(id: string, data: PatchFinishedDto) {
    return await this.activitieRepo.patchFinishedActivitie(id, data)
  }
}