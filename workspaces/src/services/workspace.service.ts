import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { CreateWorkspaceDto } from 'src/dtos/CreateWorkspaceDto';
import { Workspace, WorkspaceRepo } from 'src/entities/Workspace.entity';
import { ClsService } from 'nestjs-cls';
import { Invitation, InvitationRepo } from 'src/entities/Invitation.entity';
import { WorkspaceInvitePublisher } from 'src/events/publishers/Invitaiton';
import { natsWrapper } from 'src/nats.wrapper';
@Injectable()
export class WorkspaceService {
  constructor(
    private workspaceRepo: WorkspaceRepo,
    private invitationRepo: InvitationRepo,
    private clsService: ClsService,
  ) {}
  private readonly logger = new Logger('workspace svc');

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const user = this.clsService.get<User>('reqUser');
    const workspace = new Workspace({
      name: createWorkspaceDto.name,
      owner_id: user.id,
      use: createWorkspaceDto.use,
    });
    this.workspaceRepo.getEntityManager().persistAndFlush(workspace);

    for (const member of createWorkspaceDto.members) {
      const invitation = new Invitation({
        email: member.email,
        workspace_id: workspace.id,
        role: member.role,
      });
      new WorkspaceInvitePublisher(natsWrapper.client).publish({
        email: member.email,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          owner: { email: user.email },
        },
      });
      this.invitationRepo.getEntityManager().persistAndFlush(invitation);
    }
  }
}
