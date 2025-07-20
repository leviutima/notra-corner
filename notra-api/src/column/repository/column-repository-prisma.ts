import { PrismaService } from 'src/prisma.service';
import { ColumnRepository } from './column-respository';
import { Injectable } from '@nestjs/common';
import { Column } from '../domain/column.entity';

@Injectable()
export class PrismaColumnRepository implements ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createColumn(column: Column) {
    
  }
}
