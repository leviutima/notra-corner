import { Inject, Injectable } from "@nestjs/common";
import { ACTIVITIE_REPOSITORY, ActivitieRepository } from "../repository/activitie-repository";
import { GetActivitieDto } from "../dto/get-activite.dto";

@Injectable()
export class GetActivitieUseCase {
  constructor( 
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository
  ){}

  async execute(columnId: number): Promise<GetActivitieDto[]> {
    const activities = await this.activitieRepo.getActivitie(columnId)
    return activities.map((activitie) => new GetActivitieDto(activitie));
  }
}