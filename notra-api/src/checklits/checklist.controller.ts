import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChecklistUseCase } from './use-case/create-checklist-usecase';
import { CreateCheckListDto } from './dto/create-checklits.dto';
import { PatchTitleChecklistUseCase } from './use-case/patch-title-checklist-usecase';
import { PatchTitleChecklistDto } from './dto/patch-title-checklits';

@ApiTags('checklist')
@Controller('/checklist')
export class ChecklistController {
  constructor(
    private readonly useCaseCreateChecklist: CreateChecklistUseCase,
    private readonly useCasePatchTitleChecklist: PatchTitleChecklistUseCase
  ) {}

  @ApiOperation({ summary: 'Criar checklist em atividade' })
  @ApiBody({ type: CreateCheckListDto })
  @Post()
  async createChecklist(@Body() data: CreateCheckListDto) {
    return await this.useCaseCreateChecklist.execute(data);
  }

  @Patch('/:id')
  async patchTitle(@Param('id', ParseIntPipe) id: number, @Body() checklist: PatchTitleChecklistDto) {
    return await this.useCasePatchTitleChecklist.execute(id, checklist)
  }
}
