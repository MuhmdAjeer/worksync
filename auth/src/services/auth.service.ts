import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User, UserRepo } from 'src/entities/User';
import * as jwt from 'jsonwebtoken';
import { SessionData } from 'express-session';
import { Request } from 'express';
import { EntityNotFoundException } from 'src/exceptions/entityNotFound.exception';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordException } from 'src/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private configSvc: ConfigService,
  ) {}
  private readonly logger = new Logger('auth svc');

  async register(createUserDto: CreateUserDto, req: Request): Promise<User> {
    const user = new User(createUserDto);
    // TODO: Create Mail service and send verification mail
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configSvc.getOrThrow('JWT_KEY'),
    );

    const session = req.session as CustomSessionData;
    session.jwt = userJwt;
    await this.userRepo.getEntityManager().persistAndFlush(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new EntityNotFoundException(email);
    }
    const compareRes = await bcrypt.compare(password, user.password);
    this.logger.error(password);
    if (!compareRes) {
      throw new InvalidPasswordException();
    }
    return user;
  }

  login(user: User): string {
    return this.generateToken(user);
  }

  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign({
      id: payload.id,
      username: payload.username,
      email: payload.email,
      google_id: payload.google_id,
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ id });
  }
}

interface CustomSessionData extends SessionData {
  userId?: number;
  email?: string;
  name?: string;
  jwt?: string;
}

export interface JwtPayload {
  id: number;
  username?: string;
  email: string;
  google_id?: string;
}
