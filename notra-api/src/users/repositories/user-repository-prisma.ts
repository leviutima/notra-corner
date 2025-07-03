import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user-repository";
import { User } from "../domain/user.entity";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(
        private prisma: PrismaService
    ) {}


    createUser(user: User): Promise<User> {
        return this.prisma.user.create({
            data: {
                
            }
        })
    }
    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    
}