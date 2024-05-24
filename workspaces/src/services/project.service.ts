import { Injectable } from '@nestjs/common';
import { createProjectDto } from 'src/dtos/project.dto';
import { Project } from 'src/entities/Project.entity';
import { WorkspaceRepo } from 'src/entities/Workspace.entity';

@Injectable()
export class ProjectService {
  constructor(private workspaceRepo: WorkspaceRepo) {}

  async create(projectDto: createProjectDto) {
    const workspace = await this.workspaceRepo.findOneOrFail({
      id: projectDto.workspace_id,
    });

    const project = new Project(projectDto);
    project.workspace = workspace;
    await this.workspaceRepo.getEntityManager().persistAndFlush(project);
    return project;
  }
}
