import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { User } from './entities/User';
import { NatsModule } from './modules/nats.module';
import { SessionModule } from './modules/session.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({ entities: [User] }),
    NatsModule,
    SessionModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
