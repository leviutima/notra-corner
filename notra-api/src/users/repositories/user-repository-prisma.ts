import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user-repository";
import { User } from "../domain/user.entity";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    
}