import { PrismaService } from 'src/prisma.service';
import { ColumnRepository } from './column-respository';
import { Injectable } from '@nestjs/common';
import { Column } from '../domain/column.entity';

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
      where: { userId }
    })

    return columns.map(
      (column) => new Column(column.id, column.title, column.userId)
    )
  }
}
