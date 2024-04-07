import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/entities/User.entity';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('strategy');
  constructor(
    private authService: AuthService,
    private clsService: ClsService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    // if (user.status === UserStatus.Disabled) {
    //   throw new UserDisabledException();
    // }
    // if (user.deleted_at) {
    //   throw new UserDeletedException();
    // }
    this.clsService.set('reqUser', user);
    return user;
  }
}
