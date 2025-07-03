import { UserRepository } from "src/users/repositories/user-repository";

export class AuthService {
    constructor(
        private userRepo: UserRepository
    ) {}

    async loginUser(email: string, password: string) {
        const verifyUserExist = await this.userRepo.findByEmail(email)

        if(!verifyUserExist) {
            throw new Error("Usuário não encontrado")
        }

        

    }

}
