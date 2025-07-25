import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/api',
    basicAuth({
      challenge: true,
      users: {
      'leviutima': 'senhaSegura123',
    },
    }),
  );

  app.use(cookieParser())

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('notra-corner-api')
    .setDescription('Api endpoints')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
