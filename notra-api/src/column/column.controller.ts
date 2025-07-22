import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateColumnUseCase } from './use-case/update-column-usecase.dto';
import { DeleteColumnUseCase } from './use-case/delete-column-usecase';

@ApiTags('column')
@Controller('column')
export class ColumnController {
  constructor(
    private readonly useCaseCreate: CreateColumnUseCase,
    private readonly useCaseGetColumnByUser: GetColumnByUserUseCase,
    private readonly useCaseUpdateColumn: UpdateColumnUseCase,
    private readonly useCaseDeleteColumn: DeleteColumnUseCase
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

  @Put('/:id')
  @ApiParam({ name: 'id', type: String, description: 'ID da coluna' })
  async updateColumn(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColumnDto,
  ) {
    return await this.useCaseUpdateColumn.execute(id, dto);
  }
  
  @Delete('/:id')
  async DeleteColumnUserCas(@Param('id', ParseIntPipe) id: number,) {
      return await this.useCaseDeleteColumn.execute(id)
  }
}
