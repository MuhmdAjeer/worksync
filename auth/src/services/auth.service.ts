import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User } from 'src/entities/User';
import * as jwt from 'jsonwebtoken';
import { SessionData } from 'express-session';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}
  register(createUserDto: CreateUserDto, req: Request): User {
    const user = this.userRepo.create({ email: createUserDto.email });
    // TODO: Create Mail service and send verification mail
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      '1234',
    );

    const session = req.session as CustomSessionData;
    session.jwt = userJwt;
    return user;
  }
}

interface CustomSessionData extends SessionData {
  userId?: number;
  email?: string;
  name?: string;
  jwt?: string;
}
