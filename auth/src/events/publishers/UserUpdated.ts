import { Subjects, Publisher, UserUpdatedEvent } from '@worksyncplus/common';

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  subject: Subjects.UserUpdate = Subjects.UserUpdate;
}
