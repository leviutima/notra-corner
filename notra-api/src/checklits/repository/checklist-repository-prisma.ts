import { Injectable } from '@nestjs/common';
import { ChecklistRepository } from './checklist-repository';
import { PrismaService } from 'src/prisma.service';
import { CheckList } from '../domain/checklits.entity';
import { finished } from 'stream';
import { PatchTitleChecklistDto } from '../dto/patch-title-checklits';
import { PatchFinishedChecklistDto } from '../dto/patch-finished-checklits';

@Injectable()
export class PrismaChecklistRepository implements ChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createChecklist(checklist: CheckList) {
    const lastChecklist = await this.prisma.checkList.findFirst({
      where: { activitieId: checklist.activitieId },
    });

    const nextOrder = lastChecklist ? lastChecklist.order + 1 : 1;

    const data = await this.prisma.checkList.create({
      data: {
        id: checklist.id,
        title: checklist.title,
        finished: checklist.finished,
        activitieId: checklist.activitieId,
        order: nextOrder
      },
    });

    return new CheckList(
      data.id,
      data.title,
      data.finished,
      data.activitieId,
      data.createdAt,
      data.order,
    );
  }

  async patchFinished(id: number, checklist: PatchFinishedChecklistDto) {
    const finishedUpdate = await this.prisma.checkList.update({
      where: { id },
      data: {
        finished: checklist.finished,
      },
    });
    return finishedUpdate;
  }

  async patchTitle(id: number, checklist: PatchTitleChecklistDto) {
    const titleUpdated = await this.prisma.checkList.update({
      where: { id },
      data: {
        title: checklist.title,
      },
    });
    return titleUpdated;
  }

  async deleteChecklist(id: number) {
    const onDelete = this.prisma.checkList.delete({
      where: { id },
    });
    return onDelete;
  }
}
