import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class SendOTPDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class verifyOTPDto {
  @IsNumber()
  @ApiProperty()
  code: number;

  @IsEmail()
  @ApiProperty()
  email: string;
}
