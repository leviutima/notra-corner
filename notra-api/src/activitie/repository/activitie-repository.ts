import { Activitie } from "../domain/activitie.entity";
import { UpdateActivitieDto } from "../dto/update-activitie.dto";

export const ACTIVITIE_REPOSITORY = 'ACTIVITIE_REPOSITORY'
export abstract class ActivitieRepository {
  abstract createActivitie(activitie: Activitie)
  abstract getActivitie(columnId: number)
  abstract updateActivitie(id: string ,activitie: UpdateActivitieDto)
}