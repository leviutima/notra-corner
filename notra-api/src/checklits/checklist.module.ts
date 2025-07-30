import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { PrismaService } from "src/prisma.service";
import { CreateChecklistUseCase } from "./use-case/create-checklist-usecase";
import { CHECKLIST_REPOSITORY } from "./repository/checklist-repository";
import { PrismaChecklistRepository } from "./repository/checklist-repository-prisma";
import { CreateColumnUseCase } from "src/column/use-case/create-column-usecase";
import { PatchTitleChecklistDto } from "./dto/patch-title-checklits";
import { PatchTitleChecklistUseCase } from "./use-case/patch-title-checklist-usecase";
import { PatchFinishedChecklistUseCase } from "./use-case/patch-finished-checklist-usecase";
import { DeleteChecklistUseCase } from "./use-case/delete-checklist-usecase";



@Module({
  imports: [],
  controllers: [ChecklistController],
  providers: [
    PrismaService,
    CreateChecklistUseCase,
    PatchTitleChecklistUseCase,
    PatchFinishedChecklistUseCase,
    DeleteChecklistUseCase,
    { provide: CHECKLIST_REPOSITORY, useClass: PrismaChecklistRepository },
  ],
  exports: [],
})
export class ChecklistModule {}
