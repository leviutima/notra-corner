import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { SuggestionRepository } from './suggestion-repository';
import { PrismaService } from 'src/prisma.service';
import { Suggestion } from '../domain/suggestion-entity';

@Injectable()
export class SuggestionRepositoryPrisma implements SuggestionRepository {
  constructor(private prisma: PrismaService) {}

  async createSuggestion(data: CreateSuggestionDto) {
    const created = await this.prisma.featureSuggestion.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        suggestion: data.suggestion,
      },
    });
    return new Suggestion(
      created.id,
      created.name,
      created.surname,
      created.email,
      created.suggestion,
    );
  }
}
