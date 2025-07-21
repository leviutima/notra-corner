import { Injectable } from '@nestjs/common';
import { ActivitieRepository } from './activitie-repository';
import { PrismaService } from 'src/prisma.service';
import { Activitie } from '../domain/activitie.entity';

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
    return new Activitie( data.id ,data.title, data.description, data.columnId);
  }

  async getActivitie(columnId: number) {
    const activities = await this.prisma.activitie.findMany({
    where: {
      columnId
    },
  });

    return activities
  }
}
