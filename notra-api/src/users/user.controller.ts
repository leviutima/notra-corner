import { Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "./use-case/create-user-usercase";
import { CreateUserDto } from "./dto/create-user.dtos";
import { User } from "./domain/user.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor( private readonly useCase: CreateUserUseCase) {}

    @Post()
    async createUser(dto: CreateUserDto): Promise<User> {
        return await this.useCase.execute(dto)
    }
}