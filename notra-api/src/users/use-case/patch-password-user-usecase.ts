import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { PatchFinishedChecklistDto } from 'src/checklits/dto/patch-finished-checklits';
import { PatchPasswordUserDto } from '../dto/patch-update-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PatchPasswordUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly useRepo: UserRepository,
  ) {}

  async execute(dto: PatchPasswordUserDto) {
    const user = await this.useRepo.findUnique(dto.userId);
    if (!user) {
      throw Error('Usuário não encontrado');
    }
    const { userId, password } = dto;

    if (!dto.password) {
      throw Error('Senha nao fornecida');
    }

    const hashPassword = await bcrypt.hash(password, 6);
    await this.useRepo.patchPasswordUser(userId, hashPassword);
  }
}
