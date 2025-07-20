import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateColumnUseCase } from "./use-case/create-column-usecase";
import { CreateColumnDto } from "./dto/create-column.dto";

@ApiTags("Column")
@Controller("Column")
export class ColumnController {
  constructor(
    private readonly useCaseCreate: CreateColumnUseCase
  ) {}

  @Post()
  async createColumn(@Body() dto: CreateColumnDto) {
    return await this.useCaseCreate.execute(dto)
  }
}