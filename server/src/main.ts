import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LingosSystemErrorFilter } from './common/filters/lingo-error.filter';
import * as helmet from 'helmet';
import { join } from 'path';
import * as express from 'express';

const NEST_PORT = process.env.PORT || 3000;
const CLIENT_FILES = join(__dirname, '..', '..', 'client', 'dist', 'client');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(CLIENT_FILES));

  const options = new DocumentBuilder()
    .setTitle('Nest MultiLingo MK 16')
    .setDescription('Swagger for request responce visualization!')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new LingosSystemErrorFilter());

  app.use(helmet());
  app.enableCors();
  await app.listen(NEST_PORT);
}
bootstrap();
