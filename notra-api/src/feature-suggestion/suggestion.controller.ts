import { Body, Controller, Post } from "@nestjs/common";
import { CreateSuggestionUseCase } from "./use-case/create-suggestion-usecase";
import { CreateSuggestionDto } from "./dto/create-suggestion.dto";

@Controller("suggestion")
export class SuggestionController {
  constructor(
    private readonly createSuggestionUseCase: CreateSuggestionUseCase
  ) {}

  @Post()
  async createSuggestion(@Body() data: CreateSuggestionDto) {
    return await this.createSuggestionUseCase.execute(data)
  }
}