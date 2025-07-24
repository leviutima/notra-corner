import { Inject, Injectable } from "@nestjs/common";
import { ACTIVITIE_REPOSITORY, ActivitieRepository } from "../repository/activitie-repository";

@Injectable()
export class DeleteActiviteUseCase {
  constructor(
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository
  ) {}

  async execute(id: string) {
    return await this.activitieRepo.deleteActivitie(id)
  }
}