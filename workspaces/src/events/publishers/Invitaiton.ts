import {
  Subjects,
  Publisher,
  WorkspaceInvitationEvent,
} from '@worksyncplus/common';

export class WorkspaceInvitePublisher extends Publisher<WorkspaceInvitationEvent> {
  subject: Subjects.WorkspaceInvitation = Subjects.WorkspaceInvitation;
}
