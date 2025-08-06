import { User } from '../domain/user.entity';
import { GetUserResponseDto } from '../dto/get-use-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export abstract class UserRepository {
  abstract createUser(user: User);
  abstract findByEmail(email: string);
  abstract updateById(id: string, data: Partial<User>);
  abstract findAll();
  abstract findUnique(id: string): Promise<User | null>;
  abstract saveVerificationCode(userId: string, code: string)
  abstract enterCode(code: string, userId)
  abstract patchPasswordUser(userId: string, password: string)
}
