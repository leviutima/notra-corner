import { Injectable } from "@nestjs/common";
import { CheckList } from "../domain/checklits.entity";

export const CHECKLIST_REPOSITORY = 'CHECKLIST_REPOSITORY'
export abstract class ChecklistRepository {
  abstract createChecklist(checklist: CheckList)
}