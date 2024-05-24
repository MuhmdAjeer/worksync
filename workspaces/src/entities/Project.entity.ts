import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Base } from './base.entity';
import { Workspace } from './Workspace.entity';

@Entity({ repository: () => ProjectRepo })
export class Project extends Base {
  [EntityRepositoryType]?: ProjectRepo;

  @Property()
  name: string;

  @Property()
  custom_id: string;

  @Property()
  description: string;

  @ManyToOne(() => Workspace, { inversedBy: 'projects' })
  workspace: Workspace;

  constructor(obj: Partial<Project>) {
    super();
    Object.assign(this, obj);
  }
}

export class ProjectRepo extends EntityRepository<Project> {}
