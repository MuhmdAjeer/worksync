import { Injectable, Logger } from '@nestjs/common';
import { render } from '@react-email/components';
import { Listener, Subjects, RequestOTPEvent } from '@worksyncplus/common';
import { Message } from 'node-nats-streaming';
import { AppService } from 'src/app.service';
import SendOTP from 'src/views/templates/SendOTP';

@Injectable()
export class OTPRequestListener extends Listener<RequestOTPEvent> {
  queueGroupName = 'auth';
  subject: Subjects.RequestOTP = Subjects.RequestOTP;

  private readonly appService = new AppService();
  private readonly logger = new Logger('otp listner');

  onMessage(data: RequestOTPEvent['data'], msg: Message): void {
    this.logger.log('eda mwoneee receive aayitunddeee');
    const html = render(<SendOTP code={data.code} />, {});
    this.appService.sendMail({
      email: data.email,
      subject: 'OTP for Email Verification',
      template: html,
    });
    msg.ack();
  }
}
