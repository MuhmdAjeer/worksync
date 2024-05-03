import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { natsWrapper } from './nats.wrapper';
import { Logger } from '@nestjs/common';
import { OTPRequestListener } from './events/listeners/OTPRequestListener';
import { WorkspaceInvitationListener } from './events/listeners/WorkspaceInvitationListner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  await natsWrapper.connect('worksync', 'mail', 'nats://nats-srv:4222');
  new OTPRequestListener(natsWrapper.client).listen();
  new WorkspaceInvitationListener(natsWrapper.client).listen();
  process.on('SIGINT', () => {
    natsWrapper.client.close();
  });
  process.on('SIGTERM', () => {
    natsWrapper.client.close();
  });
  await app.listen(3000);
}
bootstrap();
