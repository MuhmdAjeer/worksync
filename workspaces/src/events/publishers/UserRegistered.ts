import { Subjects, Publisher, UserRegisteredEvent } from '@worksyncplus/common';

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
}
