import { Inject, Injectable } from "@nestjs/common";
import { CHECKLIST_REPOSITORY, ChecklistRepository } from "../repository/checklist-repository";
import { PatchFinishedChecklistDto } from "../dto/patch-finished-checklits";

@Injectable()
export class PatchFinishedChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY)
    private readonly checklistRepo: ChecklistRepository
  ){}

  async execute(id: number, data: PatchFinishedChecklistDto) {
    return await this.checklistRepo.patchFinished(id, data)
  }
}