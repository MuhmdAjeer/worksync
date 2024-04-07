import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  UniqueConstraintExceptionFilter,
  AllExceptionsFilter,
  HttpExceptionFilter,
} from './exceptionFilters/index';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { natsWrapper } from './nats.wrapper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflightContinue: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new UniqueConstraintExceptionFilter(),
  );

  await natsWrapper.connect('worksync', 'auth', 'nats://nats-srv:4222');
  process.on('SIGINT', () => {
    natsWrapper.client.close();
  });
  process.on('SIGTERM', () => {
    natsWrapper.client.close();
  });
  await app.listen(3000);
}
bootstrap();
