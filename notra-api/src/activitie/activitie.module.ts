import { Module } from "@nestjs/common";
import { CreateActivitieUseCase } from "./use-case/create-activitie-usecase";
import { PrismaService } from "src/prisma.service";
import { ActivitieController } from "./activite.controller";
import { PrismaActivitieRepository } from "./repository/activitie-repository-primsa";
import { ACTIVITIE_REPOSITORY } from "./repository/activitie-repository";
import { GetActivitieUseCase } from "./use-case/get-activitie-usecase";


@Module({
  imports: [],
  controllers: [ActivitieController],
  providers: [
    PrismaService,
    CreateActivitieUseCase,
    GetActivitieUseCase,
    { provide: ACTIVITIE_REPOSITORY, useClass: PrismaActivitieRepository },
  ],
  exports: [CreateActivitieUseCase, ACTIVITIE_REPOSITORY],
})
export class ActivitieModule {}
