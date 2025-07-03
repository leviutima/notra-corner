import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/api*',
    basicAuth({
      challenge: true,
      users: {
        yourUserName: 'levi utima 1808',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('notra-corner-api')
    .setDescription('Api endpoints')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
