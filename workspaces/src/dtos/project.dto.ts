import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { Workspace } from 'src/entities/Workspace.entity';

export class Project extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  custom_id: string;

  @ApiProperty()
  workspace: Workspace;
}

export class createProjectDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  custom_id: string;
  @ApiProperty()
  workspace_id: string;

  @ApiProperty()
  fds?: string;
}
