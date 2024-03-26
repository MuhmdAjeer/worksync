import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import {
  UniqueConstraintExceptionFilter,
  AllExceptionsFilter,
  HttpExceptionFilter,
} from './exceptionFilters/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new UniqueConstraintExceptionFilter(),
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
