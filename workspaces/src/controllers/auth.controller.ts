import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CreateWorkspaceDto } from 'src/dtos/CreateWorkspaceDto';
import { WorkspaceService } from 'src/services/workspace.service';
@Controller('/hi')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  private readonly logger = new Logger('auth controller');

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    await this.workspaceService.create(createWorkspaceDto);
  }
}
