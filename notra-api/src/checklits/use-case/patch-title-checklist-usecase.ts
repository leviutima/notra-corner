import { Inject, Injectable } from '@nestjs/common';
import {
  CHECKLIST_REPOSITORY,
  ChecklistRepository,
} from '../repository/checklist-repository';
import { PatchTitleChecklistDto } from '../dto/patch-title-checklits';

@Injectable()
export class PatchTitleChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY)
    private readonly checklistRepo: ChecklistRepository,
  ) {}

  async execute(id:number, checklist: PatchTitleChecklistDto) {
    return await this.checklistRepo.patchTitle(id, checklist)
  }

}
