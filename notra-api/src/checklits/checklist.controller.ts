import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChecklistUseCase } from './use-case/create-checklist-usecase';
import { CreateCheckListDto } from './dto/create-checklits.dto';
import { PatchTitleChecklistUseCase } from './use-case/patch-title-checklist-usecase';
import { PatchTitleChecklistDto } from './dto/patch-title-checklits';
import { PatchFinishedChecklistDto } from './dto/patch-finished-checklits';
import { PatchFinishedChecklistUseCase } from './use-case/patch-finished-checklist-usecase';

@ApiTags('checklist')
@Controller('/checklist')
export class ChecklistController {
  constructor(
    private readonly useCaseCreateChecklist: CreateChecklistUseCase,
    private readonly useCasePatchTitleChecklist: PatchTitleChecklistUseCase,
    private readonly useCasePatchFinishedChecklist: PatchFinishedChecklistUseCase
  ) {}

  @ApiOperation({ summary: 'Criar checklist em atividade' })
  @ApiBody({ type: CreateCheckListDto })
  @Post()
  async createChecklist(@Body() data: CreateCheckListDto) {
    return await this.useCaseCreateChecklist.execute(data);
  }

  @Patch('/title/:id')
  async patchTitle(@Param('id', ParseIntPipe) id: number, @Body() checklist: PatchTitleChecklistDto) {
    return await this.useCasePatchTitleChecklist.execute(id, checklist)
  }

  @Patch('/finished/:id') 
  async patchFinished(@Param('id',ParseIntPipe) id: number, @Body() finished: PatchFinishedChecklistDto) {
    return await this.useCasePatchFinishedChecklist.execute(id, finished)
  }
}
