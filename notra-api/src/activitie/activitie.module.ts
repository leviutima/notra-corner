import { Module } from "@nestjs/common";
import { CreateActivitieUseCase } from "./use-case/create-activitie-usecase";
import { PrismaService } from "src/prisma.service";
import { ActivitieController } from "./activite.controller";
import { PrismaActivitieRepository } from "./repository/activitie-repository-primsa";
import { ACTIVITIE_REPOSITORY } from "./repository/activitie-repository";


@Module({
  imports: [],
  controllers: [ActivitieController],
  providers: [
    PrismaService,
    CreateActivitieUseCase,
    { provide: ACTIVITIE_REPOSITORY, useClass: PrismaActivitieRepository },
  ],
  exports: [CreateActivitieUseCase, ACTIVITIE_REPOSITORY],
})
export class ActivitieModule {}
