import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { randomBytes } from 'crypto';

@Injectable()
export class EnterCodeUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly useRepo: UserRepository,
  ) {}

  async execute(code: string, userId: string) {
    const verificationCode = await this.useRepo.enterCode(code, userId);
    const user = await this.useRepo.findUnique(userId);

    if (!user || verificationCode.userId !== user.id) {
      throw new Error('Usuário não encontrado');
    }
    const token = randomBytes(32).toString('hex');
    return { token };
  }
}
