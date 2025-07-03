import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../repositories/user-repository-prisma';
import { CreateUserDto } from '../dto/create-user.dtos';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { User } from '../domain/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const verifyUserExist = await this.userRepo.findByEmail(dto.email);

    if(verifyUserExist) {
        throw new Error("Usuário já existe com esse email")
    }
    
    const user = new User(
        randomUUID(),
        dto.name,
        dto.surname,
        dto.email,
        dto.birthDate,
        dto.password,
    )

    return await this.userRepo.createUser(user)
  }
}
