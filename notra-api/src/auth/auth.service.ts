import { USER_REPOSITORY, UserRepository } from 'src/users/repositories/user-repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { FindByEmailUseCase } from 'src/users/use-case/find-by-email-usecase';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async loginUser(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Senha não coincide com o email do usuário');
    }

    const payload = { id: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async getUserById(id: string) {
    return this.userRepo.findUnique(id)
  }
}
