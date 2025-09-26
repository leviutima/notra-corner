import { CreateTaskBoardDto } from "../dto/create-task-board.dto";

export const TASK_BOARD_REPOSITORY = "TASK_BOARD_REPOSITORY"

export abstract class TaskBoardRepository {
  abstract createTaskBoard(data: CreateTaskBoardDto)
  abstract findUniqueTaskBoard(id: string)
}