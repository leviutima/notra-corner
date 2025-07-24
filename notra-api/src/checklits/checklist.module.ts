import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { PrismaService } from "src/prisma.service";
import { CreateChecklistUseCase } from "./use-case/create-checklist-usecase";
import { CHECKLIST_REPOSITORY } from "./repository/activitie-repository";
import { PrismaChecklistRepository } from "./repository/activitie-repository-prisma";
import { CreateColumnUseCase } from "src/column/use-case/create-column-usecase";



@Module({
  imports: [],
  controllers: [ChecklistController],
  providers: [
    PrismaService,
    CreateChecklistUseCase,
    { provide: CHECKLIST_REPOSITORY, useClass: PrismaChecklistRepository },
  ],
  exports: [],
})
export class ChecklistModule {}
