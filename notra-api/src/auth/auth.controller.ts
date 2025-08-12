import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request as ExpressRequest } from 'express';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.auth.guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
    return {
      message: 'Login realizado com sucesso',
      token: result.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Get('me')
  @ApiOperation({
    summary: 'Retorna os dados do usuário do usuário autenticado',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async meUser(
    @Request() req: ExpressRequest & { user: { id: string; email: string } },
  ) {
    const { id } = req.user;
    const user = await this.authService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const authenticatedUser = await this.authService.getUserById(id);

    return {
      id: authenticatedUser?.id,
      name: authenticatedUser?.name,
      surname: authenticatedUser?.surname,
      email: authenticatedUser?.email,
      birthDate: authenticatedUser?.birthDate,
    };
  }
}
