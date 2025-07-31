import { Body, Inject, Injectable } from "@nestjs/common";
import { CHECKLIST_REPOSITORY, ChecklistRepository } from "../repository/checklist-repository";
import { CreateCheckListDto } from "../dto/create-checklits.dto";
import { CheckList } from "../domain/checklits.entity";

@Injectable()
export class CreateChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY)
    private readonly checklistRepo: ChecklistRepository
  ) {}

  async execute(@Body() data: CreateCheckListDto) {
    const checklist = new CheckList(
      undefined,
      data.title,
      data.finished,
      data.activitieId,
      data.createdAt,
      data.order
    );
    return await this.checklistRepo.createChecklist(checklist);
  }
}