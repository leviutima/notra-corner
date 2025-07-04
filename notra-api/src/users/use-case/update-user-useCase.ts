import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../repositories/user-repository';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository) {}

  async execute(id: string, data: Partial<User>) {
    const updateUser = await this.userRepo.updateById(id, data);

    if (!updateUser) {
      throw new Error('Usuário não encontrado');
    }

    return updateUser;
  }
}
