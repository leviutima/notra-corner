import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateColumnUseCase } from './use-case/create-column-usecase';
import { CreateColumnDto } from './dto/create-column.dto';
import { GetColumnByUserUseCase } from './use-case/get-column-by-user-usecase';

@ApiTags('Column')
@Controller('Column')
export class ColumnController {
  constructor(
    private readonly useCaseCreate: CreateColumnUseCase,
    private readonly useCaseGetColumnByUser: GetColumnByUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Criar nova coluna' })
  @ApiBody({ type: CreateColumnDto })
  @ApiResponse({ status: 201, description: 'Coluna criada com sucesso' })
  @Post()
  async createColumn(@Body() dto: CreateColumnDto) {
    return await this.useCaseCreate.execute(dto);
  }

  @ApiOperation({ summary: 'Listar colunas de um usuário' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de colunas do usuário' })
  @Get('/user/:id')
  async getColumnByUser(@Param('id') userId: string) {
    return await this.useCaseGetColumnByUser.execute(userId);
  }
}
