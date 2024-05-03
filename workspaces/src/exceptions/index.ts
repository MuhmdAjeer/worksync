import { UnauthorizedException } from '@nestjs/common';

export class UserDisabledException extends UnauthorizedException {
  constructor() {
    super(`user_disabled`);
  }
}

export class InvalidPasswordException extends UnauthorizedException {
  constructor() {
    super(`invalid_password`);
  }
}

export class UserDeletedException extends UnauthorizedException {
  constructor() {
    super(`user_deleted`);
  }
}
