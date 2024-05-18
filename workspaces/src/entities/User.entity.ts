import {
  BeforeCreate,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';

@Entity({ repository: () => UserRepo, tableName: 'users' })
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

  @Property({ default: null, nullable: true })
  verified_at?: Date;

  @Property({ default: null, nullable: true })
  profile_picture?: string;

  @BeforeCreate()
  async hashPassword() {
    if (this.password) {
      this.password = isHashed(this.password)
        ? this.password
        : hashPassword(this.password);
    }
  }

  constructor(user: {
    username?: string;
    email: string;
    google_id?: string;
    password: string;
    verified_at?: Date;
    profile_picture?: string;
  }) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.google_id = user.google_id;
    this.verified_at = user.verified_at;
    this.profile_picture = user.profile_picture;
  }
}

function isHashed(str: string) {
  return str.startsWith('$2b$');
}

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export class UserRepo extends EntityRepository<User> {}
