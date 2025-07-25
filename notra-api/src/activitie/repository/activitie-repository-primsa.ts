import { Injectable } from '@nestjs/common';
import { ActivitieRepository } from './activitie-repository';
import { PrismaService } from 'src/prisma.service';
import { Activitie } from '../domain/activitie.entity';
import { UpdateActivitieDto } from '../dto/update-activitie.dto';
import { CheckList } from 'src/checklits/domain/checklits.entity';

@Injectable()
export class PrismaActivitieRepository implements ActivitieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createActivitie(activitie: Activitie) {
    const data = await this.prisma.activitie.create({
      data: {
        title: activitie.getTitle(),
        description: activitie.getDescription(),
        columnId: activitie.getColumnId(),
        finished: activitie.getFinished() ?? false,
      },
      include: {
        column: true,
      },
    });
    return new Activitie(data.id, data.title, data.description, data.columnId);
  }

  async getActivitie(columnId: number): Promise<Activitie[]> {
  const activities = await this.prisma.activitie.findMany({
    where: {
      columnId,
    },
    include: {
      checkList: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    },
  });

  return activities.map((activity) => {
    const checklists = activity.checkList.map(
      (checklist) =>
        new CheckList(
          checklist.id,
          checklist.title,
          checklist.finished,
          checklist.activitieId,
          checklist.createdAt
        )
    );

    return new Activitie(
      activity.id,
      activity.title,
      activity.description,
      activity.columnId,
      checklists,
      activity.finished
    );
  });
}

  async updateActivitie(id: string, activitie: UpdateActivitieDto) {
    const updatedActivitie = await this.prisma.activitie.update({
      where: { id },
      data: {
        title: activitie.title,
        description: activitie.description,
      },

      
    });

    return updatedActivitie;
  }

  async deleteActivitie(id: string) {
    const deletedActvitie = await this.prisma.activitie.delete({
      where: {id}
    })

    return deletedActvitie
  }
}
