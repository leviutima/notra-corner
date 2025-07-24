import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnModule } from './column/column.module';
import { ActivitieModule } from './activitie/activitie.module';
import { ChecklistModule } from './checklits/checklist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ColumnModule,
    AuthModule,
    ActivitieModule,
    ChecklistModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
