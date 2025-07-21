import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateActivitieUseCase } from "./use-case/create-activitie-usecase";
import { CreateActivitieDto } from "./dto/create-activitie.dto";

@ApiTags("activitie")
@Controller("activitie")
export class ActivitieController {
    constructor(
      private readonly useCaseCreateActivitie: CreateActivitieUseCase
    ){}

    @ApiOperation({summary: 'Criar nova atividade'})
    @Post()
    async createActivitie(@Body() dto: CreateActivitieDto) {
      return await this.useCaseCreateActivitie.execute(dto)
    }

}