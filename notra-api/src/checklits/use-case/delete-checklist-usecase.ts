import { Inject, Injectable } from "@nestjs/common";
import { CHECKLIST_REPOSITORY, ChecklistRepository } from "../repository/checklist-repository";

@Injectable()
export class DeleteChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY)
    private readonly checklistRepo: ChecklistRepository
  ) {}

  async execute(id: number) {
    return await this.checklistRepo.deleteChecklist(id)
  }

}