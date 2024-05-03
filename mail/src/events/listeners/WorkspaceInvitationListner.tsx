import { Injectable, Logger } from '@nestjs/common';
import { render } from '@react-email/components';
import {
  Listener,
  Subjects,
  WorkspaceInvitationEvent,
} from '@worksyncplus/common';
import { Message } from 'node-nats-streaming';
import { AppService } from 'src/app.service';
import WorkspaceInvitation from 'src/views/templates/WorkspaceInvitation';

@Injectable()
export class WorkspaceInvitationListener extends Listener<WorkspaceInvitationEvent> {
  queueGroupName = 'auth';
  subject: Subjects.WorkspaceInvitation = Subjects.WorkspaceInvitation;

  private readonly appService = new AppService();
  private readonly logger = new Logger('invitation listener');

  onMessage(data: WorkspaceInvitationEvent['data'], msg: Message): void {
    this.logger.log('eda mwoneee invitation receive aayitunddeee');
    const html = render(
      <WorkspaceInvitation
        ownerEmail={data.workspace.owner.email}
        workspaceName={data.workspace.name}
      />,
      {},
    );
    this.appService.sendMail({
      email: data.email,
      subject: 'Workspace Invitation',
      template: html,
    });
    msg.ack();
  }
}
