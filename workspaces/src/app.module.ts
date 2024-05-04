import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './modules/workspace.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { User } from './entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { WorkspaceService } from './services/workspace.service';
import { ClsModule } from 'nestjs-cls';
import { Workspace } from './entities/Workspace.entity';
import { WorkspaceMember } from './entities/WorkspaceMember.entity';
import { UserService } from './services/user.service';
import { Invitation } from './entities/Invitation.entity';
import { WorkspaceController } from './controllers/workspace.controller';
import { UserRegisteredListener } from './events/listeners/UserRegisteredListener';
import { UserUpdatedListener } from './events/listeners/UserUpdateListener';
import { OnboardingController } from './controllers/onboarding.controller';
import { OnboardingService } from './services/onboarding.service';

@Module({
  imports: [
    WorkspaceModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User, Workspace, WorkspaceMember, Invitation],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        const tokenExpiry =
          configService.get('NODE_ENV') === 'development' ? '100d' : '4h';
        return {
          secret: configService.getOrThrow('JWT_KEY'),
          signOptions: { expiresIn: tokenExpiry },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule.forRoot(),
    ClsModule.forRoot({ middleware: { mount: true } }),
  ],
  controllers: [WorkspaceController, AppController, OnboardingController],
  providers: [
    AppService,
    JwtStrategy,
    LocalStrategy,
    WorkspaceService,
    OnboardingService,
    UserService,
    UserRegisteredListener,
    UserUpdatedListener,
  ],
})
export class AppModule {}
