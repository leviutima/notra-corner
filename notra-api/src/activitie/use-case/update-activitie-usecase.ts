import { Inject, Injectable } from '@nestjs/common';
import {
  ACTIVITIE_REPOSITORY,
  ActivitieRepository,
} from '../repository/activitie-repository';
import { UpdateActivitieDto } from '../dto/update-activitie.dto';

@Injectable()
export class UpdateActivitieUseCase {
  constructor(
    @Inject(ACTIVITIE_REPOSITORY)
    private readonly activitieRepo: ActivitieRepository,
  ) {}

  async execute(id: string, data: UpdateActivitieDto) {
    const activitie = await this.activitieRepo.updateActivitie(id, data);
    return activitie;
  }
}
