import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const maxRetries = 5;
  const retryDelay = 5000; // 5 segundos

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.log(`🚀 Tentando iniciar aplicação (${attempt}/${maxRetries})...`);

      const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug'],
      });

      // Basic Auth para Swagger
      app.use(
        '/api',
        basicAuth({
          challenge: true,
          users: {
            'leviutima': 'senhaSegura123',
          },
        }),
      );

      app.use(cookieParser());

      // CORS
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET, POST, PUT, DELETE, PATCH',
        credentials: true,
      });

      // Swagger
      const config = new DocumentBuilder()
        .setTitle('notra-corner-api')
        .setDescription('Api endpoints')
        .setVersion('1.0')
        .build();

      const documentFactory = () => SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, documentFactory);

      // Inicia o servidor
      const port = Number(process.env.PORT) || 8000;
      await app.listen(port, '0.0.0.0');

      logger.log(`✅ Aplicação rodando em http://0.0.0.0:${port}`);
      logger.log(`📚 Swagger disponível em http://0.0.0.0:${port}/api`);

      // Graceful shutdown handlers
      process.on('SIGTERM', async () => {
        logger.log('🛑 SIGTERM recebido. Encerrando gracefully...');
        await app.close();
        process.exit(0);
      });

      process.on('SIGINT', async () => {
        logger.log('🛑 SIGINT recebido. Encerrando gracefully...');
        await app.close();
        process.exit(0);
      });

      return; // Sucesso! Sai da função

    } catch (error) {
      logger.error(`❌ Falha ao iniciar aplicação (tentativa ${attempt}/${maxRetries})`);
      logger.error(`Erro: ${error.message}`);
      
      if (error.stack) {
        logger.debug(error.stack);
      }

      // Se esgotou as tentativas, encerra
      if (attempt === maxRetries) {
        logger.error('💥 Esgotadas todas as tentativas de inicialização');
        logger.error('Verifique se o Postgres está acessível e as credenciais estão corretas');
        process.exit(1);
      }

      // Aguarda antes de retentar
      logger.log(`⏳ Aguardando ${retryDelay / 1000}s antes de retentar...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

bootstrap().catch((error) => {
  console.error('💥 Erro fatal durante bootstrap:', error);
  process.exit(1);
});