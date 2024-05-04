import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { WorkspaceController } from 'src/controllers/auth.controller';
import { Invitation } from 'src/entities/Invitation.entity';
import { User } from 'src/entities/User.entity';
import { Workspace } from 'src/entities/Workspace.entity';
import { WorkspaceMember } from 'src/entities/WorkspaceMember.entity';
import { WorkspaceService } from 'src/services/workspace.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, Workspace, WorkspaceMember, Invitation],
    }),
    ClsModule.forRoot({ middleware: { mount: true } }),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, ConfigService],
})
export class WorkspaceModule {}
