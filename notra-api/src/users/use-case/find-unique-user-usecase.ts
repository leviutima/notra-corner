import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository';
import { GetUserResponseDto } from '../dto/get-use-response.dto';

@Injectable()
export class FindUniqueUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(id: string): Promise<GetUserResponseDto> {
    const user = await this.userRepo.findUnique(id);
    return {
      id: user!.id,
      name: user!.name,
      surname: user!.surname,
      email: user!.email,
      birthDate: user!.birthDate,
    };
  }
}
