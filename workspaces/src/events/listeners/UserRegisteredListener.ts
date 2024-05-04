import { Injectable } from '@nestjs/common';
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

  onMessage(data: UserRegisteredEvent['data'], msg: Message): void {
    this.userSvc.register(data.user);
    msg.ack();
  }
}
