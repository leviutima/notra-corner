import { Injectable } from "@nestjs/common";
import { CheckList } from "../domain/checklits.entity";
import { PatchTitleChecklistDto } from "../dto/patch-title-checklits";
import { PatchFinishedChecklistDto } from "../dto/patch-finished-checklits";

export const CHECKLIST_REPOSITORY = 'CHECKLIST_REPOSITORY'
export abstract class ChecklistRepository {
  abstract createChecklist(checklist: CheckList)
  abstract patchTitle(id: number, checklist: PatchTitleChecklistDto)
  abstract patchFinished(id: number, checklist: PatchFinishedChecklistDto)
  abstract deleteChecklist(id: number)
}