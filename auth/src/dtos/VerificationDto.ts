import { IsEmail, IsNumber, MaxLength, MinLength } from 'class-validator';

export class SendOTPDto {
  @IsEmail()
  email: string;
}

export class verifyOTPDto extends SendOTPDto {
  @IsNumber()
  code: number;
}
