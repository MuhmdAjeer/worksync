import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User, UserRepo } from 'src/entities/User.entity';
import * as jwt from 'jsonwebtoken';
import { SessionData } from 'express-session';
import { Request } from 'express';
import { EntityNotFoundException } from 'src/exceptions/entityNotFound.exception';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordException } from 'src/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { natsWrapper } from 'src/nats.wrapper';
import { RequestOTPPublisher } from 'src/events/publishers/SendOtp';
import * as speakeasy from 'speakeasy';
import { OTP, OtpRepo } from 'src/entities/Otp.entity';
@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private configSvc: ConfigService,
    private otpRepo: OtpRepo,
  ) {}
  private readonly logger = new Logger('auth svc');

  async register(createUserDto: CreateUserDto, req: Request): Promise<User> {
    const userExist = await this.userRepo.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new ConflictException('Email already exist');
    }
    const user = new User(createUserDto);
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configSvc.getOrThrow('JWT_KEY'),
    );

    const session = req.session as CustomSessionData;
    session.jwt = userJwt;
    this.logger.log({ user });
    await this.sendOTP(user.email);
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

  async sendOTP(email: string) {
    const secret = speakeasy.generateSecret();
    const token = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });
    let otpModel: OTP;
    const OTPAlreadySent = await this.otpRepo.findOne({ email });
    if (OTPAlreadySent) {
      otpModel = OTPAlreadySent;
      otpModel.secret = secret.base32;
    } else {
      otpModel = new OTP({ email, secret: secret.base32 });
    }
    new RequestOTPPublisher(natsWrapper.client).publish({
      email,
      code: token,
    });
    await this.otpRepo.getEntityManager().persistAndFlush(otpModel);
  }

  async verifyOtp(email: string, code: number) {
    const otpModel = await this.otpRepo.findOneOrFail({ email });
    const tokenValidates = speakeasy.totp.verify({
      secret: otpModel.secret,
      encoding: 'base32',
      token: code.toString(),
      window: 6,
    });
    if (!tokenValidates) throw new BadRequestException();
    return;
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
