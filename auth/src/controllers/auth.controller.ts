import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { User } from 'src/entities/User';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/services/auth.service';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger('auth controller');

  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ): Promise<User> {
    return this.authService.register(createUserDto, request);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const token = this.authService.login(req.user);
    response.cookie('jwt', token, {
      httpOnly: true,
      signed: false,
      secure: false,
    });

    return { success: true };
  }
}
