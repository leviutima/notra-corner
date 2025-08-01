import { PrismaService } from 'src/prisma.service';
import { ColumnRepository } from './column-respository';
import { Injectable } from '@nestjs/common';
import { Column } from '../domain/column.entity';
import { Activitie } from 'src/activitie/domain/activitie.entity';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { PatchOrderColumnDto } from '../dto/patch-order-column.dto';

@Injectable()
export class PrismaColumnRepository implements ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createColumn(column: Column) {
    const firstColumn = await this.prisma.column.findFirst({
      where: { userId: column.getUserId() },
      orderBy: { order: 'desc' },
    });

    const nextOrder = firstColumn ? firstColumn.order + 1 : 0;
    const data = await this.prisma.column.create({
      data: {
        title: column.getTitle(),
        userId: column.getUserId(),
        order: nextOrder,
      },
    });

    return new Column(data.id, data.title, data.userId, data.order);
  }

  async getColumnsByUserId(userId: string): Promise<Column[]> {
    const columns = await this.prisma.column.findMany({
      where: { userId },
      include: {
        activities: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    return columns.map((column) => {
      const activities = column.activities.map(
        (a) => new Activitie(a.id, a.title, a.description, a.columnId, a.order, [] ,a.finished),
      );

      return new Column(
        column.id,
        column.title,
        column.userId,
        column.order,
        activities,
      );
    });
  }

  async updateColumn(id: number, column: UpdateColumnDto) {
    const updatedColumn = await this.prisma.column.update({
      where: {
        id: id,
      },
      data: {
        title: column.title,
      },
    });
    return new Column(
      updatedColumn.id,
      updatedColumn.title,
      updatedColumn.userId,
      updatedColumn.order,
    );
  }

  async patchColumn(columns: PatchOrderColumnDto[]) {
    return await Promise.all(
      columns.map((column) =>
        this.prisma.column.update({
          where: { id: column.id },
          data: { order: column.order },
        }),
      ),
    );
  }

  async deleteColumn(id: number) {
    await this.prisma.activitie.deleteMany({
      where: {
        columnId: id,
      },
    });
    const deletedColumn = await this.prisma.column.delete({
      where: { id },
    });
    return deletedColumn;
  }
}
