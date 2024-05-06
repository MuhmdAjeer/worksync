import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  UniqueConstraintExceptionFilter,
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '@worksyncplus/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { natsWrapper } from './nats.wrapper';
import { UserRegisteredListener } from './events/listeners/UserRegisteredListener';
import { UserUpdatedListener } from './events/listeners/UserUpdateListener';

async function bootstrap() {
  await natsWrapper.connect('worksync', 'workspace', 'nats://nats-srv:4222');
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
    .setTitle('Workspace API')
    .setVersion('1.0')
    .addTag('workspace')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new UniqueConstraintExceptionFilter(),
  );

  const userRegisteredListener = app.get(UserRegisteredListener);
  const userUpdatedListener = app.get(UserUpdatedListener);
  userUpdatedListener.listen();
  userRegisteredListener.listen();

  process.on('SIGINT', () => {
    natsWrapper.client.close();
  });
  process.on('SIGTERM', () => {
    natsWrapper.client.close();
  });

  await app.listen(3000);
}
bootstrap();
