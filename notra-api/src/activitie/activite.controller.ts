import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateActivitieUseCase } from "./use-case/create-activitie-usecase";
import { CreateActivitieDto } from "./dto/create-activitie.dto";
import { GetActivitieUseCase } from "./use-case/get-activitie-usecase";
import { UpdateActivitieDto } from "./dto/update-activitie.dto";
import { UpdateActivitieUseCase } from "./use-case/update-activitie-usecase";
import { DeleteActiviteUseCase } from "./use-case/delete-activitie";
import { PatchFinishedDto } from "./dto/patch-finished.dto";
import { UseCasePatchActivitieFinished } from "./use-case/patch-activitie-finished";

@ApiTags("activitie")
@Controller("activitie")
export class ActivitieController {
    constructor(
      private readonly useCaseCreateActivitie: CreateActivitieUseCase,
      private readonly useCaseGetActiviteByColumn: GetActivitieUseCase,
      private readonly useCaseUpdateActivitie: UpdateActivitieUseCase,
      private readonly useCaseDeleteActivitie: DeleteActiviteUseCase,
      private readonly useCasePatchActivitieFinished: UseCasePatchActivitieFinished
    ){}

    @ApiOperation({summary: 'Criar nova atividade'})
    @Post()
    async createActivitie(@Body() dto: CreateActivitieDto) {
      return await this.useCaseCreateActivitie.execute(dto)
    }

    @Get("/:id")
    async getActivitieByColumn(@Param('id', ParseIntPipe) columnId: number) {
      return await this.useCaseGetActiviteByColumn.execute(columnId)
    }

    @Put('/:id')
    async updateActivitie(@Param('id') id: string, @Body() data: UpdateActivitieDto) {
      return this.useCaseUpdateActivitie.execute(id, data)
    }

    @Delete('/:id')
    async deleteActivitie(@Param('id') id: string) {
      return this.useCaseDeleteActivitie.execute(id)
    }

    @Patch('/finished/:id')
    async patchActivitieFinished(@Param('id') id: string, @Body() data: PatchFinishedDto) {
      return await this.useCasePatchActivitieFinished.execute(id, data)
    }

}