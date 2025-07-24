import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChecklistUseCase } from './use-case/create-checklist-usecase';
import { CreateCheckListDto } from './dto/create-checklits.dto';

@ApiTags('checklist')
@Controller('/checklist')
export class ChecklistController {
  constructor(
    private readonly useCaseCreateChecklist: CreateChecklistUseCase,
  ) {}

  @ApiOperation({ summary: 'Criar checklist em atividade' })
  @ApiBody({ type: CreateCheckListDto })
  @Post()
  async createChecklist(@Body() data: CreateCheckListDto) {
    return await this.useCaseCreateChecklist.execute(data);
  }
}
