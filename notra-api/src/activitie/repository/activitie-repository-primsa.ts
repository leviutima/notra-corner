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
      },
      include: {
        column: true, 
      },
    });
    return new Activitie( data.title, data.description, data.columnId);
  }
}
