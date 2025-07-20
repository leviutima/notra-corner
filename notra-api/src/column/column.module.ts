import { Module } from "@nestjs/common";
import { ColumnController } from "./column.controller";
import { PrismaService } from "src/prisma.service";
import { CreateColumnUseCase } from "./use-case/create-column-usecase";
import { COLUMN_REPOSITORY } from "./repository/column-respository";
import { PrismaColumnRepository } from "./repository/column-repository-prisma";


@Module({
  imports: [],
  controllers: [ColumnController],
  providers: [
    PrismaService,
    CreateColumnUseCase,
    { provide: COLUMN_REPOSITORY, useClass: PrismaColumnRepository },
  ],
  exports: [CreateColumnUseCase, COLUMN_REPOSITORY],
})
export class ColumnModule {}
