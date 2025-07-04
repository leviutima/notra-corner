import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../repositories/user-repository";
import { GetUserResponseDto } from "../dto/get-use-response.dto";

@Injectable()
export class FindByEmailUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository
    ) {}

    async execute(email: string): Promise<GetUserResponseDto> {
        const user = await this.userRepo.findByEmail(email)

        if(!user) {
            throw new Error("Usuario não encontrado")
        }

        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            birthDate: user.birthDate
        }
    }
}