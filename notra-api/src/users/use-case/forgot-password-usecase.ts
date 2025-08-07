import { Inject, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { MailService } from 'src/mail/mail-service';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepository,
    private mail: MailService
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const code = randomInt(100000, 999999).toString();
    await this.userRepo.saveVerificationCode(user.id, code);

    await this.mail.sendForgotPassword(email, code);
    console.log(code);
    
    return {user: user.id, }
  }
}
