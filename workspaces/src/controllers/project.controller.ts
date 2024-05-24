import { Body, Controller, Post } from '@nestjs/common';
import { createProjectDto } from 'src/dtos/project.dto';
import { ProjectService } from 'src/services/project.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectSvc: ProjectService) {}
  @Post()
  async create(@Body() body: createProjectDto) {
    return await this.projectSvc.create(body);
  }
}
