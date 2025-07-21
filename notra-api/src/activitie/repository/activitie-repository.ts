import { Activitie } from "../domain/activitie.entity";

export const ACTIVITIE_REPOSITORY = 'ACTIVITIE_REPOSITORY'
export abstract class ActivitieRepository {
  abstract createActivitie(activitie: Activitie)
}