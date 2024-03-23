import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as session from 'express-session';

@Module({})
export class SessionModule implements NestModule {
  private readonly logger = new Logger('session module');
  configure(consumer: MiddlewareConsumer) {
    this.logger.log('hi');
    consumer
      .apply(
        session({
          secret: 'your-secret-key', // Change this to a secret key for session encryption
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
