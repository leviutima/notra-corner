import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user-usercase';
import { CreateUserDto } from './dto/create-user.dtos';
import { User } from './domain/user.entity';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserUseCase } from './use-case/update-user-useCase';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';
import { FindAllUseCase } from './use-case/find-all-usecase';
import { FindUniqueUserUseCase } from './use-case/find-unique-user-usecase';
import { ForgotPasswordUseCase } from './use-case/forgot-password-usecase';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly useCase: CreateUserUseCase,
    private readonly useCaseUpdate: UpdateUserUseCase,
    private readonly useCaseFindAll: FindAllUseCase,
    private readonly useCaseFindUniqe: FindUniqueUserUseCase,
    private readonly useCaseForgotPassword: ForgotPasswordUseCase
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.useCase.execute(dto);
  }

  @Get()
  async findAllUsers() {
    return await this.useCaseFindAll.execute();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  async getUniqueUser(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID do usuário é obrigatório.');
    }

    return this.useCaseFindUniqe.execute(id);
  }

  //   @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Param('id') id: string, @Body() data: Partial<User>) {
    return await this.useCaseUpdate.execute(id, data);
  }

  @Post(`forgot-password`)
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.useCaseForgotPassword.execute(body.email)
  }
}
