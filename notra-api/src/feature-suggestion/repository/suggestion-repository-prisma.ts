import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { SuggestionRepository } from './suggestion-repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SuggestionRepositoryPrisma implements SuggestionRepository {
  constructor(
    private prisma: PrismaService
  ){}

  async createSuggestion(data: CreateSuggestionDto) {
    return await this.prisma.featureSuggestion.findUnique({
      where: {id}
    }),
    
  }
}
