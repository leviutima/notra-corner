import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserUseCase } from './use-case/create-user-usercase';
import { PrismaUserRepository } from './repositories/user-repository-prisma';
import { USER_REPOSITORY } from './repositories/user-repository';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
