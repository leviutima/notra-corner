import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserUseCase } from './use-case/create-user-usercase';
import { PrismaUserRepository } from './repositories/user-repository-prisma';
import { USER_REPOSITORY } from './repositories/user-repository';
import { UserController } from './user.controller';
import { UpdateUserUseCase } from './use-case/update-user-useCase';
import { FindAllUseCase } from './use-case/find-all-usecase';
import { FindUniqueUserUseCase } from './use-case/find-unique-user-usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UpdateUserUseCase,
    FindAllUseCase,
    FindUniqueUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
