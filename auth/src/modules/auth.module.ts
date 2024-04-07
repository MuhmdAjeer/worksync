import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from 'src/controllers/auth.controller';
import { OTP } from 'src/entities/Otp.entity';
import { User } from 'src/entities/User.entity';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, OTP] })],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}
