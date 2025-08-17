import { Module } from "@nestjs/common";
import { SuggestionController } from "./suggestion.controller";
import { PrismaService } from "src/prisma.service";
import { CreateSuggestionUseCase } from "./use-case/create-suggestion-usecase";
import { SUGGESTION_RESPOSITORY } from "./repository/suggestion-repository";
import { PrismaColumnRepository } from "src/column/repository/column-repository-prisma";
import { Mailermodule } from "src/mail/mailer.module";
import { SuggestionRepositoryPrisma } from "./repository/suggestion-repository-prisma";

@Module({
  imports: [Mailermodule],
  controllers: [SuggestionController],
  providers: [
    PrismaService,
    CreateSuggestionUseCase,
    { provide: SUGGESTION_RESPOSITORY, useClass: SuggestionRepositoryPrisma},
  ],
  exports: [ SUGGESTION_RESPOSITORY],
})
export class SuggestionModule {}
