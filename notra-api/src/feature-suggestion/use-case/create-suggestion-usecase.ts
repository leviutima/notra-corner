import { Inject, Injectable } from '@nestjs/common';
import {
  SUGGESTION_RESPOSITORY,
  SuggestionRepository,
} from '../repository/suggestion-repository';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { MailService } from 'src/mail/mail-service';

@Injectable()
export class CreateSuggestionUseCase {
  constructor(
    @Inject(SUGGESTION_RESPOSITORY)
    private readonly suggestionRepo: SuggestionRepository,
    private readonly mail: MailService,
  ) {}

  async execute(data: CreateSuggestionDto) {
    const createSuggestion = await this.suggestionRepo.createSuggestion(data);
    const { name, surname, email, suggestion } = createSuggestion;
    if (createSuggestion) {
      console.log(createSuggestion);
      
      this.mail.sendSuggestion(name, surname, email, suggestion);
    } else {
      console.log('erro ao enviar email de sugestão');
      throw Error;
    }
  }
}
