import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionData } from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sessionData = req.session as CustomSessionData;
    sessionData.userId = 123;

    next();
  }
}

interface CustomSessionData extends SessionData {
  userId?: number; // Example: Define userId property
  // Add other session properties as needed
}

export default CustomSessionData;
