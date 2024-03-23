import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { User } from './entities/User';
import { NatsModule } from './modules/nats.module';
import { SessionModule } from './modules/session.module';
import { SessionMiddleware } from './middlewares/session';

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({ entities: [User] }),
    NatsModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply session middleware to specific routes
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
