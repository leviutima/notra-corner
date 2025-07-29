import { Inject, Injectable } from "@nestjs/common";
import { ACTIVITIE_REPOSITORY, ActivitieRepository } from "../repository/activitie-repository";
import { CreateActivitieDto } from "../dto/create-activitie.dto";
import { Activitie } from "../domain/activitie.entity";

@Injectable()
export class CreateActivitieUseCase {
  constructor(
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository
  ) {}

  async execute(dto: CreateActivitieDto) {
    const activitie = new Activitie(
      dto.id,
      dto.title,
      dto.description,
      Number(dto.columnId),
      0,                    
      dto.checkLists,
      false                 
    );

    const createdActivitie = await this.activitieRepo.createActivitie(activitie);
    return createdActivitie;
  }
}
