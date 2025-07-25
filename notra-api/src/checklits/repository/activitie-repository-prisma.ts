import { Injectable } from '@nestjs/common';
import { ChecklistRepository } from './activitie-repository';
import { PrismaService } from 'src/prisma.service';
import { CheckList } from '../domain/checklits.entity';
import { PatchFinishedChecklist } from '../dto/patch-finished-checklits';
import { finished } from 'stream';
import { PatchTitleChecklistDto } from '../dto/patch-title-checklits';

@Injectable()
export class PrismaChecklistRepository implements ChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createChecklist(checklist: CheckList) {
    const data = await this.prisma.checkList.create({
      data: {
        id: checklist.id,
        title: checklist.title,
        finished: checklist.finished,
        activitieId: checklist.activitieId,
      },
    });

    return new CheckList(data.id, data.title, data.finished, data.activitieId);
  }

 async patchFinished(id: number, checklist: PatchFinishedChecklist) {
    const finishedUpdate = await this.prisma.checkList.update({
      where:{id},
      data: {
        finished: checklist.finished
      }
    })
    return finishedUpdate
  }

  async patchTitle(id: number, checklist: PatchTitleChecklistDto) {
    const titleUpdated = await this.prisma.checkList.update({
      where: {id},
      data: {
        title: checklist.title
      }
    })
    return titleUpdated
  }
}
