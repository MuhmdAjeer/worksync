import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User } from 'src/entities/User';
import { AuthService } from 'src/services/auth.service';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ): Promise<User> {
    Logger.warn(createUserDto);
    return this.authService.register(createUserDto, request);
  }
}
