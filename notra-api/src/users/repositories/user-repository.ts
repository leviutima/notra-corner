import { User } from '../domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY'
export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
