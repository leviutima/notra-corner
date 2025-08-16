import { CreateSuggestionDto } from "../dto/create-suggestion.dto";

export const SUGGESTION_RESPOSITORY = 'SUGGESTION_REPOSITORY'

export abstract class SuggestionRepository {
  abstract createSuggestion(data: CreateSuggestionDto)
}