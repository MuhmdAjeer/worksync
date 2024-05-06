import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateWorkspaceDto } from 'src/dtos/CreateWorkspaceDto';
import { WorkspaceService } from 'src/services/workspace.service';
import { JwtAuthGuard } from '@worksyncplus/common';
@Controller()
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  private readonly logger = new Logger('auth controller');

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    await this.workspaceService.create(createWorkspaceDto);
  }

  @Get('/users')
  async listUsers() {
    return await this.workspaceService.listUsers();
  }
}
