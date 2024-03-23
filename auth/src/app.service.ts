import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(request: Request): string {
    this.logger.log(JSON.stringify(request.session));
    return 'Hello World!';
  }
}
