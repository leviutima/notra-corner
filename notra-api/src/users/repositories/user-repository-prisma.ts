import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserResponseDto } from '../dto/get-use-response.dto';
import { MailService } from 'src/mail/mail-service';
import * as nodemailer from 'nodemailer';

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

  async sendWelcomeEmail(email: string, name: string) {
    const emailSend = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {user: emailSend, pass: emailPass}
    })

    const mailOption = {
      from: emailSend,
      to: email,
      subject: 'Seja muito bem vindo ao notra corner!',
      text: `Olá, ${name || 'Usuário'}!\n\nSeja bem-vindo ao nosso sistema. Estamos felizes em ter você conosco.\n\nAtenciosamente,\nLevi Utima`
    }

    try {
      await transporter.sendMail(mailOption)
    }catch(error) {
      console.log('erro ao enviar email', error);
      
    }
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

    await this.sendWelcomeEmail(user.email, user.name)
    
    return new User(
      data.id,
      data.name,
      data.surname,
      data.email,
      new Date(data.birthDate),
      data.password,
    );
  }

  async findByEmail(email: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      throw new Error('Usuário não encontrado');
    }

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
