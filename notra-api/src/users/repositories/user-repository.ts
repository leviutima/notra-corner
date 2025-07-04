import { User } from '../domain/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract updateById(id: string, data: Partial<User>);
  abstract findAll();
}
