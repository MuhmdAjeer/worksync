import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';

@Entity({ repository: () => UserRepo })
export class User {
  [EntityRepositoryType]?: UserRepo;
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  username?: string;

  @Property({ unique: true })
  email: string;

  @Property({ nullable: true, unique: true })
  google_id?: string;

  @Property()
  password: string;

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
  constructor(user: {
    username?: string;
    email: string;
    google_id?: string;
    password: string;
  }) {
    this.username = user.username;
    this.email = user.email;
    this.password = hashPassword(user.password);
    this.google_id = user.google_id;
  }
}
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export class UserRepo extends EntityRepository<User> {}
