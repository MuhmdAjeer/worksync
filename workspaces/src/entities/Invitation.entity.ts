import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

@Entity({ repository: () => InvitationRepo })
export class Invitation {
  [EntityRepositoryType]?: Invitation;
  @PrimaryKey()
  id!: number;

  @Property()
  email: string;

  @Property()
  workspace_id: number;

  @Property()
  is_accepted: boolean;

  @Property()
  role: string;

  constructor(invitation: {
    role: string;
    email: string;
    workspace_id: number;
  }) {
    this.email = invitation.email;
    this.workspace_id = invitation.workspace_id;
    this.role = invitation.role;
  }
}

export class InvitationRepo extends EntityRepository<Invitation> {}
