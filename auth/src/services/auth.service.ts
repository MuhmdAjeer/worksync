import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User, UserRepo } from 'src/entities/User';
import * as jwt from 'jsonwebtoken';
import { SessionData } from 'express-session';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepo) {}
  async register(createUserDto: CreateUserDto, req: Request): Promise<User> {
    Logger.warn(createUserDto);
    const user = new User(createUserDto);
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
    await this.userRepo.getEntityManager().persistAndFlush(user);
    return user;
  }
}

interface CustomSessionData extends SessionData {
  userId?: number;
  email?: string;
  name?: string;
  jwt?: string;
}
