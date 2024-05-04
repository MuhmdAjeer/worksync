import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as fs from 'fs';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHi(): string {
    return 'hi from workspace conroller';
  }

  @Get('/docs')
  getDocs() {
    const swaggerFile = JSON.parse(
      fs.readFileSync('./swagger-spec.json', 'utf8'),
    );
    return swaggerFile;
  }
}
