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
        title: column.title,
        userId: column.userId,
      },
    });

    return new Column(data.id, data.title, data.userId);
  }
}
