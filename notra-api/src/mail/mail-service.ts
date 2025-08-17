import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { text } from 'stream/consumers';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    content: { text?: string; html?: string },
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      ...content,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Erro ao enviar email');
    }
  }

  async sendWelcomeEmail(email: string, name: string) {
    const emailSend = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailSend, pass: emailPass },
    });

    const mailOption = {
      from: emailSend,
      to: email,
      subject: 'Seja muito bem vindo ao notra corner!',
      text: `Olá, ${name || 'Usuário'}!\n\nSeja bem-vindo ao nosso sistema. Estamos felizes em ter você conosco.\n\nAtenciosamente,\nLevi Utima`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log('erro ao enviar email', error);
    }
  }

  async sendForgotPassword(email: string, code: string) {
    const emailSend = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailSend, pass: emailPass },
    });

    const mailOption = {
      from: emailSend,
      to: email,
      subject: 'Código para recuperação de senha',
      text: `${code}`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log('erro ao enviar');
    }
  }

  async sendSuggestion(
    name: string,
    surname: string,
    email: string,
    suggestion: string
  ) {
    const emailSend = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailSend, pass: emailPass },
    });

    const mailOption = {
      from: emailSend,
      to: "leviutima.profissional@gmail.com",
      subject: `Sugestão de feature de ${name} ${surname} ${email}`,
      text: `${suggestion}`
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log('erro ao enviar');
    }
  }
}
