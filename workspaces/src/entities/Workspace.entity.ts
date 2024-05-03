import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

@Entity({ repository: () => WorkspaceRepo })
export class Workspace {
  [EntityRepositoryType]?: WorkspaceRepo;
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  use: string;

  @Property()
  owner_id: number;
  constructor(workspace: { name: string; use: string; owner_id: number }) {
    this.name = workspace.name;
    this.use = workspace.use;
    this.owner_id = workspace.owner_id;
  }
}

export class WorkspaceRepo extends EntityRepository<Workspace> {}
