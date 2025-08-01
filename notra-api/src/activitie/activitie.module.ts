import { Module } from '@nestjs/common';
import { CreateActivitieUseCase } from './use-case/create-activitie-usecase';
import { PrismaService } from 'src/prisma.service';
import { ActivitieController } from './activite.controller';
import { PrismaActivitieRepository } from './repository/activitie-repository-primsa';
import { ACTIVITIE_REPOSITORY } from './repository/activitie-repository';
import { GetActivitieUseCase } from './use-case/get-activitie-usecase';
import { UpdateActivitieUseCase } from './use-case/update-activitie-usecase';
import { DeleteActiviteUseCase } from './use-case/delete-activitie';
import { UseCasePatchActivitieFinished } from './use-case/patch-activitie-finished';

@Module({
  imports: [],
  controllers: [ActivitieController],
  providers: [
    PrismaService,
    CreateActivitieUseCase,
    GetActivitieUseCase,
    UpdateActivitieUseCase,
    DeleteActiviteUseCase,
    UseCasePatchActivitieFinished,
    { provide: ACTIVITIE_REPOSITORY, useClass: PrismaActivitieRepository },
  ],
  exports: [CreateActivitieUseCase, ACTIVITIE_REPOSITORY],
})
export class ActivitieModule {}
