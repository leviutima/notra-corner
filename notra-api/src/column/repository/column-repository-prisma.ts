import { PrismaService } from 'src/prisma.service';
import { ColumnRepository } from './column-respository';
import { Injectable } from '@nestjs/common';
import { Column } from '../domain/column.entity';
import { Activitie } from 'src/activitie/domain/activitie.entity';
import { UpdateColumnDto } from '../dto/update-column.dto';

@Injectable()
export class PrismaColumnRepository implements ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createColumn(column: Column) {
    const data = await this.prisma.column.create({
      data: {
        title: column.getTitle(),
        userId: column.getUserId(),
      },
    });

    return new Column(data.id, data.title, data.userId);
  }

  async getColumnsByUserId(userId: string): Promise<Column[]> {
    const columns = await this.prisma.column.findMany({
      where: { userId },
      include: {
        activities: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return columns.map((column) => {
      const activities = column.activities.map(
        (a) => new Activitie(a.id, a.title, a.description, a.columnId, a.order),
      );

      return new Column(column.id, column.title, column.userId, activities);
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
    return deletedColumn
  }
}
