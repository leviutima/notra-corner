import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateActivitieUseCase } from "./use-case/create-activitie-usecase";
import { CreateActivitieDto } from "./dto/create-activitie.dto";
import { GetActivitieUseCase } from "./use-case/get-activitie-usecase";
import { UpdateActivitieDto } from "./dto/update-activitie.dto";
import { UpdateActivitieUseCase } from "./use-case/update-activitie-usecase";

@ApiTags("activitie")
@Controller("activitie")
export class ActivitieController {
    constructor(
      private readonly useCaseCreateActivitie: CreateActivitieUseCase,
      private readonly useCaseGetActiviteByColumn: GetActivitieUseCase,
      private readonly useCaseUpdateActivitie: UpdateActivitieUseCase
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

}