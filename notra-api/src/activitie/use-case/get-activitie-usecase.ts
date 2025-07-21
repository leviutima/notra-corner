import { Inject, Injectable } from "@nestjs/common";
import { ACTIVITIE_REPOSITORY, ActivitieRepository } from "../repository/activitie-repository";

@Injectable()
export class GetActivitieUseCase {
  constructor( 
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository
  ){}

  async execute(columnId: number) {
    const activities = await this.activitieRepo.getActivitie(columnId)
    return activities; 
  }
}