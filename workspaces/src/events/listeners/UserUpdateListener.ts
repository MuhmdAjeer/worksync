import { Injectable } from '@nestjs/common';
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

  onMessage(data: UserRegisteredEvent['data'], msg: Message): void {
    this.userSvc.update(data.user);
    msg.ack();
  }
}
