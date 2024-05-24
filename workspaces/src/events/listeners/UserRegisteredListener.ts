import { Injectable, Logger } from '@nestjs/common';
import { Listener, Subjects, UserRegisteredEvent } from '@worksyncplus/common';
import { Message } from 'node-nats-streaming';
import { UserService } from 'src/services/user.service';
import { natsWrapper } from 'src/nats.wrapper';

@Injectable()
export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
  queueGroupName = 'auth';
  subject: Subjects.UserRegistered = Subjects.UserRegistered;

  constructor(private readonly userSvc: UserService) {
    super(natsWrapper.client);
  }

  private readonly logger = new Logger('hi');
  async onMessage(
    data: UserRegisteredEvent['data'],
    msg: Message,
  ): Promise<void> {
    try {
      await this.userSvc.register(data.user);
      msg.ack();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
