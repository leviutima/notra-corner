import { User } from '../domain/user.entity';
import { GetUserResponseDto } from '../dto/get-use-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract updateById(id: string, data: Partial<User>);
  abstract findAll();
  abstract findUnique(id: string): Promise<User | null>;
}
