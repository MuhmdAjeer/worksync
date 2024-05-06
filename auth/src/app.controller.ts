import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '@worksyncplus/common';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hi')
  getHi(): string {
    return 'hiii';
  }

  @Get('/docs')
  getDocs() {
    const swaggerFile = JSON.parse(
      fs.readFileSync('./swagger-spec.json', 'utf8'),
    );
    return swaggerFile;
  }
}
