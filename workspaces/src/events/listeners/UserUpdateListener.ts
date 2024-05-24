import { Injectable, Logger } from '@nestjs/common';
import {
  Listener,
  Subjects,
  UserRegisteredEvent,
  UserUpdatedEvent,
} from '@worksyncplus/common';
import { Message } from 'node-nats-streaming';
import { UserService } from 'src/services/user.service';
import { natsWrapper } from 'src/nats.wrapper';

@Injectable()
export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
  queueGroupName = 'auth';
  subject: Subjects.UserUpdate = Subjects.UserUpdate;

  constructor(private readonly userSvc: UserService) {
    super(natsWrapper.client);
  }
  private readonly logger = new Logger(Subjects.UserUpdate);
  async onMessage(
    data: UserRegisteredEvent['data'],
    msg: Message,
  ): Promise<void> {
    try {
      await this.userSvc.update(data.user);
      msg.ack();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
