import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    const maxRetries = 30;
    const retryDelay = 3000; // 3 segundos

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.log(`🔌 Conectando ao Prisma (${attempt}/${maxRetries})...`);

        // Tenta conectar
        await this.$connect();

        // Testa a conexão com uma query real
        await this.$queryRaw`SELECT 1 as test`;

        this.logger.log('✅ Prisma conectado e testado com sucesso!');
        
        // Log de informações da conexão (sem expor senha)
        const dbUrl = process.env.DATABASE_URL || '';
        const sanitizedUrl = dbUrl.replace(/:[^:@]+@/, ':****@');
        this.logger.log(`📊 Database: ${sanitizedUrl}`);
        
        return;

      } catch (error) {
        this.logger.warn(
          `⚠️ Falha na tentativa ${attempt}/${maxRetries}: ${error.message}`
        );

        // Se é erro de conexão, mostra detalhes
        if (error.code === 'P1001') {
          this.logger.warn('💡 Dica: Verifique se o túnel Tailscale está ativo');
        }

        // Se esgotou tentativas, lança erro
        if (attempt === maxRetries) {
          this.logger.error('❌ Esgotadas todas as tentativas de conexão ao Prisma');
          throw error;
        }

        // Aguarda antes de retentar
        this.logger.log(`⏳ Retentando em ${retryDelay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('🔌 Desconectando Prisma...');
    await this.$disconnect();
    this.logger.log('✅ Prisma desconectado');
  }

  // Método helper para verificar saúde da conexão
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}