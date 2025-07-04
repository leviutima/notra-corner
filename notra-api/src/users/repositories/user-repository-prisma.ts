import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: User): Promise<User> {
    const data = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthDate: user.birthDate,
        password: user.password,
      },
    });
    return new User(
      data.id,
      data.name,
      data.surname,
      data.email,
      new Date(data.birthDate),
      data.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) return null;

    return new User(
      findUser.id,
      findUser.name,
      findUser.surname,
      findUser.email,
      findUser.birthDate,
      findUser.password,
    );
  }

  async updateById(id: string, data: Partial<User>): Promise<User> {
    const updateUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!updateUser) {
      throw new Error('Erro ao buscar usuário');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
    });

    return new User(
      updated.id,
      updated.name,
      updated.surname,
      updated.email,
      new Date (updated.birthDate),
      updated.password,
    );
  }
}
