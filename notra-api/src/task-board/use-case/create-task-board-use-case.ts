import { Inject, Injectable } from '@nestjs/common';
import {
  TASK_BOARD_REPOSITORY,
  TaskBoardRepository,
} from '../repository/task-board-repository';
import { CreateTaskBoardDto } from '../dto/create-task-board.dto';

@Injectable()
export class CreateTaskBoardUseCase {
  constructor(
    @Inject(TASK_BOARD_REPOSITORY)
    private readonly taskBoardRepo: TaskBoardRepository,
  ) {}

  async execute(data: CreateTaskBoardDto) {
    const createdTaskBoard = await this.taskBoardRepo.createTaskBoard(data);
  }
}
