import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user-usercase';
import { CreateUserDto } from './dto/create-user.dtos';
import { User } from './domain/user.entity';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserUseCase } from './use-case/update-user-useCase';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly useCase: CreateUserUseCase,
    private readonly useCaseUpdate: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.useCase.execute(dto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Param('id') id: string, @Body() data: Partial<User>) {
    return await this.useCaseUpdate.execute(id, data);
  }
}
