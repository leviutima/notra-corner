import { Injectable } from '@nestjs/common';
import { ChecklistRepository } from './activitie-repository';
import { PrismaService } from 'src/prisma.service';
import { CheckList } from '../domain/checklits.entity';

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
}
