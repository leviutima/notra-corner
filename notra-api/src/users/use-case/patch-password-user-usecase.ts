import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { PatchFinishedChecklistDto } from 'src/checklits/dto/patch-finished-checklits';
import { PatchPasswordUserDto } from '../dto/patch-update-password.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class PatchPasswordUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly useRepo: UserRepository,
  ) {}

  async execute(dto: PatchPasswordUserDto) {
    const { userId, password } = dto;
    if(!userId) {
      throw Error("Id do usuário não encontrado")
    }
    const hashPassword = await bcrypt.hash(password,10)
    await this.useRepo.patchPasswordUser(userId, hashPassword);
  }
}
