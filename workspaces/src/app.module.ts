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
import { OTP } from './entities/Otp.entity';
import { Workspace } from './entities/Workspace.entity';
import { WorkspaceMember } from './entities/WorkspaceMember.entity';
import { AuthService } from './services/auth.service';
import { Invitation } from './entities/Invitation.entity';

@Module({
  imports: [
    WorkspaceModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User, OTP, Workspace, WorkspaceMember, Invitation],
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
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    LocalStrategy,
    WorkspaceService,
    AuthService,
  ],
})
export class AppModule {}
