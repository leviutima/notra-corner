import { Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginUser(dto.email, dto.password);

    res.cookie('jwt', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return { message: 'Login realizado com sucesso' };
  }
}
