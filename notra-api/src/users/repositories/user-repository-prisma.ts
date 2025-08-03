import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserResponseDto } from '../dto/get-use-response.dto';
import { MailService } from 'src/mail/mail-service';
import * as nodemailer from 'nodemailer';
import crypto from 'crypto';

interface UserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return new User(
      user.id,
      user.name,
      user.surname,
      user.email,
      user.birthDate,
      user.password,
    );
  }

  async createUser(user: User) {
    if (!user.email) {
      throw new Error('Email não fornecido');
    }

    const userExist = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExist) {
      throw new Error('Usuário já existe com esse email');
    }

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

    await this.mail.sendWelcomeEmail(user.email, user.name);

    return new User(
      data.id,
      data.name,
      data.surname,
      data.email,
      new Date(data.birthDate),
      data.password,
    );
  }

  async findByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    console.log(normalizedEmail);
    
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: normalizedEmail
      },
    });

    if (!findUser) {
      throw new Error('Usuário não encontrado');
    }

    return findUser
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
  async saveVerificationCode(userId: string, code: string) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await this.prisma.verificationCode.upsert({
      where: { userId },
      update: { code, expiresAt },
      create: {
        code,
        userId,
        expiresAt,
      },
    });
  }
}
