import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
