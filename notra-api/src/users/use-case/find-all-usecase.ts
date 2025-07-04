import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../repositories/user-repository";
import { GetUserResponseDto } from "../dto/get-use-response.dto";

@Injectable()
export class FindAllUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly useRepo: UserRepository
    ){}

    async execute() {
        const users = await this.useRepo.findAll()
        return users.map(user => new GetUserResponseDto(user))
    }
}