import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRoot({ transport: {} })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
