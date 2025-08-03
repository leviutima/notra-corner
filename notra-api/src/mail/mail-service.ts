// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    // Cria o transportador com as credenciais do seu serviço de email
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Pode ser outro serviço, como SendGrid ou Mailgun
      auth: {
        user: process.env.EMAIL_USER, // Seu email
        pass: process.env.EMAIL_PASSWORD, // Senha do email ou App password
      },
    });
  }

  // Função para enviar o email
async sendMail(to: string, subject: string, content: { text?: string; html?: string }) {
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
}