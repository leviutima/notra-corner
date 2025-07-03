import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.modules';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
