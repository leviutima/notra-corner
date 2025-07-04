import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

interface UserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

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

  async updateById(id: string, data: User): Promise<UserResponse> {
    const updateUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!updateUser) {
      throw new Error('Erro ao buscar usuário');
    }

    let dataToUpdate = { ...data };

    if (data.password) {
      const hashPasswordUpdate = await bcrypt.hash(data.password, 10);
      dataToUpdate.password = hashPasswordUpdate;
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    return {
      id: updated.id,
      name: updated.name,
      surname: updated.surname,
      email: updated.email,
      birthDate: new Date(updated.birthDate),
    };
  }
}
