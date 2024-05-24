import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UserDto } from 'src/dtos/user';
import { User, UserRepo } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordException } from '@worksyncplus/common';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundException } from '@worksyncplus/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private configSvc: ConfigService,
  ) {}
  private readonly logger = new Logger('auth svc');

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    await this.userRepo.getEntityManager().persistAndFlush(user);

    return user;
  }

  async update(userDto: UserDto) {
    const user = await this.userRepo.findOneOrFail({ id: userDto.id });
    this.userRepo.assign(user, userDto);

    await this.userRepo.getEntityManager().persistAndFlush(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new EntityNotFoundException(email);
    }
    const compareRes = await bcrypt.compare(password, user.password);
    this.logger.error(password, user.password);
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

  async findOne(id: string): Promise<User> {
    return await this.userRepo.findOne({ id });
  }
}

export interface JwtPayload {
  id: string;
  username?: string;
  email: string;
  google_id?: string;
}
