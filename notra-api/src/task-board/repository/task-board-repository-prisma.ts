import { PrismaService } from 'src/prisma.service';
import { CreateTaskBoardDto } from '../dto/create-task-board.dto';
import { TaskBoardRepository } from './task-board-repository';
import { TaskBoard } from '../domain/task-board.entity';
import { Column } from 'src/column/domain/column.entity';

export class TaskBoardPrismaRepository implements TaskBoardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTaskBoard(data: CreateTaskBoardDto) {
    const createTaskBoard = await this.prisma.taskBoard.create({
      data: {
        id: data.id,
        title: data.title,
        userId: data.userId,
      },
    });
    return new TaskBoard(
      createTaskBoard.id,
      createTaskBoard.title,
      createTaskBoard.userId,
      []
    );
  }

  async findUniqueTaskBoard(id: string) {
    const findedTaskBoard = await this.prisma.taskBoard.findUnique({
      where: { id },
    });

    if (!findedTaskBoard) {
      throw Error('Quadro não encontrado');
    }

    return findedTaskBoard;
  }
}
